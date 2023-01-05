import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post("/api/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
const checkPassword = async (userData,token) => {
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL + "checkpass", userData, config);
  
    return response.data;
  
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  checkPassword
};

export default authService;
