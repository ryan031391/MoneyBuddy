import { connect } from 'react-redux';
import TransactionForm from './transaction_form'
import { createTrans } from '../../actions/transaction_action';
import {fetchAllCategory} from '../../actions/category_actions';

const mapStateToProps = (state) => {
    return {
        name: "",
        description: "",
        amount: "",
        type: "expense",
        categories: Object.values(state.entities.categories),
        currentUser: state.session.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      action: (transaction) => dispatch(createTrans(transaction)),
      fetchAllCategory: () => dispatch(fetchAllCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);

