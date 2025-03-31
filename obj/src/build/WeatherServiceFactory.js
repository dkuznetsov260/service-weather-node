"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherServiceFactory = void 0;
const pip_services4_components_node_1 = require("pip-services4-components-node");
const pip_services4_components_node_2 = require("pip-services4-components-node");
const WeatherMemoryPersistence_1 = require("../persistence/WeatherMemoryPersistence");
const WeatherFilePersistence_1 = require("../persistence/WeatherFilePersistence");
const WeatherMongoDbPersistence_1 = require("../persistence/WeatherMongoDbPersistence");
const WeatherService_1 = require("../services/WeatherService");
const WeatherHttpControllerV1_1 = require("../controllers/version1/WeatherHttpControllerV1");
class WeatherServiceFactory extends pip_services4_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(WeatherServiceFactory.MemoryPersistenceDescriptor, WeatherMemoryPersistence_1.WeatherMemoryPersistence);
        this.registerAsType(WeatherServiceFactory.FilePersistenceDescriptor, WeatherFilePersistence_1.WeatherFilePersistence);
        this.registerAsType(WeatherServiceFactory.MongoDbPersistenceDescriptor, WeatherMongoDbPersistence_1.WeatherMongoDbPersistence);
        this.registerAsType(WeatherServiceFactory.ServiceDescriptor, WeatherService_1.WeatherService);
        this.registerAsType(WeatherServiceFactory.HttpControllerV1Descriptor, WeatherHttpControllerV1_1.WeatherHttpControllerV1);
    }
}
exports.WeatherServiceFactory = WeatherServiceFactory;
WeatherServiceFactory.MemoryPersistenceDescriptor = new pip_services4_components_node_2.Descriptor('weather', 'persistence', 'memory', '*', '1.0');
WeatherServiceFactory.FilePersistenceDescriptor = new pip_services4_components_node_2.Descriptor('weather', 'persistence', 'file', '*', '1.0');
WeatherServiceFactory.MongoDbPersistenceDescriptor = new pip_services4_components_node_2.Descriptor('weather', 'persistence', 'mongodb', '*', '1.0');
WeatherServiceFactory.ServiceDescriptor = new pip_services4_components_node_2.Descriptor('weather', 'service', 'default', '*', '1.0');
WeatherServiceFactory.HttpControllerV1Descriptor = new pip_services4_components_node_2.Descriptor('weather', 'controller', 'http', '*', '1.0');
//# sourceMappingURL=WeatherServiceFactory.js.map