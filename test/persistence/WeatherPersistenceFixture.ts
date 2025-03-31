import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { Context, IContext } from 'pip-services4-components-node';

const assert = require('chai').assert;

import { WeatherV1 } from '../../src/data/version1/WeatherV1';
import { WeatherTypeV1 } from '../../src/data/version1/WeatherTypeV1';
import { IWeatherPersistence } from '../../src/persistence/IWeatherPersistence';

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
    location: 'New York',
    temperature: 20.0,
    humidity: 70,
    weather_description: 'Cloudy',
    weather_icon: 'cloud',
    forecast_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    created_at: new Date(),
    metadata: { source: 'test' }
};

const WEATHER3: WeatherV1 = {
    id: '3',
    type: WeatherTypeV1.Current,
    location: 'Los Angeles',
    temperature: 30.0,
    humidity: 40,
    weather_description: 'Clear',
    weather_icon: 'sun',
    forecast_time: new Date(),
    created_at: new Date(),
    metadata: { source: 'test' }
};

export class WeatherPersistenceFixture {
    private _persistence: IWeatherPersistence;

    public constructor(persistence: IWeatherPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateWeatherRecords() {
        // Create test context
        let ctx: IContext = new Context({ correlation_id: 'test' });
        
        // Create the first weather record
        let weather = await this._persistence.create(
            ctx,
            WEATHER1
        );
        assert.isObject(weather);
        assert.equal(WEATHER1.id, weather.id);
        assert.equal(WEATHER1.type, weather.type);
        assert.equal(WEATHER1.location, weather.location);
        assert.equal(WEATHER1.temperature, weather.temperature);
        assert.equal(WEATHER1.humidity, weather.humidity);
        assert.equal(WEATHER1.weather_description, weather.weather_description);
        assert.equal(WEATHER1.weather_icon, weather.weather_icon);
        assert.isDefined(weather.forecast_time);
        assert.isDefined(weather.created_at);
        assert.deepEqual(WEATHER1.metadata, weather.metadata);

        // Create the second weather record
        weather = await this._persistence.create(
            ctx,
            WEATHER2
        );
        assert.isObject(weather);
        assert.equal(WEATHER2.id, weather.id);
        assert.equal(WEATHER2.type, weather.type);
        assert.equal(WEATHER2.location, weather.location);
        assert.equal(WEATHER2.temperature, weather.temperature);
        assert.equal(WEATHER2.humidity, weather.humidity);
        assert.equal(WEATHER2.weather_description, weather.weather_description);
        assert.equal(WEATHER2.weather_icon, weather.weather_icon);
        assert.isDefined(weather.forecast_time);
        assert.isDefined(weather.created_at);
        assert.deepEqual(WEATHER2.metadata, weather.metadata);

        // Create the third weather record
        weather = await this._persistence.create(
            ctx,
            WEATHER3
        );
        assert.isObject(weather);
        assert.equal(WEATHER3.id, weather.id);
        assert.equal(WEATHER3.type, weather.type);
        assert.equal(WEATHER3.location, weather.location);
        assert.equal(WEATHER3.temperature, weather.temperature);
        assert.equal(WEATHER3.humidity, weather.humidity);
        assert.equal(WEATHER3.weather_description, weather.weather_description);
        assert.equal(WEATHER3.weather_icon, weather.weather_icon);
        assert.isDefined(weather.forecast_time);
        assert.isDefined(weather.created_at);
        assert.deepEqual(WEATHER3.metadata, weather.metadata);
    }

    public async testCrudOperations() {
        // Create test context
        let ctx: IContext = new Context({ correlation_id: 'test' });
        
        // Create items
        await this.testCreateWeatherRecords();

        // Get all weather records
        let page = await this._persistence.getPageByFilter(
            ctx,
            new FilterParams(),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        let weather1 = page.data[0];

        // Update the weather record
        weather1.temperature = 26.5;
        weather1.weather_description = 'Very Sunny';

        let weather = await this._persistence.update(
            ctx,
            weather1
        );
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);
        assert.equal(26.5, weather.temperature);
        assert.equal('Very Sunny', weather.weather_description);

        // Get weather by location
        weather = await this._persistence.getOneByLocation(
            ctx, 
            weather1.location
        );
        assert.isObject(weather);
        // Might return any record for this location since there are 2 for New York
        assert.equal(weather1.location, weather.location);

        // Delete the weather record
        weather = await this._persistence.deleteById(
            ctx,
            weather1.id
        );
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);

        // Try to get deleted weather
        weather = await this._persistence.getOneById(
            ctx,
            weather1.id
        );
        assert.isNull(weather || null);
    }

    public async testGetWithFilters() {
        // Create test context
        let ctx: IContext = new Context({ correlation_id: 'test' });
        
        // Create items
        await this.testCreateWeatherRecords();

        // Filter by id
        let page = await this._persistence.getPageByFilter(
            ctx,
            FilterParams.fromTuples(
                'id', '1'
            ),
            new PagingParams()
        );
        assert.lengthOf(page.data, 1);

        // Filter by location
        page = await this._persistence.getPageByFilter(
            ctx,
            FilterParams.fromTuples(
                'location', 'New York'
            ),
            new PagingParams()
        );
        assert.lengthOf(page.data, 2);

        // Filter by type
        page = await this._persistence.getPageByFilter(
            ctx,
            FilterParams.fromTuples(
                'type', WeatherTypeV1.Current
            ),
            new PagingParams()
        );
        assert.lengthOf(page.data, 2);

        // Filter by min temperature
        page = await this._persistence.getPageByFilter(
            ctx,
            FilterParams.fromTuples(
                'min_temp', 20
            ),
            new PagingParams()
        );
        assert.isTrue(page.data.length >= 2);
        
        // Filter by max temperature
        page = await this._persistence.getPageByFilter(
            ctx,
            FilterParams.fromTuples(
                'max_temp', 20
            ),
            new PagingParams()
        );
        assert.isTrue(page.data.length >= 1);
    }

    public async testGetByLocation() {
        // Create test context
        let ctx: IContext = new Context({ correlation_id: 'test' });
        
        // Create items
        await this.testCreateWeatherRecords();

        // Get weather by location
        let weather = await this._persistence.getOneByLocation(
            ctx,
            'Los Angeles'
        );
        assert.isObject(weather);
        assert.equal('Los Angeles', weather.location);
        assert.equal(30.0, weather.temperature);
    }
} 