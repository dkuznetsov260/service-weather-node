import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IContext } from 'pip-services4-components-node';

import { WeatherV1 } from '../../data/version1/WeatherV1';
import { IWeatherClientV1 } from './IWeatherClientV1';

export class WeatherNullClientV1 implements IWeatherClientV1 {
    public async getWeather(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>> {
        return new DataPage<WeatherV1>();
    }

    public async getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        return null;
    }

    public async getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1> {
        return null;
    }

    public async createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        return weather;
    }

    public async updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        return weather;
    }

    public async deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        return null;
    }
} 