"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services4_components_node_1 = require("pip-services4-components-node");
const pip_services4_components_node_2 = require("pip-services4-components-node");
const pip_services4_components_node_3 = require("pip-services4-components-node");
const WeatherMemoryPersistence_1 = require("../../../src/persistence/WeatherMemoryPersistence");
const WeatherService_1 = require("../../../src/services/WeatherService");
const WeatherHttpControllerV1_1 = require("../../../src/controllers/version1/WeatherHttpControllerV1");
const WeatherHttpClientV1_1 = require("../../../src/clients/version1/WeatherHttpClientV1");
const WeatherClientV1Fixture_1 = require("./WeatherClientV1Fixture");
suite('WeatherHttpClientV1', () => {
    let persistence;
    let service;
    let controller;
    let client;
    let fixture;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new WeatherMemoryPersistence_1.WeatherMemoryPersistence();
        persistence.configure(new pip_services4_components_node_1.ConfigParams());
        service = new WeatherService_1.WeatherService();
        service.configure(new pip_services4_components_node_1.ConfigParams());
        let httpConfig = pip_services4_components_node_1.ConfigParams.fromTuples('connection.protocol', 'http', 'connection.port', 3000, 'connection.host', 'localhost');
        controller = new WeatherHttpControllerV1_1.WeatherHttpControllerV1();
        controller.configure(httpConfig);
        client = new WeatherHttpClientV1_1.WeatherHttpClientV1();
        client.configure(httpConfig);
        let references = pip_services4_components_node_3.References.fromTuples(new pip_services4_components_node_2.Descriptor('weather', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services4_components_node_2.Descriptor('weather', 'service', 'default', 'default', '1.0'), service, new pip_services4_components_node_2.Descriptor('weather', 'controller', 'http', 'default', '1.0'), controller, new pip_services4_components_node_2.Descriptor('weather', 'client', 'http', 'default', '1.0'), client);
        service.setReferences(references);
        controller.setReferences(references);
        client.setReferences(references);
        fixture = new WeatherClientV1Fixture_1.WeatherClientV1Fixture(client);
        yield persistence.open(null);
        yield controller.open(null);
        yield client.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close(null);
        yield controller.close(null);
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Filter Weather', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testFiltering();
    }));
});
//# sourceMappingURL=WeatherHttpClientV1Test.js.map