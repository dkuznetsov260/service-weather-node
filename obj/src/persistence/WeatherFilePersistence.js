"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherFilePersistence = void 0;
const pip_services4_persistence_node_1 = require("pip-services4-persistence-node");
const WeatherMemoryPersistence_1 = require("./WeatherMemoryPersistence");
class WeatherFilePersistence extends WeatherMemoryPersistence_1.WeatherMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services4_persistence_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.WeatherFilePersistence = WeatherFilePersistence;
//# sourceMappingURL=WeatherFilePersistence.js.map