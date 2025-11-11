'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_ACTION = 'addProperties';
  const REMOVE_ACTION = 'removeProperties';
  const CLEAR_ACTION = 'clear';

  // Array to hold clones of `state` after each action
  const stateClones = [];
  const prevClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_ACTION: {
        Object.assign(prevClone, action.extraData);
        break;
      }

      case REMOVE_ACTION: {
        for (const key of action.keysToRemove) {
          delete prevClone[key];
        }
        break;
      }

      case CLEAR_ACTION: {
        for (const key in prevClone) {
          delete prevClone[key];
        }
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
    stateClones.push({ ...prevClone });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
