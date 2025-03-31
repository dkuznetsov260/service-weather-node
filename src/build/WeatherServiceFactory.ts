import { Factory } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';

import { WeatherMemoryPersistence } from '../persistence/WeatherMemoryPersistence';
import { WeatherFilePersistence } from '../persistence/WeatherFilePersistence';
import { WeatherMongoDbPersistence } from '../persistence/WeatherMongoDbPersistence';
import { WeatherService } from '../services/WeatherService';
import { WeatherHttpControllerV1 } from '../controllers/version1/WeatherHttpControllerV1';

export class WeatherServiceFactory extends Factory {
    public static MemoryPersistenceDescriptor = new Descriptor('weather', 'persistence', 'memory', '*', '1.0');
    public static FilePersistenceDescriptor = new Descriptor('weather', 'persistence', 'file', '*', '1.0');
    public static MongoDbPersistenceDescriptor = new Descriptor('weather', 'persistence', 'mongodb', '*', '1.0');
    public static ServiceDescriptor = new Descriptor('weather', 'service', 'default', '*', '1.0');
    public static HttpControllerV1Descriptor = new Descriptor('weather', 'controller', 'http', '*', '1.0');
    
    constructor() {
        super();

        this.registerAsType(WeatherServiceFactory.MemoryPersistenceDescriptor, WeatherMemoryPersistence);
        this.registerAsType(WeatherServiceFactory.FilePersistenceDescriptor, WeatherFilePersistence);
        this.registerAsType(WeatherServiceFactory.MongoDbPersistenceDescriptor, WeatherMongoDbPersistence);
        this.registerAsType(WeatherServiceFactory.ServiceDescriptor, WeatherService);
        this.registerAsType(WeatherServiceFactory.HttpControllerV1Descriptor, WeatherHttpControllerV1);
    }
} 