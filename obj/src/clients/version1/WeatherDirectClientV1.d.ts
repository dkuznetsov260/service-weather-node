import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { DirectClient } from 'pip-services4-rpc-node';
import { IContext } from 'pip-services4-components-node';
import { IWeatherClientV1 } from './IWeatherClientV1';
import { WeatherV1 } from '../../data/version1/WeatherV1';
import { IWeatherService } from '../../services/IWeatherService';
export declare class WeatherDirectClientV1 extends DirectClient<IWeatherService> implements IWeatherClientV1 {
    constructor();
    getWeather(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>>;
    getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1>;
    getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1>;
    createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1>;
    updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1>;
    deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1>;
}
