"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherHttpControllerV1 = void 0;
const pip_services4_http_node_1 = require("pip-services4-http-node");
const pip_services4_components_node_1 = require("pip-services4-components-node");
class WeatherHttpControllerV1 extends pip_services4_http_node_1.CommandableHttpController {
    constructor() {
        super('v1/weather');
        this._dependencyResolver.put('service', new pip_services4_components_node_1.Descriptor('weather', 'service', '*', '*', '1.0'));
    }
}
exports.WeatherHttpControllerV1 = WeatherHttpControllerV1;
//# sourceMappingURL=WeatherHttpControllerV1.js.map