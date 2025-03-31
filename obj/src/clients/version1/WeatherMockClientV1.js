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
exports.WeatherMockClientV1 = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_data_node_2 = require("pip-services4-data-node");
const pip_services4_data_node_3 = require("pip-services4-data-node");
const WeatherTypeV1_1 = require("../../data/version1/WeatherTypeV1");
class WeatherMockClientV1 {
    constructor() {
        this._weather = [];
    }
    getWeather(ctx, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            filter = filter || new pip_services4_data_node_1.FilterParams();
            let location = filter.getAsNullableString('location');
            let type = filter.getAsNullableString('type');
            let minTemp = filter.getAsNullableFloat('min_temp');
            let maxTemp = filter.getAsNullableFloat('max_temp');
            let forecastTimeFrom = filter.getAsNullableDateTime('forecast_time_from');
            let forecastTimeTo = filter.getAsNullableDateTime('forecast_time_to');
            let weather = this._weather.filter((item) => {
                if (location != null && item.location != location)
                    return false;
                if (type != null && item.type != type)
                    return false;
                if (minTemp != null && item.temperature < minTemp)
                    return false;
                if (maxTemp != null && item.temperature > maxTemp)
                    return false;
                if (forecastTimeFrom != null && (item.forecast_time == null || item.forecast_time < forecastTimeFrom))
                    return false;
                if (forecastTimeTo != null && (item.forecast_time == null || item.forecast_time > forecastTimeTo))
                    return false;
                return true;
            });
            paging = paging || new pip_services4_data_node_2.PagingParams();
            let skip = paging.getSkip(0);
            let take = paging.getTake(100);
            let total = weather.length;
            weather = weather.slice(skip, skip + take);
            return new pip_services4_data_node_3.DataPage(weather, total);
        });
    }
    getWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            let weather = this._weather.find(item => item.id == weatherId);
            return weather;
        });
    }
    getWeatherByLocation(ctx, location) {
        return __awaiter(this, void 0, void 0, function* () {
            let weather = this._weather.find(item => item.location == location);
            return weather;
        });
    }
    createWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            weather = Object.assign({}, weather);
            weather.type = weather.type || WeatherTypeV1_1.WeatherTypeV1.Current;
            weather.created_at = weather.created_at || new Date();
            this._weather.push(weather);
            return weather;
        });
    }
    updateWeather(ctx, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            weather = Object.assign({}, weather);
            let index = this._weather.findIndex(item => item.id == weather.id);
            if (index < 0)
                return null;
            this._weather[index] = weather;
            return weather;
        });
    }
    deleteWeatherById(ctx, weatherId) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this._weather.findIndex(item => item.id == weatherId);
            let weather = this._weather[index];
            if (index < 0)
                return null;
            this._weather.splice(index, 1);
            return weather;
        });
    }
}
exports.WeatherMockClientV1 = WeatherMockClientV1;
//# sourceMappingURL=WeatherMockClientV1.js.map