import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { ConfigParams } from 'pip-services4-components-node';
import { IConfigurable } from 'pip-services4-components-node';
import { IReferences } from 'pip-services4-components-node';
import { IReferenceable } from 'pip-services4-components-node';
import { IContext } from 'pip-services4-components-node';
import { CommandSet } from 'pip-services4-rpc-node';
import { ICommandable } from 'pip-services4-rpc-node';
import { WeatherV1 } from '../data/version1/WeatherV1';
import { IWeatherService } from './IWeatherService';
export declare class WeatherService implements IWeatherService, IConfigurable, IReferenceable, ICommandable {
    private _persistence;
    private _commandSet;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getWeather(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>>;
    getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1>;
    getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1>;
    createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1>;
    updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1>;
    deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1>;
}
