const { default: axiosInstance } = require("./axiosInstance");


const createOrder =(data)=> axiosInstance.post('/orders',data)

export default {
    createOrder,
}