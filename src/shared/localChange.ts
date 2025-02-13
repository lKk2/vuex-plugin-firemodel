import { IFmWatchEvent, Record, FmEvents } from "firemodel";
import { IFmLocalChange } from "../index";
import { IFmEventActions } from "../types";
import { IDictionary } from "firemock";

/**
 * converts a "local change" event into the right data structure
 */
export function localChange(event: IFmWatchEvent): IFmLocalChange {
  const record = Record.createWith(event.modelConstructor, event.value);
  return {
    dbPath: record.dbPath,
    action: mapper(event.type),
    localPath: record.localPath,
    value: event.value,
    timestamp: new Date().getTime()
  };
}

function mapper(evtType: string): IFmEventActions {
  const fields: IDictionary<IFmEventActions> = {
    [FmEvents.RECORD_ADDED_LOCALLY]: "add",
    [FmEvents.RECORD_CHANGED_LOCALLY]: "update",
    [FmEvents.RECORD_REMOVED_LOCALLY]: "remove"
  };
  return fields[evtType] || "unknown";
}
