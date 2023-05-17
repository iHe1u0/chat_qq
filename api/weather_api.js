require("dotenv").config();
const https = require('https');
const zlib = require('zlib');
const { URLSearchParams } = require('url');
const moment = require("moment/moment");
const { segment } = require("icqq");
const xml2js = require('xml2js');

const weather_id = process.env.weather_id || "";
const weather_api_key = process.env.weather_api_key || "";

/**
 * Get city information by the given city name with QWeather API.
 * @param {string} city_name - The name of the city which needs to be searched for weather information.
 * @returns {Promise<object>} - A Promise that resolves to an object containing city information, or rejects with an error.
 */
function getCity(city_name) {
    const params = new URLSearchParams({
        key: weather_api_key,
        location: city_name
    });
    const options = {
        hostname: 'geoapi.qweather.com',
        path: `/v2/city/lookup?${params.toString()}`,
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip'
        }
    };
    return new Promise((resolve, reject) => {
        const request = https.request(options, res => {
            if (res.statusCode == 200) {
                const unzipStream = res.pipe(zlib.createGunzip());
                unzipStream.on('data', data => {
                    const obj = JSON.parse(data);
                    resolve(obj);
                });
            }
        });
        request.on('error', error => {
            reject(error);
        });
        request.end();
    });
}


/**
 * Get weather information by the given city id with QWeather API.
 * @param {string} city_id - The unique id of the city which needs to be searched for weather information.
 * @returns {Promise<object>} - A Promise that resolves to an object containing weather information, or rejects with an error.
 */
function getWeatherInternal(city_id) {
    const params = new URLSearchParams({
        key: weather_api_key,
        location: city_id
    });
    const options = {
        // hostname: 'api.qweather.com',
        hostname: 'devapi.qweather.com',
        path: `/v7/weather/now?${params.toString()}`,
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip'
        }
    };
    return new Promise((resolve, reject) => {
        const request = https.request(options, res => {
            if (res.statusCode == 200) {
                const unzipStream = res.pipe(zlib.createGunzip());
                unzipStream.on('data', data => {
                    const obj = JSON.parse(data);
                    resolve(obj);
                });
            }
        });
        request.on('error', error => {
            reject(error);
        });
        request.end();
    });
}

/**
 * Retrieves weather data (e.g. temperature, humidity) for a given city name
 * by calling a third-party API through the following steps:
 *
 * 1. Call getCity(city_name) to retrieve city information, including its unique id.
 * 2. Call getWeatherInternal(id) with the retrieved id to fetch weather data.
 *
 * @param {String} city_name - The name of the city to retrieve weather data for.
 * @returns {Promise<*>} A JSON object containing various fields pertaining to the current weather
 *                       in the specified location, such as temperature and atmospheric pressure.
 *                       Returns an error message if there is any problem while fetching the data.
 */
async function getWeather(city_name, event) {
    try {
        const city = await getCity(city_name);
        const { name, id } = city.location[0];
        const data = await getWeatherInternal(id);
        return data;
    } catch (error) {
        return error;
    }
}

function build_weather_xml_msg(city_name, updateTime, now, fxLink) {
    const time = moment(updateTime).format("YYYY-MM-DD HH:mm");
    let summary = `${now.text}  气温:${now.temp}℃  湿度:${now.humidity}%\n`;
    summary += `风速：${now.windSpeed}公里/小时 (${now.windDir}${now.windScale}级)`;
    if (now.precip > 0) {
        summary += "\n";
        summary += `小时降水量：${now.precip}毫米`;
    }
    const obj = {
        msg: {
            '$': {
                flag: '1',
                serviceID: '1',
                brief: '实时天气',
                templateID: '1',
                action: 'web',
                url: fxLink
            },
            item: [{
                '$': { layout: '0' },
                title: city_name,
                summary: summary,
                // picture: [{ '$': { cover: `https://imorning.oss-cn-hangzhou.aliyuncs.com/res/img/hweather/0.png` } }]
            }],
            source: {
                "$": {
                    // 底部来源App名字
                    name: "chat qq",
                    // App的Icon
                    icon: "https://avatars.githubusercontent.com/u/44289789?s=96&v=4",
                    // 点击后跳转的链接
                    url: "https://github.com/morningos/chat_qq",
                    action: "web",
                    appid: "-1"
                }
            }
        }
    };
    var builder = new xml2js.Builder();
    // console.log(builder.buildObject(obj));
    return builder.buildObject(obj);
}

function reply_weather(city_name, event) {
    getWeather(city_name, event).then(result => {
        // console.log(result);
        if (result.code && result.code == 200) {
            const { updateTime, now, fxLink } = result;
            const message = [segment.xml(build_weather_xml_msg(city_name, updateTime, now, fxLink))];
            event.reply(message);
        } else {
            console.log('查询失败😑' + result.toString());
            event.reply(result);
        }
    });
}

exports.reply_weather = reply_weather;