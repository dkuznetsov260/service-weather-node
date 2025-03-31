"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherProcess = void 0;
const pip_services4_container_node_1 = require("pip-services4-container-node");
const pip_services4_http_node_1 = require("pip-services4-http-node");
const pip_services4_swagger_node_1 = require("pip-services4-swagger-node");
const WeatherServiceFactory_1 = require("../build/WeatherServiceFactory");
class WeatherProcess extends pip_services4_container_node_1.ProcessContainer {
    constructor() {
        super('weather', 'Weather microservice');
        this.addFactory(new WeatherServiceFactory_1.WeatherServiceFactory());
        this.addFactory(new pip_services4_http_node_1.DefaultHttpFactory());
        this.addFactory(new pip_services4_swagger_node_1.DefaultSwaggerFactory());
    }
}
exports.WeatherProcess = WeatherProcess;
//# sourceMappingURL=WeatherProcess.js.map