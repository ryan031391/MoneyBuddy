import axios from "axios";
export const purchasePoint = ({ icon, point }) => {
  return axios.patch(`/api/users/update`, { icon, point });
};
