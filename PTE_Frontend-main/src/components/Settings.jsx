import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Button } from ".";
import {
  handleUserSettingsClick,
  setPasswordCheckModal,
} from "../features/global";
import { FcApproval } from "react-icons/fc";
import { RiUserLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { logout } from "../features/auth/authSlice";

const Settings = () => {
  const navigate = useNavigate();
  const { isClickedUserSettings } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isClickedUserSettings &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        dispatch(handleUserSettingsClick(false));
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isClickedUserSettings, dispatch]);

  return (
    <div
      className="nav-item absolute right-1 top-14 pb-4 pl-2 pr-2 bg-white dark:bg-[#42464D] rounded-lg w-96 font-light tracking-wide"
      ref={ref}
    >
      <div className="grid grid-cols-5  border-color border-b-1 pb-6">
        <div className="col-span-4 ">
          <div className="flex gap-5 items-center mt-6 ">
            <img
              className="rounded-lg h-20 w-20 shadow-lg"
              src={"http://localhost:3000/images/" + user.image}
              alt="user-profile"
            />
            <div>
              <p className="font-semibold text-xl dark:text-gray-200 capitalize">
                {user.userName}
              </p>
              {user.roles.map((role) => (
                <div
                  key={role}
                  className="flex px-2  border-gray-200 text-sm leading-5 text-black-500 capitalize"
                >
                  <FcApproval className="mt-1 text-lg" />
                  <span className="px-1 mt-1 text-sm font-medium">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200"></p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
      </div>

      <div>
        <div className="flex gap-5 cursor-pointer  w-full relative  flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-[#041e62] pr-6  ">
          <div className=" text-xl   p-1   text-gray-600 ">
            <RiUserLine />
          </div>

          <div
            onClick={() => {
              navigate("/user-details", {
                state: { id: user.id },
              });
              dispatch(handleUserSettingsClick(false));
            }}
          >
            <p className="text-base font-light tracking-wide text-gray-500 pt-1">
              My Profile
            </p>
          </div>
        </div>
        {/* *** */}
        <div className="flex gap-5 cursor-pointer  w-full relative  flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-[#041e62] pr-6  ">
          <div className=" text-xl   p-1   text-gray-600 ">
            <FiSettings />
          </div>

          <div
            onClick={() => {
              dispatch(setPasswordCheckModal(true));
              dispatch(handleUserSettingsClick(false));
            }}
          >
            <p className="text-base font-light tracking-wide text-gray-500 pt-1">
              Security Settings
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={() => dispatch(logout())}
          className=" w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-700 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
