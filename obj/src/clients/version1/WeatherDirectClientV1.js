"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherDirectClientV1 = void 0;
const pip_services4_components_node_1 = require("pip-services4-components-node");
const pip_services4_rpc_node_1 = require("pip-services4-rpc-node");
class WeatherDirectClientV1 extends pip_services4_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('service', new pip_services4_components_node_1.Descriptor('weather', 'service', '*', '*', '1.0'));
    }
    getWeather(ctx, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(ctx, 'weather.get_weather');
            try {
                return yield this._service.getWeather(ctx, filter, paging);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    getWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(ctx, 'weather.get_weather_by_id');
            try {
                return yield this._service.getWeatherById(ctx, weatherId);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    getWeatherByLocation(ctx, location) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(ctx, 'weather.get_weather_by_location');
            try {
                return yield this._service.getWeatherByLocation(ctx, location);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    createWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(ctx, 'weather.create_weather');
            try {
                return yield this._service.createWeather(ctx, weather);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    updateWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(ctx, 'weather.update_weather');
            try {
                return yield this._service.updateWeather(ctx, weather);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    deleteWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(ctx, 'weather.delete_weather_by_id');
            try {
                return yield this._service.deleteWeatherById(ctx, weatherId);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
}
exports.WeatherDirectClientV1 = WeatherDirectClientV1;
//# sourceMappingURL=WeatherDirectClientV1.js.map