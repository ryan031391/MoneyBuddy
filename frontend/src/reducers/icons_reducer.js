import {
  PURCHASE_ICONS,
  PURCHASE_ICON_ERROR,
} from "../actions/purchase_action";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const iconsReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = state.slice();
  switch (action.type) {
    case PURCHASE_ICONS:
      newState.push(action.icon.icon);
      return newState;
    case RECEIVE_CURRENT_USER:
      return action.currentUser.icons.slice();
    default:
      return state;
  }
};

export default iconsReducer;
