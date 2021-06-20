import axios from "axios";

export const getTransactions = () => {
    return axios.get(`api/transactions`)
}

// export const getTransaction = () => {
//     return axios.get("api/transactions")
// }

export const createTransaction = (transData) => {
    return axios.post("/api/transactions/create", transData);
};

export const removeTransaction = (id) => {
    return axios.delete("/api/transactions/delete", id);
};

export const updateTransaction = (data)=>{
    return axios.patch("/api/transactions/update", data)

}