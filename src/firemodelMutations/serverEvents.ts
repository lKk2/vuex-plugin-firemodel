import { MutationTree } from "vuex";
import { FmCrudMutation } from "../types/mutations/FmCrudMutation";
import { Model, IFmWatchEvent } from "firemodel";
import { changeRoot } from "../shared/changeRoot";
import { updateList } from "../shared/updateList";
import { isRecord } from "../shared/isRecord";

export function serverEvents<T>(
  propOffset?: keyof T & string
): MutationTree<T> {
  const offset = !propOffset ? ("all" as keyof T & string) : propOffset;
  return {
    [FmCrudMutation.serverAdd](
      /**
       * either a dictionary which includes the "offsetProp" or the array
       * of records at the root of the state structure
       */
      state: T,
      payload: IFmWatchEvent<T>
    ) {
      if (isRecord(state, payload)) {
        changeRoot<T>(state, payload.value);
      } else {
        updateList<T>(state, offset, payload.value);
      }
    },

    [FmCrudMutation.serverChange](
      /**
       * Either a dictionary which includes the "offsetProp" or the array
       * of records at the root of the state structure
       */
      state: T,
      payload: IFmWatchEvent<Model>
    ) {
      if (payload.value === null) {
        // a "remove" event will also be picked up by the "change" event
        // passed by Firebase. This mutation will be ignored with the
        // assumption that the "remove" mutation will handle the state
        // change.
        return;
      }
      if (isRecord(state, payload)) {
        changeRoot<T>(state, payload.value);
      } else {
        updateList<T>(state, offset, payload.value);
      }
    },

    [FmCrudMutation.serverRemove](
      /**
       * either a dictionary which includes the "offsetProp" or the array
       * of records at the root of the state structure
       */
      state: T,
      payload: IFmWatchEvent<Model>
    ) {
      if (isRecord(state, payload)) {
        changeRoot(state, null);
      } else {
        updateList<T>(state, offset, payload.value);
      }
    }
  };
}
