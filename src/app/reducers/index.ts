import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';
import { Logger } from '@shared';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/**
 * META-REDUCERS
 */

const log = new Logger('Action');

/**
 * Log every action for debugging / error or warn actions for more info
 *
 * @param {ActionReducer<State>} reducer
 * @returns {ActionReducer<State>}
 */
export function actionLogger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const newState = reducer(state, action);
    if (action.type.startsWith('@ngrx/router')) {
      log.debug(`${action.type} (url: ${action['payload'].event.url})`);
    } else if (action['error']) {
      log.error(`${action.type} (error: ${action['error']['code']})`, {
        action: action,
        oldState: state,
        newState
      });
    } else if (action['warn']) {
      log.warn(`${action.type} (warn: ${action['warn']})`, {
        action: action,
        oldState: state,
        newState
      });
    } else {
      log.info(action.type, {
        action: action,
        oldState: state,
        newState
      });
    }

    return newState;
  };
}
