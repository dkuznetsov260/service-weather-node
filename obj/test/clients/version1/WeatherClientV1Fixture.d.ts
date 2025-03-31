import { IWeatherClientV1 } from '../../../src/clients/version1/IWeatherClientV1';
export declare class WeatherClientV1Fixture {
    private _client;
    private _ctx;
    constructor(client: IWeatherClientV1);
    testCrudOperations(): Promise<void>;
    testFiltering(): Promise<void>;
}
