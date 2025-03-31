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
const WeatherFilePersistence_1 = require("../../src/persistence/WeatherFilePersistence");
const WeatherPersistenceFixture_1 = require("./WeatherPersistenceFixture");
suite('WeatherFilePersistence', () => {
    let persistence;
    let fixture;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new WeatherFilePersistence_1.WeatherFilePersistence('./data/weather.test.json');
        persistence.configure(new pip_services4_components_node_1.ConfigParams());
        fixture = new WeatherPersistenceFixture_1.WeatherPersistenceFixture(persistence);
        yield persistence.open(null);
        yield persistence.clear(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Get with Filters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testGetWithFilters();
    }));
    test('Get by Location', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testGetByLocation();
    }));
});
//# sourceMappingURL=WeatherFilePersistenceTest.js.map