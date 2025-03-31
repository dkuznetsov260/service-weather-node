const WeatherProcess = require('../obj/src/containers/WeatherProcess').WeatherProcess;

try {
    let proc = new WeatherProcess();
    proc._configPath = "./config/weather.yml";
    proc.run(process.argv);
} catch (ex) {
    console.error(ex);
}
