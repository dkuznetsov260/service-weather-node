let assert = require('chai').assert;

import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { Context } from 'pip-services4-components-node';

import { WeatherV1 } from '../../../src/data/version1/WeatherV1';
import { WeatherTypeV1 } from '../../../src/data/version1/WeatherTypeV1';
import { IWeatherClientV1 } from '../../../src/clients/version1/IWeatherClientV1';

const WEATHER1: WeatherV1 = {
    id: '1',
    type: WeatherTypeV1.Current,
    location: 'New York',
    temperature: 25.5,
    humidity: 60,
    weather_description: 'Sunny',
    weather_icon: 'sun',
    forecast_time: new Date(),
    created_at: new Date(),
    metadata: { source: 'test' }
};

const WEATHER2: WeatherV1 = {
    id: '2',
    type: WeatherTypeV1.Daily,
    location: 'Los Angeles',
    temperature: 28.0,
    humidity: 40,
    weather_description: 'Clear',
    weather_icon: 'sun',
    forecast_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    created_at: new Date(),
    metadata: { source: 'test' }
};

export class WeatherClientV1Fixture {
    private _client: IWeatherClientV1;
    private _ctx: Context;

    public constructor(client: IWeatherClientV1) {
        assert.isNotNull(client);
        this._client = client;
        this._ctx = new Context({ correlation_id: 'test' });
    }

    public async testCrudOperations() {
        let weather1: WeatherV1;

        // Create the first weather record
        let weather = await this._client.createWeather(this._ctx, WEATHER1);

        assert.isObject(weather);
        assert.equal(WEATHER1.location, weather.location);
        assert.equal(WEATHER1.temperature, weather.temperature);
        assert.equal(WEATHER1.humidity, weather.humidity);
        assert.equal(WEATHER1.weather_description, weather.weather_description);
        assert.equal(WEATHER1.type, weather.type);
        assert.isDefined(weather.created_at);
        assert.isDefined(weather.forecast_time);

        // Create the second weather record
        weather = await this._client.createWeather(this._ctx, WEATHER2);

        assert.isObject(weather);
        assert.equal(WEATHER2.location, weather.location);
        assert.equal(WEATHER2.temperature, weather.temperature);
        assert.equal(WEATHER2.humidity, weather.humidity);
        assert.equal(WEATHER2.weather_description, weather.weather_description);
        assert.equal(WEATHER2.type, weather.type);
        assert.isDefined(weather.created_at);
        assert.isDefined(weather.forecast_time);

        // Get all weather records
        let page = await this._client.getWeather(this._ctx, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        weather1 = page.data[0];

        // Update the weather record
        weather1.temperature = 26.5;
        weather1.weather_description = 'Very Sunny';

        weather = await this._client.updateWeather(this._ctx, weather1);

        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);
        assert.equal(26.5, weather.temperature);
        assert.equal('Very Sunny', weather.weather_description);

        // Get weather by location
        weather = await this._client.getWeatherByLocation(this._ctx, weather1.location);

        assert.isObject(weather);
        assert.equal(weather1.location, weather.location);

        // Get weather by id
        weather = await this._client.getWeatherById(this._ctx, weather1.id);

        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);

        // Delete the weather record
        weather = await this._client.deleteWeatherById(this._ctx, weather1.id);

        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);

        // Try to get deleted weather
        weather = await this._client.getWeatherById(this._ctx, weather1.id);
        assert.isNull(weather || null);
    }

    public async testFiltering() {
        // Create weather records
        await this._client.createWeather(this._ctx, WEATHER1);
        await this._client.createWeather(this._ctx, WEATHER2);

        // Filter by location
        let page = await this._client.getWeather(
            this._ctx,
            FilterParams.fromTuples('location', 'Los Angeles'),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal('Los Angeles', page.data[0].location);

        // Filter by type
        page = await this._client.getWeather(
            this._ctx,
            FilterParams.fromTuples('type', WeatherTypeV1.Current),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal(WeatherTypeV1.Current, page.data[0].type);

        // Filter by min temperature
        page = await this._client.getWeather(
            this._ctx,
            FilterParams.fromTuples('min_temp', 26.0),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal(28.0, page.data[0].temperature);
    }
} 