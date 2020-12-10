import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/';

const getUserAll = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
};

const getBarberAll = () => {
  return axios.get(API_URL + 'barber', { headers: authHeader() });
};

const getServiceAll = () => {
  return axios.get(API_URL + 'service', { headers: authHeader() });
};

const getBarberById = (id) => {
  return axios.get(API_URL + 'barber/' + id, { headers: authHeader() });
};

const deleteService = (id) => {
  return axios.delete(API_URL + 'service/' + id, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const postService = (data) => {
  return axios.post(API_URL + 'service', data, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const putService = (id, serviceId) => {
  return axios.put(API_URL + 'barber/addservice/' + id, serviceId, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const deleteBarber = (id) => {
  return axios.delete(API_URL + 'barber/' + id, { headers: authHeader() }).then((res) => {
    return res
  }).catch((error) => {
    return error;
  });
}

export default { getUserAll, getBarberAll, getServiceAll, getBarberById, postService, deleteService, putService, deleteBarber };
