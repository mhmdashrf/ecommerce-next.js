const { default: axiosInstance } = require("./axiosInstance");

const getLatestProduct = ()=>axiosInstance.get('/products?populate=*')
const getProductId= (id)=>axiosInstance.get(`/products/${id}?populate=*`)
const getProductByCategory= (category)=>axiosInstance.get(`/products?filters[category][$eq]=${category}&populate=*`)

export default {
    getLatestProduct,
    getProductId,
    getProductByCategory
}