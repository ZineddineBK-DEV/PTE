import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { checkPassword } from "../features/auth/authSlice";
import {
  setaccountSettingsModal,
  setPasswordCheckModal,
} from "../features/global";
const PasswordCheckForm = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);

  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const onCheckPassword = (e) => {
    e.preventDefault();
    if (passwordInput.trim().length === 0) {
      setError("You Have to enter your password");
    } else {
      dispatch(checkPassword({ id: user.id, password: passwordInput })).then(
        (res) => {
          if (res.payload === "Request failed with status code 500") {
            setError("Wrong Password");
          } else {
            dispatch(setPasswordCheckModal(false));
            dispatch(setaccountSettingsModal(true));
          }
        }
      );
    }
  };
  return (
    <div className="py-6 px-6 lg:px-8 w-full bg-white">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Please Enter Your Password
      </h3>

      <label className="relative block">
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:ring-1  outline-0 text-xl"
          type={passwordType}
          onChange={handlePasswordChange}
          value={passwordInput}
          name="password"
        />

        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-2xl ">
          <button
            onClick={togglePassword}
            className="border-none text-2xl outline-0 text-gray"
          >
            {passwordType === "password" ? <BiHide /> : <BiShowAlt />}
          </button>
        </span>
      </label>
      {error && (
        <p className="p-2 font-semibold text-sm text-red-900 ">* {error}</p>
      )}

      <button
        onClick={onCheckPassword}
        className="w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative">Check</span>
      </button>
    </div>
  );
};

export default PasswordCheckForm;
