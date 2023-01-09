import { useEffect, useState } from "react";
import { Header, Modal } from "../components";
import { setShowHeaders } from "../features/global";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getVehicles,
  deleteVehicle,
  addVehicle,
  findVehicles,
  reset,
} from "../features/material-resources/vehicles/vehicleSlice";
import { motion, AnimatePresence } from "framer-motion";
import { BiSearchAlt } from "react-icons/bi";
import { TiWarningOutline } from "react-icons/ti";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Vehicles = () => {

  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehicles, isError, isSuccess, message } = useSelector(
    (state) => state.vehicle
  );
  const { user } = useSelector((state) => state.auth);

  const [deleteVehicleModalOpen, setDeleteVehicleModalOpen] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  useEffect(() => {
    dispatch(getVehicles());
    dispatch(setShowHeaders(true));
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);
  const onSelectVehicleToDelete = (car) => {
    setVehicleToDelete(car);
    setDeleteVehicleModalOpen(true);
  }; 
  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) {
      dispatch(getVehicles());
    } else {
      dispatch(findVehicles(value));
    }

    //e.target.value = "";
  }

  const DeleteVehicleForm = () => {
    return (
      <div className="w-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <TiWarningOutline className="text-6xl mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this vehicle?
              <br />
              model :{"     "} {vehicleToDelete.model}
              <br />
              ID :{"     "} {vehicleToDelete.registration_number}
              <br/>
              type :{"     "} {vehicleToDelete.type}
            </h3>

            <button
              onClick={() => {
                dispatch(deleteVehicle(vehicleToDelete._id));
                setDeleteVehicleModalOpen(false);
                dispatch(getVehicles());
                navigate("/vehicles");
              }}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setDeleteVehicleModalOpen(false)}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddVehicleForm = () => {
    const [model, setModel] = useState("");
    const [registration_number, setRegistrationNumber] = useState("");
    const [type, setType] = useState("");

    const onSubmit = (e) => {
      e.preventDefault();
      const body = {model,registration_number,type };
      dispatch(addVehicle(body));
      dispatch(getVehicles());
      setAddVehicleModalOpen(false);
    };
    return (
      <div className="py-6 px-6 lg:px-8 w-full bg-white">
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Add vehicle
        </h3>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Model
            </label>
            <input
              onChange={(e) => setModel(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Registration number (ID)
            </label>
            <input
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div
                      className="flex py-3 border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15, paddingTop: 15 }}
                    >
                      <span className="px-3">Type</span>
                    </div>
                    <div className="flex">
                      <div className="flex  mr-4">
                        <input
                          type="radio"
                          value="Commercial"
                          name="type"
                          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => setType(e.target.value)}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Commercial
                        </label>
                      </div>
                      <div className="flex ml-4 " style={{ paddingBottom: 15 }}>
                        <input
                          type="radio"
                          value="Utility"
                          name="type"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => setType(e.target.value)}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Utility
                        </label>
                      </div>
                    </div>
          <button
            type="submit"
            className="w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add</span>
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className=" p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Vehicles" />
      <div className="grid grid-cols-4 divide-x">
        <div className=" overflow-auto" style={{ maxHeight: "735px" }}>
          {/* begin vehicles block */}
          <div className="grid grid-cols-1 divide-y px-1">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray ">
                <BiSearchAlt />
              </span>
              <input
                onKeyDown={handleKeyDown}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm outline-0"
                placeholder="Type || ID"
                type="text"
                name="search"
              />
            </label>

            {user.roles.includes("admin") && (
              <button
                onClick={() => setAddVehicleModalOpen(true)}
                className=" rounded px-5 py-2.5 w-auto overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-700 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Add vehicle</span>
              </button>
            )}

            {vehicles.length > 0 ? (
              vehicles.map((car) => (
                <NavLink
                  to={"/vehicles/events/" + car._id}
                  key={car._id}
                  className={({ isActive }) =>
                    isActive
                      ? "py-3 px-2 mt-1 bg-[#04267b] text-white rounded-lg"
                      : "py-3 px-2 mt-1 bg-gray-200 rounded-lg hover:bg-[#e0ebeb]"
                  }
                >
                  <div className="item">
                    <div className="relative w-full mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl  items-center grid grid-cols-5 dark:bg-slate-800 dark:highlight-white/5 ingeneer">
                      <div className="py-2 pl-2 col-span-4">
                        <strong className="text-slate-900 text-sm font-medium dark:text-slate-200 capitalize">
                          Model : {car.model}
                        </strong>

                        <div>
                          <span className="text-slate-900 text-sm font-medium dark:text-slate-400 capitalize">
                            ID : {car.registration_number}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-900 text-sm font-medium dark:text-slate-400 capitalize">
                            Type : {car.type}
                          </span>
                        </div>
                      </div>
                      {user.roles.includes("admin") ? (
                      <div className="float-right ">
                        <Tippy content="Delete vehicle">
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="deleteCvItem"
                            onClick={() => onSelectVehicleToDelete(car)}
                          >
                            <MdOutlineDelete className="text-black" />
                          </motion.span>
                        </Tippy>
                      </div>
                       ) : null}
                    </div>
                    {/* <span className="text-sm font-black">Type :</span>
                    <span className="text-sm capitalize"> {car.type}</span>

                    <br />
                    <span className="text-sm font-black"> ID :</span>
                    <span className="text-sm"> {car.registration_number}</span>
                    <div className="float-right">
                      <Tippy content="Delete vehicle">
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="deleteCvItem"
                          onClick={() => onSelectVehicleToDelete(car)}
                        >
                          <MdOutlineDelete className="text-black" />
                        </motion.span>
                      </Tippy>
                    </div> */}
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="py-3 px-2 bg-gray-200 rounded-lg h-full">
                No data to display
              </div>
            )}
          </div>
          {/* end vehicles block */}
        </div>

        <div className=" col-span-3 rounded-lg relative z-0">
          {/* Begin Calender Block*/}

          <Outlet />

          {/* End Calender Block*/}
        </div>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {deleteVehicleModalOpen && (
          <Modal
            modalOpen={deleteVehicleModalOpen}
            handleClose={() => setDeleteVehicleModalOpen(false)}
            Form={DeleteVehicleForm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {addVehicleModalOpen && (
          <Modal
            modalOpen={addVehicleModalOpen}
            handleClose={() => setAddVehicleModalOpen(false)}
            Form={AddVehicleForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vehicles;
