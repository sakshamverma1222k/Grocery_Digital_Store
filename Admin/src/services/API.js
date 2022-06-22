import Axios from "axios";
import { BASE_URL_catalog, BASE_URL_user, BASE_URL } from "./constants";
// import { AsyncStorage } from 'react';

const qs = require("qs");

const axiosUser = Axios.create({
  baseURL: BASE_URL_user,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status == 200;
  },
});

const axiosCatlog = Axios.create({
  baseURL: BASE_URL_catalog,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status == 200;
  },
});

axiosCatlog.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
        axiosUser.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    console.log("API ERR:", error.message);
    return Promise.reject(error);
  }
);

axiosCatlog.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERR:", error);
    return Promise.reject(error);
  }
);

axiosUser.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
        axiosUser.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    console.log("API ERR:", error.message);
    return Promise.reject(error);
  }
);

axiosUser.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERR:", error);
    return Promise.reject(error);
  }
);

// user, adminSeller API

interface user {
  mobile: string;
  password: string;
}

interface adminSeller {
  username: string;
  password: string;
}

export const loginSeller = async (data: adminSeller) => {
  try {
    console.log(data);
    return await axiosUser.post("/admin/sellerLogin", data);
  } catch (err) {
    return err;
  }
};

export const loginUser = async (data: user) => {
  console.log(data);
  const headers = {
    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    Authorization: "Basic YXZpczpjI2Vla3U=",
  };
  return await axiosUser.post("/users/login", qs.stringify(data), {
    headers: headers,
  });
};

export const logout = async (data: user) => {
  try {
    return await axiosUser.post("/users/login", data);
  } catch (err) {
    return err;
  }
};

export const saveAddressApi = async (data: user, token: any) => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  return await axiosUser.post("/api/address", data, { headers: headers });
};

export const getAddressApi = async (data: user, token: any) => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  return await axiosUser.get("/api/address/" + data, { headers: headers });
};

export const orderApi = async (data: any, token: any) => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  return await axiosUser.post("/api/order", data, { headers: headers });
};

export const getOrderApi = async () => {
  return await axiosUser.get("/api/orders");
};

export const updateOrderStatusApi = async (data) => {
  return await axiosUser.put("/api/orders/" + data.id, data);
};

export const register = async (data: user) => {
  return await axiosUser.post("/users", data);
};

export const seller = async (data: seller) => {
  return await axiosUser.get("/admin/seller", data);
};

export const sellerSave = async (data) => {
  // console.log(data);
  return await axiosUser.post("/admin/addSeller", data);
};

export const updateUser = async (data: user) => {
  return await axiosUser.put("/users/" + data.mobile, data);
};

export const gatAllUser = async (r) => {
  return await axiosUser.get("/users");
};

export const getSellers = async (r) => {
  return await axiosUser.get("/admin/seller");
};

export const verifyOtpApi = async (data: user) => {
  return await axiosUser.post("users/otp", data);
};

export const category = async () => {
  try {
    return await axiosCatlog.get("/category");
  } catch (err) {
    return err;
  }
};

export const categorySave = async (data) => {
  try {
    return await axiosCatlog.post("/category", data);
  } catch (err) {
    return err;
  }
};

export const categoryDelete = async (data) => {
  try {
    return await axiosCatlog.delete("/category/" + data);
  } catch (err) {
    return err;
  }
};

export const getVerifyCategory = async (data) => {
  return await axiosCatlog.get("/category/" + data);
};

export const catalog = async () => {
  try {
    return await axiosCatlog.get("/catalog");
  } catch (err) {
    return err;
  }
};

export const catalogSave = async (data) => {
  console.log(data);
  return await axiosCatlog.post("/catalog", data);
};

export const catalogDelete = async (data) => {
  try {
    return await axiosCatlog.delete("/catalog/" + data);
  } catch (err) {
    return err;
  }
};

// export const catalogViewBeforeUpdate = async (data) => {
//     try {
//         return await axiosCatlog.get('/viewUCatalog/' + data)
//     } catch (err) {
//         return err
//     }
// }

export const catalogList = async (categoryName: any) => {
  console.log("Calling with category " + categoryName);
  try {
    return await axiosCatlog.get("/catalog/" + categoryName);
  } catch (err) {
    return err;
  }
};

export const customRequest = async (options, type) => {
  const data = new FormData();
  data.append("mypic", options.file);
  data.set("userName", "Fred");
  const config = {
    headers: {
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s",
    },
  };
  return await axiosUser.post(options.action, data, config);
};

export const getStat = async (data) => {
  return await axiosUser.get("/api/dashboard");
};

export const getUserStat = async (data) => {
  return await axiosUser.get("/api/dashboard/user");
};
