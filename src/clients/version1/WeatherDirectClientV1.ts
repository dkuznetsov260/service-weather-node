import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { Descriptor } from 'pip-services4-components-node';
import { DirectClient } from 'pip-services4-rpc-node';
import { IContext } from 'pip-services4-components-node';

import { IWeatherClientV1 } from './IWeatherClientV1';
import { WeatherV1 } from '../../data/version1/WeatherV1';
import { IWeatherService } from '../../services/IWeatherService';

export class WeatherDirectClientV1 extends DirectClient<IWeatherService> implements IWeatherClientV1 {
    public constructor() {
        super();
        this._dependencyResolver.put('service', new Descriptor('weather', 'service', '*', '*', '1.0'));
    }

    public async getWeather(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>> {
        let timing = this.instrument(ctx, 'weather.get_weather');
        try {
            return await this._service.getWeather(ctx, filter, paging);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        let timing = this.instrument(ctx, 'weather.get_weather_by_id');
        try {
            return await this._service.getWeatherById(ctx, weatherId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1> {
        let timing = this.instrument(ctx, 'weather.get_weather_by_location');
        try {
            return await this._service.getWeatherByLocation(ctx, location);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        let timing = this.instrument(ctx, 'weather.create_weather');
        try {
            return await this._service.createWeather(ctx, weather);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        let timing = this.instrument(ctx, 'weather.update_weather');
        try {
            return await this._service.updateWeather(ctx, weather);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        let timing = this.instrument(ctx, 'weather.delete_weather_by_id');
        try {
            return await this._service.deleteWeatherById(ctx, weatherId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
} 