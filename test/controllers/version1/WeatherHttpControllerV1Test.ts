const assert = require('chai').assert;

import { DataPage } from 'pip-services4-data-node';
import { ConfigParams } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';
import { References } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { TestCommandableHttpClient } from 'pip-services4-http-node';
import { Context } from 'pip-services4-components-node';

import { WeatherV1 } from '../../../src/data/version1/WeatherV1';
import { WeatherTypeV1 } from '../../../src/data/version1/WeatherTypeV1';
import { WeatherMemoryPersistence } from '../../../src/persistence/WeatherMemoryPersistence';
import { WeatherService } from '../../../src/services/WeatherService';
import { WeatherHttpControllerV1 } from '../../../src/controllers/version1/WeatherHttpControllerV1';

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

suite('WeatherHttpControllerV1', () => {
    let persistence: WeatherMemoryPersistence;
    let service: WeatherService;
    let controller: WeatherHttpControllerV1;
    let client: TestCommandableHttpClient;
    let ctx: Context;

    setup(async () => {
        let restConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        persistence = new WeatherMemoryPersistence();
        persistence.configure(new ConfigParams());

        service = new WeatherService();
        service.configure(new ConfigParams());

        controller = new WeatherHttpControllerV1();
        controller.configure(restConfig);

        client = new TestCommandableHttpClient('v1/weather');
        client.configure(restConfig);

        ctx = new Context({ correlation_id: 'test' });

        let references = References.fromTuples(
            new Descriptor('weather', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('weather', 'controller', 'http', 'default', '1.0'), controller,
            new Descriptor('weather', 'service', 'default', 'default', '1.0'), service
        );

        service.setReferences(references);
        controller.setReferences(references);

        await persistence.open(null);
        await controller.open(null);
        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
        await controller.close(null);
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        let weather1: WeatherV1;

        // Create the first weather record
        let weather = await client.callCommand<WeatherV1>(
            'create_weather',
            null,
            {
                weather: WEATHER1
            }
        );
        assert.isObject(weather);
        assert.equal(WEATHER1.location, weather.location);
        assert.equal(WEATHER1.temperature, weather.temperature);
        assert.equal(WEATHER1.humidity, weather.humidity);
        assert.equal(WEATHER1.weather_description, weather.weather_description);
        assert.equal(WEATHER1.type, weather.type);
        assert.isDefined(weather.created_at);
        assert.isDefined(weather.forecast_time);

        // Create the second weather record
        weather = await client.callCommand<WeatherV1>(
            'create_weather',
            null,
            {
                weather: WEATHER2
            }
        );
        assert.isObject(weather);
        assert.equal(WEATHER2.location, weather.location);
        assert.equal(WEATHER2.temperature, weather.temperature);
        assert.equal(WEATHER2.humidity, weather.humidity);
        assert.equal(WEATHER2.weather_description, weather.weather_description);
        assert.equal(WEATHER2.type, weather.type);
        assert.isDefined(weather.created_at);
        assert.isDefined(weather.forecast_time);

        // Get all weather records
        let page = await client.callCommand<DataPage<WeatherV1>>(
            'get_weather',
            null,
            {
                filter: new FilterParams(),
                paging: new PagingParams()
            }
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        weather1 = page.data[0];

        // Update the weather record
        weather1.temperature = 26.5;
        weather1.weather_description = 'Very Sunny';

        weather = await client.callCommand<WeatherV1>(
            'update_weather',
            null,
            {
                weather: weather1
            }
        );
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);
        assert.equal(26.5, weather.temperature);
        assert.equal('Very Sunny', weather.weather_description);

        // Get weather by location
        weather = await client.callCommand<WeatherV1>(
            'get_weather_by_location',
            null,
            {
                location: weather1.location
            }
        );
        assert.isObject(weather);
        assert.equal(weather1.location, weather.location);

        // Get weather by id
        weather = await client.callCommand<WeatherV1>(
            'get_weather_by_id',
            null,
            {
                weather_id: weather1.id
            }
        );
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);

        // Delete the weather record
        weather = await client.callCommand<WeatherV1>(
            'delete_weather_by_id',
            null,
            {
                weather_id: weather1.id
            }
        );
        assert.isObject(weather);
        assert.equal(weather1.id, weather.id);

        // Try to get deleted weather
        weather = await client.callCommand<WeatherV1>(
            'get_weather_by_id',
            null,
            {
                weather_id: weather1.id
            }
        );
        assert.isNull(weather || null);
    });

    test('Filter Weather', async () => {
        // Create weather records
        await client.callCommand<WeatherV1>(
            'create_weather',
            null,
            {
                weather: WEATHER1
            }
        );
        await client.callCommand<WeatherV1>(
            'create_weather',
            null,
            {
                weather: WEATHER2
            }
        );

        // Get weather by type
        let page = await client.callCommand<DataPage<WeatherV1>>(
            'get_weather',
            null,
            {
                filter: FilterParams.fromTuples(
                    'type', WeatherTypeV1.Current
                ),
                paging: new PagingParams()
            }
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal(WeatherTypeV1.Current, page.data[0].type);

        // Get weather by location
        page = await client.callCommand<DataPage<WeatherV1>>(
            'get_weather',
            null,
            {
                filter: FilterParams.fromTuples(
                    'location', 'Los Angeles'
                ),
                paging: new PagingParams()
            }
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal('Los Angeles', page.data[0].location);

        // Get weather by min temperature
        page = await client.callCommand<DataPage<WeatherV1>>(
            'get_weather',
            null,
            {
                filter: FilterParams.fromTuples(
                    'min_temp', 26.0
                ),
                paging: new PagingParams()
            }
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);
        assert.equal(28.0, page.data[0].temperature);
    });
}); 