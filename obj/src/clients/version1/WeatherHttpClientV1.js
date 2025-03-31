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
exports.WeatherHttpClientV1 = void 0;
const pip_services4_http_node_1 = require("pip-services4-http-node");
class WeatherHttpClientV1 extends pip_services4_http_node_1.CommandableHttpClient {
    constructor() {
        super('v1/weather');
    }
    getWeather(ctx, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_weather', ctx, {
                filter: filter,
                paging: paging
            });
        });
    }
    getWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_weather_by_id', ctx, {
                weather_id: weatherId
            });
        });
    }
    getWeatherByLocation(ctx, location) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_weather_by_location', ctx, {
                location: location
            });
        });
    }
    createWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('create_weather', ctx, {
                weather: weather
            });
        });
    }
    updateWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('update_weather', ctx, {
                weather: weather
            });
        });
    }
    deleteWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('delete_weather_by_id', ctx, {
                weather_id: weatherId
            });
        });
    }
}
exports.WeatherHttpClientV1 = WeatherHttpClientV1;
//# sourceMappingURL=WeatherHttpClientV1.js.map