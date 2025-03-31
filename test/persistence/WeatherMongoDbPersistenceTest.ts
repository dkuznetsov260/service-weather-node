import { ConfigParams } from 'pip-services4-components-node';

import { WeatherMongoDbPersistence } from '../../src/persistence/WeatherMongoDbPersistence';
import { WeatherPersistenceFixture } from './WeatherPersistenceFixture';

suite('WeatherMongoDbPersistence', () => {
    let persistence: WeatherMongoDbPersistence;
    let fixture: WeatherPersistenceFixture;

    setup(async () => {
        let mongoUri = process.env['MONGO_SERVICE_URI'];
        let mongoHost = process.env['MONGO_SERVICE_HOST'] || 'localhost';
        let mongoPort = process.env['MONGO_SERVICE_PORT'] || '27017';
        let mongoDatabase = process.env['MONGO_SERVICE_DB'] || 'test';

        // Exit if mongo connection is not set
        if (mongoUri == null && mongoHost == null) {
            return;
        }

        let dbConfig = ConfigParams.fromTuples(
            'connection.uri', mongoUri,
            'connection.host', mongoHost,
            'connection.port', mongoPort,
            'connection.database', mongoDatabase
        );

        persistence = new WeatherMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new WeatherPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        if (persistence.isOpen()) {
            await fixture.testCrudOperations();
        }
    });

    test('Get with Filters', async () => {
        if (persistence.isOpen()) {
            await fixture.testGetWithFilters();
        }
    });

    test('Get by Location', async () => {
        if (persistence.isOpen()) {
            await fixture.testGetByLocation();
        }
    });
}); 