import { JsonFilePersister } from 'pip-services4-persistence-node';
import { ConfigParams } from 'pip-services4-components-node';

import { WeatherV1 } from '../data/version1/WeatherV1';
import { WeatherMemoryPersistence } from './WeatherMemoryPersistence';

export class WeatherFilePersistence extends WeatherMemoryPersistence {
    protected _persister: JsonFilePersister<WeatherV1>;

    constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<WeatherV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams) {
        super.configure(config);
        this._persister.configure(config);
    }
} 