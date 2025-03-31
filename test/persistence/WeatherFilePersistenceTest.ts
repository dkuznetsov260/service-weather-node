import { ConfigParams } from 'pip-services4-components-node';

import { WeatherFilePersistence } from '../../src/persistence/WeatherFilePersistence';
import { WeatherPersistenceFixture } from './WeatherPersistenceFixture';

suite('WeatherFilePersistence', () => {
    let persistence: WeatherFilePersistence;
    let fixture: WeatherPersistenceFixture;

    setup(async () => {
        persistence = new WeatherFilePersistence('./data/weather.test.json');
        persistence.configure(new ConfigParams());

        fixture = new WeatherPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilters();
    });

    test('Get by Location', async () => {
        await fixture.testGetByLocation();
    });
}); 