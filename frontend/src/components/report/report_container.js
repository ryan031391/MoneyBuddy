import { fetchTrans } from "../../actions/transaction_action"
import Report from "./report";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  transactions: Object.values(state.entities.transactions),
  currentUser: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTransactions: () => dispatch(fetchTrans()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Report);
