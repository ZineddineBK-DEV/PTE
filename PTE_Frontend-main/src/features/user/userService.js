import axios from "axios";

const API_URL = "/api/users/";
const API_CV_URL = "/api/cv/";




export const AddUser = async (data, token) => {
  const response = await axios.post(API_URL + "addUser", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getall", config);

  return response.data;
};
const getAllExternal = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "getallExternal", config);

  return response.data;
};
//delete user
const deleteUserById = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "delete/" + id, config);

  return response.data;
};


// confirm sign up request
export const confirmSignUp = async (id, token) => {
  const response = await axios({
    method: "post",
    url: API_URL + "confirm-signup/" + id,
    headers: { Authorization: "Bearer " + token },
  });

  return response.data;
};
export const codeVerification = async (body) => {
  const response = await axios.post(
    `${API_URL}validateCode`,
    { ...body },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}forgotPassword`,
    { email: email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const changePswd = async (userData) => {
  const response = await axios.patch(
    `${API_URL}change-psw/${userData.id}`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
export const changePswdAutorisation = async (id) => {
  const response = await axios.post(`${API_URL}changePswdAutorisation/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// get user by ID
export const getUserById = async (id, token) => {
  const response = await axios({
    method: "get",
    url: API_URL + id,
    headers: { Authorization: "Bearer " + token },
  });

  return response.data;
};
// update user by ID
export const updateUserById = async (id, userData, token) => {
  const response = await axios.patch(`${API_URL}update/${id}`, userData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const updateUserRoles = async (id, roles, token) => {
  const response = await axios.patch(`${API_URL}update-roles/${id}`, roles, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
// update cv
export const updateCv = async (id_cv, data, token) => {
  const response = await axios.patch(`${API_CV_URL}update/${id_cv}`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// delete item from cv
export const deleteItemFromCv = async (id_cv, data, token) => {
  const response = await axios.patch(
    `${API_CV_URL}delete-item/${id_cv}`,
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// filterUsers
export const filterUsers = async (body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "filter", body, config);

  return response.data;
};

export const searchUsers = async (body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "search", body, config);

  return response.data;
};
export const getSignupRequests = async (body, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "search",
    { ...body, isEnabled: "false" },
    config
  );

  return response.data;
};
const userService = {
  AddUser,
  getAllUsers,
  getAllExternal,
  deleteUserById,
  confirmSignUp,
  getSignupRequests,
  getUserById,
  updateUserById,
  updateCv,
  deleteItemFromCv,
  filterUsers,
  searchUsers,
  forgotPassword,
  codeVerification,
  changePswd,
  changePswdAutorisation,
  updateUserRoles,
};

export default userService;
