"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const pip_services4_components_node_1 = require("pip-services4-components-node");
const pip_services4_data_node_1 = require("pip-services4-data-node");
const WeatherTypeV1_1 = require("../data/version1/WeatherTypeV1");
const WeatherCommandSet_1 = require("../services/WeatherCommandSet");
class WeatherService {
    constructor() { }
    configure(config) {
    }
    setReferences(references) {
        this._persistence = references.getOneRequired(new pip_services4_components_node_1.Descriptor('weather', 'persistence', '*', '*', '1.0'));
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new WeatherCommandSet_1.WeatherCommandSet(this);
        }
        return this._commandSet;
    }
    getWeather(ctx, filter, paging) {
        return this._persistence.getPageByFilter(ctx, filter, paging);
    }
    getWeatherById(ctx, weatherId) {
        return this._persistence.getOneById(ctx, weatherId);
    }
    getWeatherByLocation(ctx, location) {
        return this._persistence.getOneByLocation(ctx, location);
    }
    createWeather(ctx, weather) {
        weather.id = weather.id || pip_services4_data_node_1.IdGenerator.nextLong();
        weather.type = weather.type || WeatherTypeV1_1.WeatherTypeV1.Current;
        weather.created_at = weather.created_at || new Date();
        return this._persistence.create(ctx, weather);
    }
    updateWeather(ctx, weather) {
        return this._persistence.update(ctx, weather);
    }
    deleteWeatherById(ctx, weatherId) {
        return this._persistence.deleteById(ctx, weatherId);
    }
}
exports.WeatherService = WeatherService;
//# sourceMappingURL=WeatherService.js.map