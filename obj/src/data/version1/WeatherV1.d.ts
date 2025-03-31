import { IStringIdentifiable } from 'pip-services4-data-node';
export declare class WeatherV1 implements IStringIdentifiable {
    id: string;
    type?: string;
    location: string;
    temperature: number;
    humidity?: number;
    weather_description?: string;
    weather_icon?: string;
    forecast_time: Date;
    created_at?: Date;
    metadata?: any;
}
