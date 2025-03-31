import { WeatherMockClientV1 } from '../../../src/clients/version1/WeatherMockClientV1';
import { WeatherClientV1Fixture } from './WeatherClientV1Fixture';

suite('WeatherMockClientV1', () => {
    let client: WeatherMockClientV1;
    let fixture: WeatherClientV1Fixture;

    setup(() => {
        client = new WeatherMockClientV1();
        fixture = new WeatherClientV1Fixture(client);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Filter Weather', async () => {
        await fixture.testFiltering();
    });
}); 