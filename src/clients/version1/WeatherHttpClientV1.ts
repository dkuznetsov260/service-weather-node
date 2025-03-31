import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { CommandableHttpClient } from 'pip-services4-http-node';
import { IContext } from 'pip-services4-components-node';

import { WeatherV1 } from '../../data/version1/WeatherV1';
import { IWeatherClientV1 } from './IWeatherClientV1';

export class WeatherHttpClientV1 extends CommandableHttpClient implements IWeatherClientV1 {
    constructor() {
        super('v1/weather');
    }

    async getWeather(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>> {
        return await this.callCommand(
            'get_weather',
            ctx,
            {
                filter: filter,
                paging: paging
            }
        );
    }

    async getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        return await this.callCommand(
            'get_weather_by_id',
            ctx,
            {
                weather_id: weatherId
            }
        );
    }

    async getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1> {
        return await this.callCommand(
            'get_weather_by_location',
            ctx,
            {
                location: location
            }
        );
    }

    async createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        return await this.callCommand(
            'create_weather',
            ctx,
            {
                weather: weather
            }
        );
    }

    async updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        return await this.callCommand(
            'update_weather',
            ctx,
            {
                weather: weather
            }
        );
    }

    async deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        return await this.callCommand(
            'delete_weather_by_id',
            ctx,
            {
                weather_id: weatherId
            }
        );
    }
} 