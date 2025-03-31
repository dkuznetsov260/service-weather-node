import { ProcessContainer } from 'pip-services4-container-node';
import { DefaultHttpFactory } from 'pip-services4-http-node';
import { DefaultSwaggerFactory } from 'pip-services4-swagger-node';

import { WeatherServiceFactory } from '../build/WeatherServiceFactory';

export class WeatherProcess extends ProcessContainer {
    public constructor() {
        super('weather', 'Weather microservice');

        this.addFactory(new WeatherServiceFactory());
        this.addFactory(new DefaultHttpFactory());
        this.addFactory(new DefaultSwaggerFactory());
    }
} 