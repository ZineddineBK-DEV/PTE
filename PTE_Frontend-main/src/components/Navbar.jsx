import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { BsFillChatDotsFill } from "react-icons/bs";
import {
  setScreenSize,
  setActiveMenu,
  handleNotificationsClick,
  handleUserSettingsClick,
} from "../features/global";

import { Settings } from ".";

const NavButton = ({ customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const {
    activeMenu,
    isClickedUserSettings,
    screenSize,
  } = useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(setActiveMenu(false));
    } else {
      dispatch(setActiveMenu(true));
    }
  }, [screenSize, dispatch]);

  const handleActiveMenu = () => dispatch(setActiveMenu(!activeMenu));

  return user ? (
    <div className=" justify-center">
      <div style={{ width: "80%" }} className=" flex flex-row justify-between z-10 pr-5 py-1 fixed bg-white shadow">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={"#041e62"}
          icon={<AiOutlineMenu />}
        />
        <div className={"flex"}>
          <NavButton 
            title="Chat"
            color={"#919191"}
            icon={< BsFillChatDotsFill />}
          />
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => {
              dispatch(handleUserSettingsClick(!isClickedUserSettings));
              dispatch(handleNotificationsClick(false));
            }}
          >
            <img
              className="rounded-full w-8 h-8"
              src={"http://localhost:3000/images/" + user.image}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400  ml-1 text-14 capitalize">
                {user.userName}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
          {isClickedUserSettings && <Settings />}
        </div>
      </div>
    </div>
  ) : null;
};
export default Navbar;
