import { CommandSet } from 'pip-services4-rpc-node';
import { ICommand } from 'pip-services4-rpc-node';
import { Command } from 'pip-services4-rpc-node';
import { ObjectSchema } from 'pip-services4-data-node';
import { FilterParamsSchema } from 'pip-services4-data-node';
import { PagingParamsSchema } from 'pip-services4-data-node';
import { TypeCode } from 'pip-services4-commons-node';
import { Parameters } from 'pip-services4-components-node';
import { IContext } from 'pip-services4-components-node';
import { FilterParams } from 'pip-services4-data-node';
import { PagingParams } from 'pip-services4-data-node';

import { WeatherV1Schema } from '../data/version1/WeatherV1Schema';
import { IWeatherService } from './IWeatherService';

export class WeatherCommandSet extends CommandSet {
    private _service: IWeatherService;

    constructor(service: IWeatherService) {
        super();

        this._service = service;

        this.addCommand(this.makeGetWeatherCommand());
        this.addCommand(this.makeGetWeatherByIdCommand());
        this.addCommand(this.makeGetWeatherByLocationCommand());
        this.addCommand(this.makeCreateWeatherCommand());
        this.addCommand(this.makeUpdateWeatherCommand());
        this.addCommand(this.makeDeleteWeatherByIdCommand());
    }

    private makeGetWeatherCommand(): ICommand {
        return new Command(
            'get_weather',
            new ObjectSchema(true)
                .withOptionalProperty('filter', new FilterParamsSchema())
                .withOptionalProperty('paging', new PagingParamsSchema()),
            async (ctx: IContext, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get('filter'));
                let paging = PagingParams.fromValue(args.get('paging'));
                return await this._service.getWeather(ctx, filter, paging);
            }
        );
    }

    private makeGetWeatherByIdCommand(): ICommand {
        return new Command(
            'get_weather_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('weather_id', TypeCode.String),
            async (ctx: IContext, args: Parameters) => {
                let weatherId = args.getAsString('weather_id');
                return await this._service.getWeatherById(ctx, weatherId);
            }
        );
    }

    private makeGetWeatherByLocationCommand(): ICommand {
        return new Command(
            'get_weather_by_location',
            new ObjectSchema(true)
                .withRequiredProperty('location', TypeCode.String),
            async (ctx: IContext, args: Parameters) => {
                let location = args.getAsString('location');
                return await this._service.getWeatherByLocation(ctx, location);
            }
        );
    }

    private makeCreateWeatherCommand(): ICommand {
        return new Command(
            'create_weather',
            new ObjectSchema(true)
                .withRequiredProperty('weather', new WeatherV1Schema()),
            async (ctx: IContext, args: Parameters) => {
                let weather = args.getAsObject('weather');
                return await this._service.createWeather(ctx, weather);
            }
        );
    }   

    private makeUpdateWeatherCommand(): ICommand {
        return new Command(
            'update_weather',
            new ObjectSchema(true)
                .withRequiredProperty('weather', new WeatherV1Schema()),
            async (ctx: IContext, args: Parameters) => {
                let weather = args.getAsObject('weather');
                return await this._service.updateWeather(ctx, weather);
            }
        );
    }   
    
    private makeDeleteWeatherByIdCommand(): ICommand {
        return new Command(
            'delete_weather_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('weather_id', TypeCode.String),
            async (ctx: IContext, args: Parameters) => {
                let weatherId = args.getAsString('weather_id');
                return await this._service.deleteWeatherById(ctx, weatherId);
            }
        );
    }
} 