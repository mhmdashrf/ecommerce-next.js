const { default: axiosInstance } = require("./axiosInstance");



const addToCart = (payload)=>axiosInstance.post('/carts',payload);
const getUserCartItems = (email)=>axiosInstance.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`);
const deleteCartItem = (id)=>axiosInstance.delete(`/carts/${id}`) ;

export default {
    addToCart,
    getUserCartItems,
    deleteCartItem
}