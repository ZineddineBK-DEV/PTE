import { NavLink } from "react-router-dom";
import { MdOutlineAssessment, MdOutlineMeetingRoom } from "react-icons/md";
import { BiCar } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { GiOrganigram } from "react-icons/gi";
import { FiUserPlus,FiUserCheck } from "react-icons/fi";



import { setActiveMenu } from "../features/global";

import { useSelector, useDispatch } from "react-redux";
import logo from "../data/logo.png";
const Sidebar = () => {
  const { activeMenu, screenSize, showHeaders } = useSelector(
    (state) => state.global
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      dispatch(setActiveMenu(false));
    }
  };

  const activeLink =
    "w-full relative flex flex-row items-center h-11 focus:outline-none bg-gray-50 text-gray-600 text-gray-800 border-l-4  border-[#041e62] pr-6";
  const normalLink =
    "w-full relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-[#041e62] pr-6 ";

  return showHeaders && user ? (
    <div
      className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10
     "
    >
      {activeMenu && (
        <>
          <div
            className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r
           text-2xl"
          >
              <div >
                <img
                  src={logo}
                  alt="logo"
                  className="object-scale-down  justify-center"
                  style={{width:"75%",height:"75%" , margin:"auto"}}
                />
              </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Menu
                    </div>
                  </div>
                </li>
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Dashboard
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/organigramme"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                    <GiOrganigram></GiOrganigram>

                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                    Organigram
                    </span>
                  </NavLink>
                </li>

                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Users Managment
                    </div>
                  </div>
                </li>
                {user.roles.includes("admin") ? (
                  <li>
                    <NavLink
                      to="/registerRequests"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <FiUserCheck className="text-2xl" />
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Register requests
                      </span>
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <NavLink
                    to="/employees"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Employees List
                    </span>
                  </NavLink>
                </li>
                 {user.roles.includes("admin") ? (
                  <li>
                      <NavLink
                        to="/sousTraitant"
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                        <FiUserPlus></FiUserPlus>
    
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                        External
                        </span>
                      </NavLink>
                  </li>
                   ) : null}

                  {user.roles.includes("admin") ? (
                  <li>
                      <NavLink
                        to="/ActionPlan"
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                        <FaTasks></FaTasks>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                        Action plan
                        </span>
                      </NavLink>
                  </li>
                   ) : null}
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Reservations
                    </div>
                  </div>
                </li>
                <li>
                  <NavLink
                    to="/vehicles"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <BiCar className="text-2xl text-gray-500" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Vehicles
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/rooms"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <MdOutlineMeetingRoom className="text-2xl text-gray-500" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                    Conference Rooms
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/techteam"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <RiTeamLine className="text-2xl text-gray-500" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Technical Team
                    </span>
                  </NavLink>
                  <li>
                  <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <MdOutlineAssessment className="text-2xl text-gray-500" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                    Project Managment
                    </span>
                  </NavLink>
                </li>
                </li>
              </ul>
            </div>
          </div>
          </>
      )}
    </div>
  ) : (
    <div className="w-0 dark:bg-secondary-dark-bg"></div>
  );
};

export default Sidebar;
