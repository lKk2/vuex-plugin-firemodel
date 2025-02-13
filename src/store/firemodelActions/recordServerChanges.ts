import { ActionTree } from "vuex";
import { IFiremodelState } from "../../index";
import { FmEvents, IFmWatchEvent } from "firemodel";
import { FmCrudMutation } from "../../types/mutations/FmCrudMutation";
import { determineLocalStateNode } from "../../shared/determineLocalStateNode";

export const recordServerChanges = <T>() =>
  ({
    [FmEvents.RECORD_ADDED]({ commit }, payload: IFmWatchEvent) {
      commit(
        determineLocalStateNode(payload, FmCrudMutation.serverAdd),
        payload,
        {
          root: true
        }
      );
    },

    [FmEvents.RECORD_REMOVED]({ commit }, payload) {
      commit(
        determineLocalStateNode(payload, FmCrudMutation.serverRemove),
        payload,
        {
          root: true
        }
      );
    },

    [FmEvents.RECORD_CHANGED](store, payload: IFmWatchEvent) {
      // Send mutation to appropriate state node
      this.commit(
        determineLocalStateNode(payload, FmCrudMutation.serverChange),
        payload,
        {
          root: true
        }
      );
    }
  } as ActionTree<IFiremodelState<T>, T>);
