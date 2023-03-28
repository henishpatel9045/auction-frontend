const apisauce = require("apisauce")

const BASE_URL = "http://localhost:8000/"
const api = apisauce.create({baseURL: BASE_URL})

export default api
