import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      const data = response.data;
      const token = data.token;
      if (data.role !== "Admin") throw new Error("Unauthorized");
      localStorage.setItem("token", token);
      return data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const forgotPassword = () => {
  return axios.put(API_URL + "forgotpassword", { email }).then((response) => {
    const data = response.data;
    return data;
  });
};

const resetPassword = () => {
  return axios
    .put(API_URL + "resetpassword", {
      password,
      token,
    })
    .then((response) => {
      const data = response.data;
      return data;
    });
};

export default {
  login,
  logout,
  forgotPassword,
  resetPassword,
};
