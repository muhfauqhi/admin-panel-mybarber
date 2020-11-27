import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const login = (credentials) => {
  return axios
    .post(API_URL + "login", credentials)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error.response;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const forgotPassword = (data) => {
  return axios
    .put(API_URL + "forgotpassword", data)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      const data = error.response.data;
      return data;
    });
};

const resetPassword = (password, token) => {
  return axios
    .put(API_URL + "resetpassword", {
      password,
      token,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      const data = error.response.data;
      return data;
    });
};

const checkUser = (token) => {
  return axios
    .get(API_URL + "dashboard", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      const data = response.data.data;
      if (data.role !== "Admin") {
        return "Unauthorized";
      } else {
        return data;
      }
    })
    .catch((error) => {
      return error;
    });
};

export default {
  login,
  logout,
  forgotPassword,
  resetPassword,
  checkUser,
};
