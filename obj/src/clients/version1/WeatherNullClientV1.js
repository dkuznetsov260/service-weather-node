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
exports.WeatherNullClientV1 = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
class WeatherNullClientV1 {
    getWeather(ctx, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services4_data_node_1.DataPage();
        });
    }
    getWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getWeatherByLocation(ctx, location) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    createWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            return weather;
        });
    }
    updateWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            return weather;
        });
    }
    deleteWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.WeatherNullClientV1 = WeatherNullClientV1;
//# sourceMappingURL=WeatherNullClientV1.js.map