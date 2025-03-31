import { ConfigParams } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';
import { References } from 'pip-services4-components-node';

import { WeatherMemoryPersistence } from '../../../src/persistence/WeatherMemoryPersistence';
import { WeatherService } from '../../../src/services/WeatherService';
import { WeatherHttpControllerV1 } from '../../../src/controllers/version1/WeatherHttpControllerV1';
import { WeatherHttpClientV1 } from '../../../src/clients/version1/WeatherHttpClientV1';
import { WeatherClientV1Fixture } from './WeatherClientV1Fixture';

suite('WeatherHttpClientV1', () => {
    let persistence: WeatherMemoryPersistence;
    let service: WeatherService;
    let controller: WeatherHttpControllerV1;
    let client: WeatherHttpClientV1;
    let fixture: WeatherClientV1Fixture;

    setup(async () => {
        persistence = new WeatherMemoryPersistence();
        persistence.configure(new ConfigParams());

        service = new WeatherService();
        service.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        controller = new WeatherHttpControllerV1();
        controller.configure(httpConfig);

        client = new WeatherHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('weather', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('weather', 'service', 'default', 'default', '1.0'), service,
            new Descriptor('weather', 'controller', 'http', 'default', '1.0'), controller,
            new Descriptor('weather', 'client', 'http', 'default', '1.0'), client
        );
        service.setReferences(references);
        controller.setReferences(references);
        client.setReferences(references);

        fixture = new WeatherClientV1Fixture(client);

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
        await fixture.testCrudOperations();
    });

    test('Filter Weather', async () => {
        await fixture.testFiltering();
    });
}); 