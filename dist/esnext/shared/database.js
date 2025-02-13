import { DB } from "abstracted-client";
import { FireModelPluginError } from "../errors/FiremodelPluginError";
let _db;
let _config;
/**
 * connects to a Firebase DB unless already connected in which case it
 * it just hands back the existing connection.
 */
export async function database(config) {
    if (config) {
        if (JSON.stringify(config) !== JSON.stringify(_config) || !_db) {
            _db = await DB.connect(config);
        }
        _config = config;
    }
    if (!_db) {
        throw new FireModelPluginError("Trying to get the database connection but it has not been established yet!", "not-ready");
    }
    return _db;
}
