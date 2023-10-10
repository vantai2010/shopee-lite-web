import axios from "axios";
import { environment } from "../utils/constant";
import customAxios from "../utils/customAxios";
import setAuthToken from "../utils/setAuthToken";



export const handleLoginService = async (data) => {
    let response = await axios.post(`${environment.BASE_URL_BE}/api/login`, data)
    return response.data
}

export const loginWithTokenService = async () => {
    let response = await axios.post(`${environment.BASE_URL_BE}/api/login-token`)
    return response.data
}

export const getListProductOfSupplierService = async (data) => {
    setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME])
    let response = await axios.get(`${environment.BASE_URL_BE}/api/get-product-by-supplierId?pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`)
    return response.data
}

export const createNewProductOfSupplierService = async (data) => {
    setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME])
    let response = await axios.post(`${environment.BASE_URL_BE}/api/create-product-by-supplier`, data)

    return response.data
}

export const updateProductOfSupplierService = async (data) => {
    setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME])
    let response = await axios.put(`${environment.BASE_URL_BE}/api/update-product-by-supplier`, data)
    return response.data
}

export const deleteProductOfSupplierService = async (data) => {
    setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME])
    let response = await axios.delete(`${environment.BASE_URL_BE}/api/delete-product-by-supplier?productId=${data.productId}`)
    return response.data
}