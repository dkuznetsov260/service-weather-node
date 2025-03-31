import { Factory } from 'pip-services4-components-node';
import { Descriptor } from 'pip-services4-components-node';
export declare class WeatherServiceFactory extends Factory {
    static MemoryPersistenceDescriptor: Descriptor;
    static FilePersistenceDescriptor: Descriptor;
    static MongoDbPersistenceDescriptor: Descriptor;
    static ServiceDescriptor: Descriptor;
    static HttpControllerV1Descriptor: Descriptor;
    constructor();
}
