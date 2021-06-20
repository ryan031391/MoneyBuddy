import {RECEIVE_ALL_CATEGORY, RECEIVE_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY} from '../actions/category_actions';


const categoryReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_CATEGORY:
      return action.categories;
    case RECEIVE_CATEGORY:
      return Object.assign({}, state, {
        [action.category.id]: action.category,
      });
    case REMOVE_CATEGORY:
      const nextState = Object.assign({}, state);
      delete nextState[action.categoryId];
      return nextState;
    case UPDATE_CATEGORY:
     return Object.assign({}, state, {[action.category.id]: action.category}) 
    default:
      return state;
  }
};

export default categoryReducer;