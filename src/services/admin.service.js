import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

const getUserAll = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getBarberAll = () => {
  return axios.get(API_URL + "barber", { headers: authHeader() });
};

const getServiceAll = () => {
  return axios.get(API_URL + "service", { headers: authHeader() });
};

const getBarberById = (id) => {
  return axios.get(API_URL + "barber/" + id, { headers: authHeader() });
};

export default { getUserAll, getBarberAll, getServiceAll, getBarberById };
