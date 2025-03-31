import { IContext } from 'pip-services4-components-node';
import { FilterParams, PagingParams, DataPage } from 'pip-services4-data-node';
import { WeatherV1 } from '../data/version1/WeatherV1';

export interface IWeatherPersistence {
    getPageByFilter(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>>;

    getOneById(ctx: IContext, id: string): Promise<WeatherV1>;
    
    getOneByLocation(ctx: IContext, location: string): Promise<WeatherV1>;
    
    create(ctx: IContext, item: WeatherV1): Promise<WeatherV1>;
    
    update(ctx: IContext, item: WeatherV1): Promise<WeatherV1>;
    
    deleteById(ctx: IContext, id: string): Promise<WeatherV1>;
} 