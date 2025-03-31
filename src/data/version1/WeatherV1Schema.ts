import { ObjectSchema } from 'pip-services4-data-node';
import { TypeCode } from 'pip-services4-commons-node';

export class WeatherV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('type', TypeCode.String);
        this.withRequiredProperty('location', TypeCode.String);
        this.withRequiredProperty('temperature', TypeCode.Double);
        this.withOptionalProperty('humidity', TypeCode.Double);
        this.withOptionalProperty('weather_description', TypeCode.String);
        this.withOptionalProperty('weather_icon', TypeCode.String);
        this.withRequiredProperty('forecast_time', TypeCode.DateTime);
        this.withOptionalProperty('created_at', TypeCode.DateTime);
        this.withOptionalProperty('metadata', null);
    }
} 