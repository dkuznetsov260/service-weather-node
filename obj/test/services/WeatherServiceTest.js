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
const assert = require('chai').assert;
const pip_services4_components_node_1 = require("pip-services4-components-node");
const pip_services4_components_node_2 = require("pip-services4-components-node");
const pip_services4_components_node_3 = require("pip-services4-components-node");
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_data_node_2 = require("pip-services4-data-node");
const pip_services4_components_node_4 = require("pip-services4-components-node");
const WeatherTypeV1_1 = require("../../src/data/version1/WeatherTypeV1");
const WeatherMemoryPersistence_1 = require("../../src/persistence/WeatherMemoryPersistence");
const WeatherService_1 = require("../../src/services/WeatherService");
const WEATHER1 = {
    id: '1',
    type: WeatherTypeV1_1.WeatherTypeV1.Current,
    location: 'New York',
    temperature: 25.5,
    humidity: 60,
    weather_description: 'Sunny',
    weather_icon: 'sun',
    forecast_time: new Date(),
    created_at: new Date(),
    metadata: { source: 'test' }
};
const WEATHER2 = {
    id: '2',
    type: WeatherTypeV1_1.WeatherTypeV1.Daily,
    location: 'Los Angeles',
    temperature: 28.0,
    humidity: 40,
    weather_description: 'Clear',
    weather_icon: 'sun',
    forecast_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    created_at: new Date(),
    metadata: { source: 'test' }
};
suite('WeatherService', () => {
    let persistence;
    let service;
    let ctx;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new WeatherMemoryPersistence_1.WeatherMemoryPersistence();
        persistence.configure(new pip_services4_components_node_1.ConfigParams());
        service = new WeatherService_1.WeatherService();
        service.configure(new pip_services4_components_node_1.ConfigParams());
        ctx = new pip_services4_components_node_4.Context({ correlation_id: 'test' });
        let references = pip_services4_components_node_3.References.fromTuples(new pip_services4_components_node_2.Descriptor('weather', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services4_components_node_2.Descriptor('weather', 'service', 'default', 'default', '1.0'), service);
        service.setReferences(references);
        yield persistence.open(null);
        yield persistence.clear(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create the first weather record
        let weather = yield service.createWeather(ctx, WEATHER1);
        assert.isObject(weather);
        assert.equal(WEATHER1.location, weather.location);
        assert.equal(WEATHER1.temperature, weather.temperature);
        assert.equal(WEATHER1.humidity, weather.humidity);
        assert.equal(WEATHER1.weather_description, weather.weather_description);
        assert.equal(WEATHER1.type, weather.type);
        assert.isDefined(weather.created_at);
        assert.isDefined(weather.forecast_time);
        assert.deepEqual(WEATHER1.metadata, weather.metadata);
        // Create the second weather record
        weather = yield service.createWeather(ctx, WEATHER2);
        assert.isObject(weather);
        assert.equal(WEATHER2.location, weather.location);
        assert.equal(WEATHER2.temperature, weather.temperature);
        assert.equal(WEATHER2.humidity, weather.humidity);
        assert.equal(WEATHER2.weather_description, weather.weather_description);
        assert.equal(WEATHER2.type, weather.type);
        assert.isDefined(weather.created_at);
        assert.isDefined(weather.forecast_time);
        assert.deepEqual(WEATHER2.metadata, weather.metadata);
        // Get all weather records
        let page = yield service.getWeather(ctx, new pip_services4_data_node_1.FilterParams(), new pip_services4_data_node_2.PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        let weather1 = page.data[0];
        // Update the weather record
        weather1.temperature = 26.5;
        weather1.weather_description = 'Very Sunny';
        weather = yield service.updateWeather(ctx, weather1);
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);
        assert.equal(26.5, weather.temperature);
        assert.equal('Very Sunny', weather.weather_description);
        // Get weather by location
        weather = yield service.getWeatherByLocation(ctx, weather1.location);
        assert.isObject(weather);
        assert.equal(weather1.location, weather.location);
        // Get weather by id
        weather = yield service.getWeatherById(ctx, weather1.id);
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);
        // Delete the weather record
        weather = yield service.deleteWeatherById(ctx, weather1.id);
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);
        // Try to get deleted weather
        weather = yield service.getWeatherById(ctx, weather1.id);
        assert.isNull(weather || null);
    }));
    test('Get with Filters', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create weather records
        yield service.createWeather(ctx, WEATHER1);
        yield service.createWeather(ctx, WEATHER2);
        // Get weather by type
        let page = yield service.getWeather(ctx, pip_services4_data_node_1.FilterParams.fromTuples('type', WeatherTypeV1_1.WeatherTypeV1.Current), new pip_services4_data_node_2.PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal(WeatherTypeV1_1.WeatherTypeV1.Current, page.data[0].type);
        // Get weather by location
        page = yield service.getWeather(ctx, pip_services4_data_node_1.FilterParams.fromTuples('location', 'Los Angeles'), new pip_services4_data_node_2.PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal('Los Angeles', page.data[0].location);
        // Get weather by min temperature
        page = yield service.getWeather(ctx, pip_services4_data_node_1.FilterParams.fromTuples('min_temp', 26.0), new pip_services4_data_node_2.PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal(28.0, page.data[0].temperature);
    }));
});
//# sourceMappingURL=WeatherServiceTest.js.map