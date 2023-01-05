import axios from "axios";
const API_URL = "/api/users/";

const getUserEvents = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { ...data },
  };
  const response = await axios.get(`${API_URL}events`, config);

  return response.data;
};

const setUserEvent = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "setevent", data, config);

  return response.data;
};

const deleteEvent = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "deleteEvent/" + id, config);

  return response.data;
};

const acceptEvent = async (token, id) => {
  const response = await axios.patch(
    `${API_URL}acceptEvent/${id}`,
    { isAccepted: true },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};

const userEventsService = {
  getUserEvents,
  setUserEvent,
  deleteEvent,
  acceptEvent,
};
export default userEventsService;
