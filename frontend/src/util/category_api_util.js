import axios from "axios";

export const createCategory = (Data) => {
  return axios.post("/api/categories/create", Data);
};

export const fetchAllCategory = (Data) => {
  return axios.get("/api/categories", Data);
};

export const deleteCategory = (catergoryId)=>{
    return axios.delete(
      `/api/categories/delete`, {catergoryId}
    );
}

export const editCategory = (id, name, icon) =>{
  return axios.patch(`/api/categories/update`, {
    id,
    name,
    icon,
  });
}

