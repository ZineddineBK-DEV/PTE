import axios from "axios";
const API_URL_ROOMS = "/api/material/room/";
// get all rooms
const getRooms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_ROOMS + "getRooms", config);

  return response.data;
};

//Add a room
export const AddRoom = async (data, token) => {
  const response = await axios.post(API_URL_ROOMS + "add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Delete room
export const deleteRoom = async (id, token) => {
  const response = await axios({
    method: "delete",
    url: API_URL_ROOMS + "delete/" + id,
    headers: { Authorization: "Bearer " + token },
  });

  return response.data;
};

//Search rooms
export const findRooms = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { text: data },
  };
  const response = await axios.get(`${API_URL_ROOMS}search`, config);

  return response.data;
};

/** Events Managment */
/***********************************/
/***********************************/
/** get room events  */
const getRoomEvents = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { start: data.start, end: data.end, room: data.room },
  };
  const response = await axios.get(`${API_URL_ROOMS}events`, config);

  return response.data;
};

/**Set room event */
const setRoomEvent = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL_ROOMS + "setevent", data, config);

  return response.data;
};

/*Delete room Event*/
const deleteEvent = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL_ROOMS + "deleteEvent/" + id,
    config
  );

  return response.data;
};
/*accept room Event*/
const acceptEvent = async (token, id) => {
  const response = await axios.patch(
    `${API_URL_ROOMS}acceptEvent/${id}`,
    { isAccepted: true },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data;
};

const matResService = {
  getRooms,
  AddRoom,
  deleteRoom,
  findRooms,
  getRoomEvents,
  setRoomEvent,
  deleteEvent,
  acceptEvent,
};
export default matResService;
