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

const createService = (data) => {
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
    return res;
  }).catch((error) => {
    return error;
  });
}

const createUser = (data) => {
  return axios.post(API_URL + 'adduser', data, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const deleteUser = (id) => {
  return axios.delete(API_URL + 'user/' + id, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const addBarber = (data) => {
  return axios.post(API_URL + 'barber', data, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const uploadPhotoBarber = (image, id) => {
  return axios.post(API_URL + 'barber/upload/' + id, image, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const getBookingAll = () => {
  return axios.get(API_URL + 'booking', { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const deleteBooking = (id) => {
  return axios.delete(API_URL + 'booking/' + id, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  });
}

const updateBookingStatus = (status, id) => {
  return axios.put(API_URL + 'booking/' + id, status, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  })
}

const updateBarber = (id, body) => {
  return axios.put(API_URL + 'barber/' + id, body, { headers: authHeader() }).then((res) => {
    return res;
  }).catch((error) => {
    return error;
  })
}

export default {
  getUserAll,
  getBarberAll,
  getServiceAll,
  getBarberById,
  createService,
  deleteService,
  putService,
  deleteBarber,
  createUser,
  deleteUser,
  addBarber,
  uploadPhotoBarber,
  getBookingAll,
  deleteBooking,
  updateBookingStatus,
  updateBarber,
};
