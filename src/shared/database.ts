import { DB, IFirebaseClientConfig, FirebaseAuth } from "abstracted-client";
import { FireModelPluginError } from "../errors/FiremodelPluginError";
import { RealTimeDB } from "abstracted-firebase";

let _db: RealTimeDB<FirebaseAuth>;
let _config: IFirebaseClientConfig;
/**
 * connects to a Firebase DB unless already connected in which case it
 * it just hands back the existing connection.
 */
export async function database(config?: IFirebaseClientConfig) {
  if (config) {
    if (JSON.stringify(config) !== JSON.stringify(_config) || !_db) {
      _db = await DB.connect(config);
    }
    _config = config;
  }

  if (!_db) {
    throw new FireModelPluginError(
      "Trying to get the database connection but it has not been established yet!",
      "not-ready"
    );
  }

  return _db;
}
