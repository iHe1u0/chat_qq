require("dotenv").config();

let temperature = parseFloat(process.env.temperature) || 1.0;
if (temperature > 2.0 || temperature < 0.0) {
    temperature = 1.0;
}

console.log(typeof(temperature));