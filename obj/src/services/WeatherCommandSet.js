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
exports.WeatherCommandSet = void 0;
const pip_services4_rpc_node_1 = require("pip-services4-rpc-node");
const pip_services4_rpc_node_2 = require("pip-services4-rpc-node");
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_data_node_2 = require("pip-services4-data-node");
const pip_services4_data_node_3 = require("pip-services4-data-node");
const pip_services4_commons_node_1 = require("pip-services4-commons-node");
const pip_services4_data_node_4 = require("pip-services4-data-node");
const pip_services4_data_node_5 = require("pip-services4-data-node");
const WeatherV1Schema_1 = require("../data/version1/WeatherV1Schema");
class WeatherCommandSet extends pip_services4_rpc_node_1.CommandSet {
    constructor(service) {
        super();
        this._service = service;
        this.addCommand(this.makeGetWeatherCommand());
        this.addCommand(this.makeGetWeatherByIdCommand());
        this.addCommand(this.makeGetWeatherByLocationCommand());
        this.addCommand(this.makeCreateWeatherCommand());
        this.addCommand(this.makeUpdateWeatherCommand());
        this.addCommand(this.makeDeleteWeatherByIdCommand());
    }
    makeGetWeatherCommand() {
        return new pip_services4_rpc_node_2.Command('get_weather', new pip_services4_data_node_1.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services4_data_node_2.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services4_data_node_3.PagingParamsSchema()), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services4_data_node_4.FilterParams.fromValue(args.get('filter'));
            let paging = pip_services4_data_node_5.PagingParams.fromValue(args.get('paging'));
            return yield this._service.getWeather(ctx, filter, paging);
        }));
    }
    makeGetWeatherByIdCommand() {
        return new pip_services4_rpc_node_2.Command('get_weather_by_id', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('weather_id', pip_services4_commons_node_1.TypeCode.String), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let weatherId = args.getAsString('weather_id');
            return yield this._service.getWeatherById(ctx, weatherId);
        }));
    }
    makeGetWeatherByLocationCommand() {
        return new pip_services4_rpc_node_2.Command('get_weather_by_location', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('location', pip_services4_commons_node_1.TypeCode.String), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let location = args.getAsString('location');
            return yield this._service.getWeatherByLocation(ctx, location);
        }));
    }
    makeCreateWeatherCommand() {
        return new pip_services4_rpc_node_2.Command('create_weather', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('weather', new WeatherV1Schema_1.WeatherV1Schema()), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let weather = args.getAsObject('weather');
            return yield this._service.createWeather(ctx, weather);
        }));
    }
    makeUpdateWeatherCommand() {
        return new pip_services4_rpc_node_2.Command('update_weather', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('weather', new WeatherV1Schema_1.WeatherV1Schema()), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let weather = args.getAsObject('weather');
            return yield this._service.updateWeather(ctx, weather);
        }));
    }
    makeDeleteWeatherByIdCommand() {
        return new pip_services4_rpc_node_2.Command('delete_weather_by_id', new pip_services4_data_node_1.ObjectSchema(true)
            .withRequiredProperty('weather_id', pip_services4_commons_node_1.TypeCode.String), (ctx, args) => __awaiter(this, void 0, void 0, function* () {
            let weatherId = args.getAsString('weather_id');
            return yield this._service.deleteWeatherById(ctx, weatherId);
        }));
    }
}
exports.WeatherCommandSet = WeatherCommandSet;
//# sourceMappingURL=WeatherCommandSet.js.map