import axios from "axios";
import { environment } from "../utils/constant";
import customAxios from "../utils/customAxios";
import setAuthToken from "../utils/setAuthToken";
import FormData from "form-data";


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
    let response = await axios.get(`${environment.BASE_URL_BE}/api/get-product-by-supplierId?pageSize=${data?.pageSize}&pageIndex=${data?.pageIndex}`)
    return response.data
}

export const createNewProductOfSupplierService = async (data) => {
    setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME])

    const keyData = Object.keys(data)
    let formData = new FormData();
    keyData.forEach(item => {
        if (item === 'image') {
            data.image.forEach(img => {
                formData.append('image', img)
            })
        } else if (item === 'arrType') {
            // const jsonString = JSON.stringify(data.arrType);
            // const blob = new Blob([jsonString], { type: 'application/json' });
            // formData.append('arrType', JSON.stringify(blob))
            const stringJson = JSON.stringify(data.arrType)
            formData.append('arrType', stringJson)
        }
        formData.append(item, data[item])
    })

    console.log("ddddd", formData.get("arrType"), typeof formData.get("arrType"))
    console.log("keyData", keyData)
    console.log("newew", data.arrType)

    const response = await axios.post(`${environment.BASE_URL_BE}/api/create-product-by-supplier`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const updateProductOfSupplierService = async (data) => {
    // setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME])
    // const formData = new FormData();

    // // formData.append()
    // // let response = await axios.put(`${environment.BASE_URL_BE}/api/update-product-by-supplier`, data, {
    // //     headers: {
    // //         'Content-Type': 'multipart/form-data', // Đặt kiểu dữ liệu là form-data
    // //     }
    // // })
    // return response.data
}

export const deleteProductOfSupplierService = async (data) => {
    setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME])
    let response = await axios.delete(`${environment.BASE_URL_BE}/api/delete-product-by-supplier?productId=${data.productId}`)
    return response.data
}