import axios from "axios";

const API_CV_URL = "/api/cv/";
// filterUsers
export const filterCvs = async (body, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_CV_URL + "filter", body, config);
  
    return response.data;
  };
  
  export const searchCvs = async (body, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_CV_URL + "search", body, config);
  
    return response.data;
  };

  const cvsService = {
    
    filterCvs,
    searchCvs,
    
  };
  export default cvsService;
