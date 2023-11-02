import axios from "axios";
import { environment } from "../utils/constant";
import customAxios from "../utils/customAxios";
import setAuthToken from "../utils/setAuthToken";
import FormData from "form-data";

export const handleLoginService = async (data) => {
  let response = await axios.post(`${environment.BASE_URL_BE}/api/login`, data);
  return response.data;
};

export const loginWithTokenService = async () => {
  let response = await axios.post(`${environment.BASE_URL_BE}/api/login-token`);
  return response.data;
};

export const getListProductOfSupplierService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.get(
    `${environment.BASE_URL_BE}/api/get-product-by-supplierId?pageSize=${data?.pageSize}&pageIndex=${data?.pageIndex}`
  );
  return response.data;
};

export const createNewProductOfSupplierService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);

  const keyData = Object.keys(data);
  let formData = new FormData();
  keyData.forEach((item) => {
    if (item === "image") {
      data.image.forEach((img) => {
        formData.append("image", img);
      });
    } else if (item === "arrType") {
      const stringJson = JSON.stringify(data.arrType);
      formData.append("arrType", stringJson);
    } else {
      formData.append(item, data[item]);
    }
  });

  const response = await axios.post(
    `${environment.BASE_URL_BE}/api/create-product-by-supplier`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateProductOfSupplierService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);

  const keyData = Object.keys(data);
  let formData = new FormData();
  keyData.forEach((item) => {
    if (item === "newImage") {
      data.newImage.forEach((img) => {
        formData.append("newImage", img);
      });
    } else if (item === "arrType") {
      const stringJson = JSON.stringify(data.arrType);
      formData.append("arrType", stringJson);
    } else if (item === "oldImage") {
      data.oldImage.forEach((img) => {
        formData.append("oldImage[]", img);
      });
    } else if (item === "image") {
      data.image.forEach((img) => {
        formData.append("image[]", img);
      });
    } else {
      formData.append(item, data[item]);
    }
  });

  console.log("ddddd", formData.get("arrType"), typeof formData.get("arrType"));
  console.log("keyData", keyData);
  console.log("newew", data.arrType);

  let response = await axios.put(
    `${environment.BASE_URL_BE}/api/update-product-by-supplier?productId=${data.productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteProductOfSupplierService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let productImageStringQuery = ''
  if (data.imageProduct?.length > 0) {
    data.imageProduct.forEach(item => {
      productImageStringQuery = productImageStringQuery + '&imageProduct=' + item
    })
  }
  let response = await axios.delete(
    `${environment.BASE_URL_BE}/api/delete-product-by-supplier?productId=${data.productId}${productImageStringQuery}`);
  return response.data;
};


export const getTransactionByStatusIdService = async (statusId) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.get(`${environment.BASE_URL_BE}/api/get-product-on-transaction?statusId=${statusId}`);
  return response.data;
};


export const confirmTransactionSuccessService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.put(`${environment.BASE_URL_BE}/api/confirm-transaction-success`, data);
  return response.data;
};

export const getListHistoriesBySupplierService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.get(`${environment.BASE_URL_BE}/api/get-history-by-supplier?timeType=${data.timeType}&start=${data.start}&end=${data.end}`);
  return response.data;
};

export const getAllUserByAdminService = async (roleId) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.get(`${environment.BASE_URL_BE}/api/get-all-users-by-admin?roleId=${roleId}`);
  return response.data;
};

export const updateRoleUserByAdminService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.post(`${environment.BASE_URL_BE}/api/update-role-user-by-admin`, data);
  return response.data;
};


export const deleteUserByAdminService = async (userId) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.delete(`${environment.BASE_URL_BE}/api/delete-user-by-admin?userId=${userId}`);
  return response.data;
};


export const createNewUserByAdminService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.post(`${environment.BASE_URL_BE}/api/create-new-user-by-admin`, data);
  return response.data;
};

export const getListNotifyService = async () => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.get(`${environment.BASE_URL_BE}/api/get-list-notify-by-user`);
  return response.data;
};


export const deleteNotifyByIdService = async (notifyId) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.delete(`${environment.BASE_URL_BE}/api/delete-notify-by-notifyId?notifyId=${notifyId}`);
  return response.data;
};

export const addNewVoucherBySupplierService = async (data) => {
  setAuthToken(localStorage[environment.REACT_APP_LOCAL_STORE_TOKEN_NAME]);
  let response = await axios.post(`${environment.BASE_URL_BE}/api/add-new-voucher-for-product-by-supplier`, data);
  return response.data;
};

