import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { ConfigParams } from 'pip-services4-components-node';
import { IConfigurable } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';
import { IReferences } from 'pip-services4-components-node';
import { IReferenceable } from 'pip-services4-components-node';
import { IContext } from 'pip-services4-components-node';
import { IdGenerator } from 'pip-services4-data-node';
import { CommandSet } from 'pip-services4-rpc-node';
import { ICommandable } from 'pip-services4-rpc-node';

import { WeatherV1 } from '../data/version1/WeatherV1';
import { IWeatherPersistence } from '../persistence/IWeatherPersistence';
import { WeatherTypeV1 } from '../data/version1/WeatherTypeV1';
import { WeatherCommandSet } from '../services/WeatherCommandSet';
import { IWeatherService } from './IWeatherService';

export class WeatherService implements IWeatherService, IConfigurable, IReferenceable, ICommandable {
    private _persistence: IWeatherPersistence;
    private _commandSet: WeatherCommandSet;

    public constructor() { }

    public configure(config: ConfigParams): void {
    }

    public setReferences(references: IReferences): void {
        this._persistence = references.getOneRequired<IWeatherPersistence>(
            new Descriptor('weather', 'persistence', '*', '*', '1.0')
        );
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new WeatherCommandSet(this);
        }
        return this._commandSet;
    }

    public getWeather(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<WeatherV1>> {
        return this._persistence.getPageByFilter(ctx, filter, paging);
    }

    public getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        return this._persistence.getOneById(ctx, weatherId);
    }

    public getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1> {
        return this._persistence.getOneByLocation(ctx, location);
    }

    public createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        weather.id = weather.id || IdGenerator.nextLong();
        weather.type = weather.type || WeatherTypeV1.Current;
        weather.created_at = weather.created_at || new Date();

        return this._persistence.create(ctx, weather);
    }

    public updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        return this._persistence.update(ctx, weather);
    }

    public deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        return this._persistence.deleteById(ctx, weatherId);
    }
} 