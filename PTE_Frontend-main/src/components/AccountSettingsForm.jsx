import React, { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { setaccountSettingsModal } from "../features/global";
const AccountSettingsForm = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [newpasswordType, setnewPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [newpasswordInput, setnewPasswordInput] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [error, seterror] = useState(null);

  const dispatch = useDispatch();
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const toggleNewPassword = (e) => {
    e.preventDefault();
    if (newpasswordType === "password") {
      setnewPasswordType("text");
      return;
    }
    setnewPasswordType("password");
  };
  const onConfirmChanges = () => {
    if (passwordInput.trim().length === 0) {
      seterror("You have to enter a new Password ");
    } else if (passwordInput !== newpasswordInput) {
      seterror("Passwords do not match");
    } else {
      dispatch(updateUser({ body: { password: passwordInput }, _id: user.id }));

      dispatch(setaccountSettingsModal(false));
    }
  };
  return (
    <div className="py-6 px-6 lg:px-8 w-full bg-white">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Security Settings
      </h3>
      <div className="space-y-6">
        <div>
          <label>New Password</label>
          <label className="relative block">
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:ring-1  outline-0 text-xl"
              type={passwordType}
              onChange={(e) => setPasswordInput(e.target.value)}
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
        </div>
        <div>
          <label>Confirm Password</label>
          <label className="relative block">
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:ring-1  outline-0 text-xl"
              type={newpasswordType}
              onChange={(e) => setnewPasswordInput(e.target.value)}
              value={newpasswordInput}
            />

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-2xl ">
              <button
                onClick={toggleNewPassword}
                className="border-none text-2xl outline-0 text-gray"
              >
                {newpasswordType === "password" ? <BiHide /> : <BiShowAlt />}
              </button>
            </span>
          </label>
        </div>
        {error && (
          <p className="p-2 font-semibold text-sm text-red-900 ">* {error}</p>
        )}

        <button
          onClick={onConfirmChanges}
          className="w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Confirm changes</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
