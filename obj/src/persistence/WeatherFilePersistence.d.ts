import { JsonFilePersister } from 'pip-services4-persistence-node';
import { ConfigParams } from 'pip-services4-components-node';
import { WeatherV1 } from '../data/version1/WeatherV1';
import { WeatherMemoryPersistence } from './WeatherMemoryPersistence';
export declare class WeatherFilePersistence extends WeatherMemoryPersistence {
    protected _persister: JsonFilePersister<WeatherV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
