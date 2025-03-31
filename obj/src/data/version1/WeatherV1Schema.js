"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherV1Schema = void 0;
const pip_services4_data_node_1 = require("pip-services4-data-node");
const pip_services4_commons_node_1 = require("pip-services4-commons-node");
class WeatherV1Schema extends pip_services4_data_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services4_commons_node_1.TypeCode.String);
        this.withOptionalProperty('type', pip_services4_commons_node_1.TypeCode.String);
        this.withRequiredProperty('location', pip_services4_commons_node_1.TypeCode.String);
        this.withRequiredProperty('temperature', pip_services4_commons_node_1.TypeCode.Double);
        this.withOptionalProperty('humidity', pip_services4_commons_node_1.TypeCode.Double);
        this.withOptionalProperty('weather_description', pip_services4_commons_node_1.TypeCode.String);
        this.withOptionalProperty('weather_icon', pip_services4_commons_node_1.TypeCode.String);
        this.withRequiredProperty('forecast_time', pip_services4_commons_node_1.TypeCode.DateTime);
        this.withOptionalProperty('created_at', pip_services4_commons_node_1.TypeCode.DateTime);
        this.withOptionalProperty('metadata', null);
    }
}
exports.WeatherV1Schema = WeatherV1Schema;
//# sourceMappingURL=WeatherV1Schema.js.map