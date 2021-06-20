import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import NavBar from "./nav_bar";


const mapStateToProps = (state) => ({
  currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
