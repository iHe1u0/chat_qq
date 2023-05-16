require("dotenv").config();
const https = require('https');
const zlib = require('zlib');
const { URLSearchParams } = require('url');

const is_wather_on = process.env.weather ? (process.env.weather === 'true' ? true : false) : false;
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
        // console.error(error);
        return error;
    }
}

getWeather("浦东").then(result => console.log(result));