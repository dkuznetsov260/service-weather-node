import { IContext } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IdentifiableMemoryPersistence } from 'pip-services4-persistence-node';
import { WeatherV1 } from '../data/version1/WeatherV1';
import { IWeatherPersistence } from './IWeatherPersistence';
export declare class WeatherMemoryPersistence extends IdentifiableMemoryPersistence<WeatherV1, string> implements IWeatherPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>>;
    getOneByLocation(ctx: IContext, location: string): Promise<WeatherV1>;
}
