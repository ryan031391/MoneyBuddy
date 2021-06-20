import { combineReducers } from 'redux';

import transactions from './transaction_reducer';
import categories from './category_reducer'


export default combineReducers({
    transactions,
    categories
});