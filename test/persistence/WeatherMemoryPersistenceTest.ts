import { ConfigParams } from 'pip-services4-components-node';

import { WeatherMemoryPersistence } from '../../src/persistence/WeatherMemoryPersistence';
import { WeatherPersistenceFixture } from './WeatherPersistenceFixture';

suite('WeatherMemoryPersistence', () => {
    let persistence: WeatherMemoryPersistence;
    let fixture: WeatherPersistenceFixture;

    setup(async () => {
        persistence = new WeatherMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new WeatherPersistenceFixture(persistence);

        await persistence.open(null);
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