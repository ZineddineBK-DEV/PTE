import axios from "axios";
const API_URL = "/api/users/";


const getUserPlans = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { ...data },
  };
  const response = await axios.get(`${API_URL}Plans`, config);

  return response.data;
};

const uploadPlan = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL+"upload/", data,config);
  // `${API_URL}upload/${id}`
  return response.data;
};

export const getPlanById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL+"getPlanById/"+id.user,config);

  console.log(response.data);

  return response.data;
};

export const filterPlans = async (body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "filter", body, config);

  return response.data;
};

const deletePlan = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "deletePlan/" + id, config);

  return response.data;
};



const userPlansService = {
  getUserPlans,
  filterPlans,
  uploadPlan,
  deletePlan,
  getPlanById
};
export default userPlansService;
