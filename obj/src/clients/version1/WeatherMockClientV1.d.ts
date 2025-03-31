import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IContext } from 'pip-services4-components-node';
import { WeatherV1 } from '../../data/version1/WeatherV1';
import { IWeatherClientV1 } from './IWeatherClientV1';
export declare class WeatherMockClientV1 implements IWeatherClientV1 {
    private _weather;
    getWeather(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>>;
    getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1>;
    getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1>;
    createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1>;
    updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1>;
    deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1>;
}
