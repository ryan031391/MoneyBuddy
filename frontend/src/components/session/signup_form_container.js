import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SessionForm from "./session_form";
import { login, receiveErrors, signup} from "../../actions/session_actions";

const mapStateToProps = ({ errors }) => {
  return {
    email: "",
    password: "",
    username: "",
    errors: errors.session,
    formType: "Create Account",
    formTitle:"Create Acccount",
    displayLink: {
      link: "/login",
      name: "Already have an account?",
      to: "Login",
    },
    password2:"",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: (user) => dispatch(signup(user)),
    demo: (user) => dispatch(login(user)),
    clearErrorAction: () => dispatch(receiveErrors({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
