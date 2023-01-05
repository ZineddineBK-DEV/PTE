import axios from "axios";
const API_URL_VEHICLES = "/api/material/vehicle/";
// get all vehicles
const getVehicles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_VEHICLES + "getVehicles", config);

  return response.data;
};

//Add vehicle
export const AddVehicle = async (data, token) => {
  const response = await axios.post(API_URL_VEHICLES + "addVehicle", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Delete Vehicle
export const deleteVehicle = async (id, token) => {
  const response = await axios({
    method: "delete",
    url: API_URL_VEHICLES + "deleteVehicle/" + id,
    headers: { Authorization: "Bearer " + token },
  });

  return response.data;
};

//Search a Vehicle
export const findVehicles = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { text: data },
  };
  const response = await axios.get(`${API_URL_VEHICLES}search`, config);

  return response.data;
};

/** Events Managment */
/***********************************/
/***********************************/
/** get vehicle events  */
const getVehicleEvents = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { start: data.start, end: data.end, vehicle: data.vehicle },
  };
  const response = await axios.get(`${API_URL_VEHICLES}events`, config);

  return response.data;
};

/**Set vehicle event */
const setVehicleEvent = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL_VEHICLES + "setevent",
    data,
    config
  );

  return response.data;
};

/*Delete vehicle Event*/
const deleteEvent = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL_VEHICLES + "deleteEvent/" + id,
    config
  );

  return response.data;
};
/*accept vehicle Event*/
const acceptEvent = async (token, id) => {
  const response = await axios.patch(
    `${API_URL_VEHICLES}acceptEvent/${id}`,
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
  getVehicles,
  deleteVehicle,
  AddVehicle,
  findVehicles,
  getVehicleEvents,
  setVehicleEvent,
  deleteEvent,
  acceptEvent,
};
export default matResService;
