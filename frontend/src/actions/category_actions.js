import * as APICategory from '../util/category_api_util';
export const RECEIVE_ALL_CATEGORY = "RECEIVE_ALL_CATEGORY";
export const RECEIVE_CATEGORY = "RECEIVE_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const RECEIVE_CATEGORY_ERRORS = "RECEIVE_CATEGORY_ERRORS";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const receiveAllCategory  = (categories) => ({
  type: RECEIVE_ALL_CATEGORY,
  categories,
});

export const receiveCategory = (category)=>({
    type: RECEIVE_CATEGORY,
    category
});

export const removeCategory = (categoryId) =>({
    type: REMOVE_CATEGORY,
    categoryId,
});

export const updateCategory = (category)=>({
  type: UPDATE_CATEGORY,
  category 
});

export const receiveCategoryErrors = (error)=>({
    type: RECEIVE_CATEGORY_ERRORS,
    error,
})

export const editCategory = (category) => (dispatch) =>
  APICategory.editCategory(category).then(
    (respnose) =>
      dispatch(
        updateCategory({
          categoryId: respnose.data.category_Id,
          name: respnose.data.category.name,
          icon: respnose.data.category.icon,
        })
      ),
    (err) => dispatch(receiveCategoryErrors(err.response.data))
  );

export const createCategory = (category) => (dispatch) =>
  APICategory.createCategory(category).then(
    (response) => dispatch(receiveCategory(response.data)),
    (err) => dispatch(receiveCategoryErrors(err.response.data))
  );

export const fetchAllCategory = () => (dispatch) =>
  APICategory.fetchAllCategory().then(
    (response) => dispatch(receiveAllCategory(response.data)),
    (err) => dispatch(receiveCategoryErrors(err.response.data))
  );

export const deleteCategory = (categoryId) => (dispatch) =>
  APICategory.deleteCategory(categoryId).then(
    () => dispatch(removeCategory(categoryId)),
    (err) => dispatch(receiveCategoryErrors(err.response.data))
  );







