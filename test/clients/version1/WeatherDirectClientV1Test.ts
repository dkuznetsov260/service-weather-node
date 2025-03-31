import { ConfigParams } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';
import { References } from 'pip-services4-components-node';

import { WeatherMemoryPersistence } from '../../../src/persistence/WeatherMemoryPersistence';
import { WeatherService } from '../../../src/services/WeatherService';
import { WeatherDirectClientV1 } from '../../../src/clients/version1/WeatherDirectClientV1';
import { WeatherClientV1Fixture } from './WeatherClientV1Fixture';

suite('WeatherDirectClientV1', () => {
    let persistence: WeatherMemoryPersistence;
    let service: WeatherService;
    let client: WeatherDirectClientV1;
    let fixture: WeatherClientV1Fixture;

    setup(async () => {
        persistence = new WeatherMemoryPersistence();
        persistence.configure(new ConfigParams());

        service = new WeatherService();
        service.configure(new ConfigParams());

        client = new WeatherDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('weather', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('weather', 'service', 'default', 'default', '1.0'), service,
            new Descriptor('weather', 'client', 'direct', 'default', '1.0'), client
        );
        service.setReferences(references);
        client.setReferences(references);

        fixture = new WeatherClientV1Fixture(client);

        await persistence.open(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Filter Weather', async () => {
        await fixture.testFiltering();
    });
}); 