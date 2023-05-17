require("dotenv").config();
const https = require('https');
const zlib = require('zlib');
const { URLSearchParams } = require('url');
const moment = require("moment/moment");
const { update } = require("../api/update_api");

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
async function getWeather(city_name) {
    try {
        const city = await getCity(city_name);
        const { name, id } = city.location[0];
        const data = await getWeatherInternal(id);
        return data;
    } catch (error) {
        console.log("eoorooror")
        return error;
    }
}

function reply_weather(city_name, events) {
    console.log(city_name);
    getWeather(city_name).then(result => {
        console.log(result);
        if (result.code && result.code == 200) {
            const { updateTime, now } = result;
            const time = moment(updateTime).format("YYYY-MM-DD HH:mm");
            const content = `
当前天气:   ${now.text}
温度:       ${now.temp}℃
体感温度:   ${now.feelsLike}℃
风向:       ${now.windDir}
风力等级:   ${now.windScale}级
风速:       ${now.windSpeed}公里/小时
相对湿度:   ${now.humidity}%
小时降水量: ${now.precip}毫米
能见度:     ${now.vis}公里
更新时间:   ${time}
            `;
            console.log(content);
        } else {
            console.log(result);
        }
    });
}

exports.reply_weather = reply_weather;

const raw_message = '#上海天气';
if (raw_message.startsWith("#")) {
    let command = raw_message.replace("#", "");
    if (command.endsWith("天气")) {
        reply_weather(command.replace("天气", ""));
    }
}