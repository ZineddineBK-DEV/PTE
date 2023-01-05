import { useEffect, useState } from "react";
import { Header, Modal } from "../components";
import { setShowHeaders } from "../features/global";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getRooms,
  deleteRoom,
  addRoom,
  findRooms,
  reset,
} from "../features/material-resources/rooms/roomSlice";
import { motion, AnimatePresence } from "framer-motion";
import { BiSearchAlt } from "react-icons/bi";
import { TiWarningOutline } from "react-icons/ti";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Rooms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rooms, isError, isSuccess, message } = useSelector(
    (state) => state.room
  );
  const { user } = useSelector((state) => state.auth);

  const [deleteRoomModalOpen, setDeleteRoomModalOpen] = useState(false);
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [RoomToDelete, setRoomToDelete] = useState(null);
  useEffect(() => {
    dispatch(getRooms());
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
  const onSelectRoomToDelete = (r) => {
    setRoomToDelete(r);
    setDeleteRoomModalOpen(true);
  };

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) {
      dispatch(getRooms());
    } else {
      dispatch(findRooms(value));
    }
  }

  const DeleteRoomForm = () => {
    return (
      <div className="w-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <TiWarningOutline className="text-6xl mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Conference Room?
              <br />
              Label :{"     "} {RoomToDelete.label}
              <br />
              Location :{"     "} {RoomToDelete.location}
            </h3>

            <button
              onClick={() => {
                dispatch(deleteRoom(RoomToDelete._id));
                setDeleteRoomModalOpen(false);
                dispatch(getRooms());
                navigate("/rooms");
              }}
              label="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setDeleteRoomModalOpen(false)}
              label="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddRoomForm = () => {
    const [label, setlabel] = useState("");
    const [location, setLocation] = useState("");
    const onSubmit = (e) => {
      e.preventDefault();
      const body = { label, location };
      dispatch(addRoom(body));
      dispatch(getRooms());
      setAddRoomModalOpen(false);
    };
    return (
      <div className="py-6 px-6 lg:px-8 w-full bg-white">
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Conference Room
        </h3>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              label
            </label>
            <input
              onChange={(e) => setlabel(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Location
            </label>
            <input
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              required
            />
          </div>
          <button
            label="submit"
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
    <div className="p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Conference Room" />
      <div className="grid grid-cols-4 divide-x">
        <div className=" overflow-auto" style={{ maxHeight: "735px" }}>
          {/* begin Rooms block */}
          <div className="grid grid-cols-1 divide-y px-1">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray ">
                <BiSearchAlt />
              </span>
              <input
                onKeyDown={handleKeyDown}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm outline-0"
                placeholder="Location || Label"
                label="text"
                name="search"
              />
            </label>
            {user.roles.includes("admin") && (
              <button
                onClick={() => setAddRoomModalOpen(true)}
                className=" rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Add Conference Room</span>
              </button>
            )}

            {rooms.length > 0 ? (
              rooms.map((r) => (
                <NavLink
                  to={"/rooms/events/" + r._id}
                  key={r._id}
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
                          Label : {r.label}
                        </strong>

                        <div>
                          <span className="text-slate-900 text-sm font-medium dark:text-slate-400 capitalize">
                            Location : {r.location}
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
                            onClick={() => onSelectRoomToDelete(r)}
                          >
                            <MdOutlineDelete className="text-black" />
                          </motion.span>
                        </Tippy>
                      </div>
                       ) : null}

                    </div>
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="py-3 px-2 bg-gray-200 rounded-lg h-full">
                No data to display
              </div>
            )}
          </div>
          {/* end Rooms block */}
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
        {deleteRoomModalOpen && (
          <Modal
            modalOpen={deleteRoomModalOpen}
            handleClose={() => setDeleteRoomModalOpen(false)}
            Form={DeleteRoomForm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {addRoomModalOpen && (
          <Modal
            modalOpen={addRoomModalOpen}
            handleClose={() => setAddRoomModalOpen(false)}
            Form={AddRoomForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rooms;
