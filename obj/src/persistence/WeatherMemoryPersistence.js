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
exports.WeatherMemoryPersistence = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_persistence_node_1 = require("pip-services4-persistence-node");
class WeatherMemoryPersistence extends pip_services4_persistence_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 100;
    }
    composeFilter(filter) {
        filter = filter || new pip_services4_data_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let location = filter.getAsNullableString('location');
        let type = filter.getAsNullableString('type');
        let minTemp = filter.getAsNullableFloat('min_temp');
        let maxTemp = filter.getAsNullableFloat('max_temp');
        let forecastTimeFrom = filter.getAsNullableDateTime('forecast_time_from');
        let forecastTimeTo = filter.getAsNullableDateTime('forecast_time_to');
        return (item) => {
            if (id != null && item.id != id)
                return false;
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
        };
    }
    getPageByFilter(ctx, filter, paging) {
        return super.getPageByFilter(ctx, this.composeFilter(filter), paging, null, null);
    }
    getOneByLocation(ctx, location) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = this._items.find((item) => item.location == location);
            if (item != null)
                this._logger.trace(ctx, "Found weather for %s", location);
            else
                this._logger.trace(ctx, "Cannot find weather for %s", location);
            return item;
        });
    }
}
exports.WeatherMemoryPersistence = WeatherMemoryPersistence;
//# sourceMappingURL=WeatherMemoryPersistence.js.map