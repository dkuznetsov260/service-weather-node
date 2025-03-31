import { CommandableHttpController } from 'pip-services4-http-node';
import { Descriptor } from 'pip-services4-components-node';

export class WeatherHttpControllerV1 extends CommandableHttpController {
    public constructor() {
        super('v1/weather');
        this._dependencyResolver.put('service', new Descriptor('weather', 'service', '*', '*', '1.0'));
    }
} 