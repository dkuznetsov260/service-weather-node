import { IWeatherPersistence } from '../../src/persistence/IWeatherPersistence';
export declare class WeatherPersistenceFixture {
    private _persistence;
    constructor(persistence: IWeatherPersistence);
    private testCreateWeatherRecords;
    testCrudOperations(): Promise<void>;
    testGetWithFilters(): Promise<void>;
    testGetByLocation(): Promise<void>;
}
