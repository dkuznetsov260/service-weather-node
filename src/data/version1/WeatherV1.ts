import { IStringIdentifiable } from 'pip-services4-data-node';

export class WeatherV1 implements IStringIdentifiable {
    public id: string;
    public type?: string;
    public location: string;
    public temperature: number;
    public humidity?: number;
    public weather_description?: string;
    public weather_icon?: string;
    public forecast_time: Date;
    public created_at?: Date;
    public metadata?: any;
} 