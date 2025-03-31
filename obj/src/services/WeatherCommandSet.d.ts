import { CommandSet } from 'pip-services4-rpc-node';
import { IWeatherService } from './IWeatherService';
export declare class WeatherCommandSet extends CommandSet {
    private _service;
    constructor(service: IWeatherService);
    private makeGetWeatherCommand;
    private makeGetWeatherByIdCommand;
    private makeGetWeatherByLocationCommand;
    private makeCreateWeatherCommand;
    private makeUpdateWeatherCommand;
    private makeDeleteWeatherByIdCommand;
}
