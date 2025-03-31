import { IContext } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';
import { DataPage } from 'pip-services4-data-node';
import { IdentifiableMongoDbPersistence } from 'pip-services4-mongodb-node';

import { WeatherV1 } from '../data/version1/WeatherV1';
import { IWeatherPersistence } from './IWeatherPersistence';

export class WeatherMongoDbPersistence
    extends IdentifiableMongoDbPersistence<WeatherV1, string>
    implements IWeatherPersistence {

    constructor() {
        super('weather');
        this._maxPageSize = 100;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({ _id: id });
        }

        let location = filter.getAsNullableString('location');
        if (location != null) {
            criteria.push({ location: location });
        }

        let type = filter.getAsNullableString('type');
        if (type != null) {
            criteria.push({ type: type });
        }

        let minTemp = filter.getAsNullableFloat('min_temp');
        if (minTemp != null) {
            criteria.push({ temperature: { $gte: minTemp } });
        }

        let maxTemp = filter.getAsNullableFloat('max_temp');
        if (maxTemp != null) {
            criteria.push({ temperature: { $lte: maxTemp } });
        }

        let forecastTimeFrom = filter.getAsNullableDateTime('forecast_time_from');
        if (forecastTimeFrom != null) {
            criteria.push({ forecast_time: { $gte: forecastTimeFrom } });
        }

        let forecastTimeTo = filter.getAsNullableDateTime('forecast_time_to');
        if (forecastTimeTo != null) {
            criteria.push({ forecast_time: { $lte: forecastTimeTo } });
        }

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public getPageByFilter(ctx: IContext, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<WeatherV1>> {
        return super.getPageByFilter(ctx, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByLocation(ctx: IContext, location: string): Promise<WeatherV1> {
        let criteria = {
            location: location
        };

        let item: any = await this._collection.findOne(criteria);

        if (item != null) this._logger.trace(ctx, "Found weather for %s", location);
        else this._logger.trace(ctx, "Cannot find weather for %s", location);
        
        item = this.convertToPublic(item);
        return item;
    }
} 