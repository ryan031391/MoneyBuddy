import Icon from "./icon";
import { connect } from "react-redux";
import {purchasePoint} from '../../actions/purchase_action'
import {updatePoints} from "../../actions/purchase_action"

const mapStateToProps = (state) => ({
  icons: state.icons,
  currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
  purchasePoint: (icon) => dispatch(purchasePoint(icon)),
  updatePoints: (point) => dispatch(updatePoints(point))
});

export default connect(mapStateToProps, mapDispatchToProps)(Icon);



