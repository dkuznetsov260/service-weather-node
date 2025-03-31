import { IContext } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';

import { IdentifiableMemoryPersistence } from 'pip-services4-persistence-node';

import { WeatherV1 } from '../data/version1/WeatherV1';
import { IWeatherPersistence } from './IWeatherPersistence';

export class WeatherMemoryPersistence
    extends IdentifiableMemoryPersistence<WeatherV1, string>
    implements IWeatherPersistence {

    constructor() {
        super();

        this._maxPageSize = 100;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let location = filter.getAsNullableString('location');
        let type = filter.getAsNullableString('type');
        let minTemp = filter.getAsNullableFloat('min_temp');
        let maxTemp = filter.getAsNullableFloat('max_temp');
        let forecastTimeFrom = filter.getAsNullableDateTime('forecast_time_from');
        let forecastTimeTo = filter.getAsNullableDateTime('forecast_time_to');
        
        return (item) => {
            if (id != null && item.id != id)
                return false;
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
        };
    }

    public getPageByFilter(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<WeatherV1>> {
        return super.getPageByFilter(ctx, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByLocation(ctx: IContext, location: string): Promise<WeatherV1> {        
        let item = this._items.find((item) => item.location == location);

        if (item != null) this._logger.trace(ctx, "Found weather for %s", location);
        else this._logger.trace(ctx, "Cannot find weather for %s", location);

        return item;
    }
} 