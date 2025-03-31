import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IContext } from 'pip-services4-components-node';

import { WeatherV1 } from '../../data/version1/WeatherV1';
import { IWeatherClientV1 } from './IWeatherClientV1';
import { WeatherTypeV1 } from '../../data/version1/WeatherTypeV1';

export class WeatherMockClientV1 implements IWeatherClientV1 {
    private _weather: WeatherV1[] = [];

    public async getWeather(ctx: IContext, filter: FilterParams, paging: PagingParams): Promise<DataPage<WeatherV1>> {
        filter = filter || new FilterParams();
        let location = filter.getAsNullableString('location');
        let type = filter.getAsNullableString('type');
        let minTemp = filter.getAsNullableFloat('min_temp');
        let maxTemp = filter.getAsNullableFloat('max_temp');
        let forecastTimeFrom = filter.getAsNullableDateTime('forecast_time_from');
        let forecastTimeTo = filter.getAsNullableDateTime('forecast_time_to');

        let weather = this._weather.filter((item) => {
            if (location != null && item.location != location)
                return false;
            if (type != null && item.type != type)
                return false;
            if (minTemp != null && item.temperature < minTemp)
                return false;
            if (maxTemp != null && item.temperature > maxTemp)
                return false;
            if (forecastTimeFrom != null && (item.forecast_time == null || item.forecast_time < forecastTimeFrom))
                return false;
            if (forecastTimeTo != null && (item.forecast_time == null || item.forecast_time > forecastTimeTo))
                return false;
            return true;
        });

        paging = paging || new PagingParams();
        let skip = paging.getSkip(0);
        let take = paging.getTake(100);

        let total = weather.length;
        weather = weather.slice(skip, skip + take);

        return new DataPage<WeatherV1>(weather, total);
    }

    public async getWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        let weather = this._weather.find(item => item.id == weatherId);
        return weather;
    }

    public async getWeatherByLocation(ctx: IContext, location: string): Promise<WeatherV1> {
        let weather = this._weather.find(item => item.location == location);
        return weather;
    }

    public async createWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        weather = Object.assign({}, weather);
        weather.type = weather.type || WeatherTypeV1.Current;
        weather.created_at = weather.created_at || new Date();

        this._weather.push(weather);
        return weather;
    }

    public async updateWeather(ctx: IContext, weather: WeatherV1): Promise<WeatherV1> {
        weather = Object.assign({}, weather);

        let index = this._weather.findIndex(item => item.id == weather.id);
        if (index < 0) return null;

        this._weather[index] = weather;
        return weather;
    }

    public async deleteWeatherById(ctx: IContext, weatherId: string): Promise<WeatherV1> {
        let index = this._weather.findIndex(item => item.id == weatherId);
        let weather = this._weather[index];
        if (index < 0) return null;

        this._weather.splice(index, 1);
        return weather;
    }
} 