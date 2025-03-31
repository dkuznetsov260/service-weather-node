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
exports.WeatherMongoDbPersistence = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_mongodb_node_1 = require("pip-services4-mongodb-node");
class WeatherMongoDbPersistence extends pip_services4_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('weather');
        this._maxPageSize = 100;
    }
    composeFilter(filter) {
        filter = filter || new pip_services4_data_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({ _id: id });
        }
        let location = filter.getAsNullableString('location');
        if (location != null) {
            criteria.push({ location: location });
        }
        let type = filter.getAsNullableString('type');
        if (type != null) {
            criteria.push({ type: type });
        }
        let minTemp = filter.getAsNullableFloat('min_temp');
        if (minTemp != null) {
            criteria.push({ temperature: { $gte: minTemp } });
        }
        let maxTemp = filter.getAsNullableFloat('max_temp');
        if (maxTemp != null) {
            criteria.push({ temperature: { $lte: maxTemp } });
        }
        let forecastTimeFrom = filter.getAsNullableDateTime('forecast_time_from');
        if (forecastTimeFrom != null) {
            criteria.push({ forecast_time: { $gte: forecastTimeFrom } });
        }
        let forecastTimeTo = filter.getAsNullableDateTime('forecast_time_to');
        if (forecastTimeTo != null) {
            criteria.push({ forecast_time: { $lte: forecastTimeTo } });
        }
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(ctx, filter, paging) {
        return super.getPageByFilter(ctx, this.composeFilter(filter), paging, null, null);
    }
    getOneByLocation(ctx, location) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {
                location: location
            };
            let item = yield this._collection.findOne(criteria);
            if (item != null)
                this._logger.trace(ctx, "Found weather for %s", location);
            else
                this._logger.trace(ctx, "Cannot find weather for %s", location);
            item = this.convertToPublic(item);
            return item;
        });
    }
}
exports.WeatherMongoDbPersistence = WeatherMongoDbPersistence;
//# sourceMappingURL=WeatherMongoDbPersistence.js.map