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
const WeatherMockClientV1_1 = require("../../../src/clients/version1/WeatherMockClientV1");
const WeatherClientV1Fixture_1 = require("./WeatherClientV1Fixture");
suite('WeatherMockClientV1', () => {
    let client;
    let fixture;
    setup(() => {
        client = new WeatherMockClientV1_1.WeatherMockClientV1();
        fixture = new WeatherClientV1Fixture_1.WeatherClientV1Fixture(client);
    });
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Filter Weather', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testFiltering();
    }));
});
//# sourceMappingURL=WeatherMockClientV1Test.js.map