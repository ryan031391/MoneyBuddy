import { connect } from 'react-redux';
import CategoryForm from './category_form'
import { createCategory , fetchAllCategory} from '../../actions/category_actions';



const mapStateToProps = (state) => {
    const user = state.session.user
    return {
        name: "",
        user: user,
        icon: -1,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      action: (category) => dispatch(createCategory(category)),
      fetchAllCategory: () => dispatch(fetchAllCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);