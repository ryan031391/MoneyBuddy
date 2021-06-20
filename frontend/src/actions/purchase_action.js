import * as APIicons from '../util/purchase_api_util'
export const PURCHASE_ICONS = "PURCHASE_ICONS";
export const PURCHASE_ICON_ERROR = "PURCHASE_ICON_ERROR";
export const UPDATE_POINT = "UPDATE_POINT"

export const purchaseIcons = (icon) => ({
  type: PURCHASE_ICONS,
  icon,
});

export const receivePurchaseIconError = (error) => ({
  type: PURCHASE_ICON_ERROR,
  error
});

export const updatePoints =(point)=>({
  type: UPDATE_POINT,
  point
})


const POINT_PER_ICON = 5
export const purchasePoint = (icon) => (dispatch) =>
  APIicons.purchasePoint({ icon, point: POINT_PER_ICON }).then(
    () => dispatch(purchaseIcons({ icon, point: POINT_PER_ICON })),
    (err) => dispatch(receivePurchaseIconError({ error: "purchase fails" }))
  );

 

