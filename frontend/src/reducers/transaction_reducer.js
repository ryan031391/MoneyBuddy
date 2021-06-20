import {
  RECEIVE_TRANSACTION,
  RECEIVE_TRANSACTIONS,
  REMOVE_TRANSACTION,
} from "../actions/transaction_action";

const transactionReducer = (state = {}, action) => {
    Object.freeze(state)
    let nextState = Object.assign({}, state); 
    switch (action.type) {
        case RECEIVE_TRANSACTIONS:
            action.transactions.forEach(tx => {
                nextState[tx.id] = tx
            });
            return nextState;
        case RECEIVE_TRANSACTION:
            return Object.assign({}, state, {[action.transaction.id]: action.transaction});
        case REMOVE_TRANSACTION:
            delete nextState[action.transaction.id];
            return nextState;
        default:
            return state;
    }
};

export default transactionReducer;