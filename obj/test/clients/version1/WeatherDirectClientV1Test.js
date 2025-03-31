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
const WeatherDirectClientV1_1 = require("../../../src/clients/version1/WeatherDirectClientV1");
const WeatherClientV1Fixture_1 = require("./WeatherClientV1Fixture");
suite('WeatherDirectClientV1', () => {
    let persistence;
    let service;
    let client;
    let fixture;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new WeatherMemoryPersistence_1.WeatherMemoryPersistence();
        persistence.configure(new pip_services4_components_node_1.ConfigParams());
        service = new WeatherService_1.WeatherService();
        service.configure(new pip_services4_components_node_1.ConfigParams());
        client = new WeatherDirectClientV1_1.WeatherDirectClientV1();
        let references = pip_services4_components_node_3.References.fromTuples(new pip_services4_components_node_2.Descriptor('weather', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services4_components_node_2.Descriptor('weather', 'service', 'default', 'default', '1.0'), service, new pip_services4_components_node_2.Descriptor('weather', 'client', 'direct', 'default', '1.0'), client);
        service.setReferences(references);
        client.setReferences(references);
        fixture = new WeatherClientV1Fixture_1.WeatherClientV1Fixture(client);
        yield persistence.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Filter Weather', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testFiltering();
    }));
});
//# sourceMappingURL=WeatherDirectClientV1Test.js.map