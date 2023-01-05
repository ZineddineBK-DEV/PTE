import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { changePswdAutorisation, changePswd } from "../features/user/userSlice";
import { BiHide, BiShowAlt } from "react-icons/bi";

import { Spinner } from "../components";
import { toast } from "react-toastify";

import logo from "../data/logo.png";
import cx from "classnames";
import authStyle from "../authentication.module.css";
const ChangePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isError, message, isLoading } = useSelector((state) => state.user);
  const [passwordType, setPasswordType] = useState("password");
  const [newpasswordType, setnewPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [newpasswordInput, setnewPasswordInput] = useState("");

  const [error, seterror] = useState(null);
  useEffect(() => {
    dispatch(changePswdAutorisation(id)).then((res) => {
      if (res.error) {
        navigate("/login", { replace: true });
      }
    });
  }, [id, dispatch, navigate]);
  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  });
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);
  if (isLoading) {
    return <Spinner />;
  }
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
      dispatch(
        changePswd({
          password: passwordInput,
          id: id,
          email: location.state.email,
        })
      ).then((res) => {
        if (!res.error) {
          toast.success("Your Password has been upated succefully");
          setTimeout(navigate("/login", { replace: true }), 2000);
        }
      });
    }
  };

  return (
    <>
    <div className="w-full h-full flex fixed flex-col code_screen">
      
      <div className="w-full fixed mt--1 flex flex-col justify-center">
       <img
         src={logo}
         alt="LOGO"
         className="h-28 w-28 m-auto"
         style={{ height: "25%" , width:"15%"}}
         
       />
       
     </div>        
     <section className={cx(authStyle["ftco-section"])}>
          <div className={cx(authStyle["_container"])}>
            <div
              className={cx(
                authStyle["row"],
                authStyle["justify-content-center"]
              )}
            >
                 <div className="m-auto py-20  w-full h-full fixed justify-center " >
                <div className="w-full max-w-md m-auto bg-white rounded-lg border shadow py-4 px-8">
                 
                <p
          className=" text-xl font-semibold text-center font-serif "
          style={{ color: "#03AEEF" }}
        >
        Change Password 
        </p><br></br>
                  <div className={cx(authStyle["login-form"])}>
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className={cx(
                          authStyle["icon"],
                          authStyle["d-flex"],
                          authStyle["align-items-center"],
                          authStyle["justify-content-center"]
                        )}
                      >
                        <button
                          onClick={togglePassword}
                          className="border-none text-2xl outline-0 text-gray"
                        >
                          {passwordType === "password" ? (
                            <BiHide />
                          ) : (
                            <BiShowAlt />
                          )}
                        </button>
                      </div>
                      <input
                        type={passwordType}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        value={passwordInput}
                        placeholder="Password"
                        className={cx(authStyle["form-control"])}
                        required
                      />
                    </div>
                    {/* confirm psw */}
                    <div className={cx(authStyle["login-form"])}>
                      <div className={cx(authStyle["form-group"])}>
                        <div
                          className={cx(
                            authStyle["icon"],
                            authStyle["d-flex"],
                            authStyle["align-items-center"],
                            authStyle["justify-content-center"]
                          )}
                        >
                          <button
                            onClick={toggleNewPassword}
                            className="border-none text-2xl outline-0 text-gray"
                          >
                            {newpasswordType === "password" ? (
                              <BiHide />
                            ) : (
                              <BiShowAlt />
                            )}
                          </button>
                        </div>
                        <input
                          placeholder="Confirm Password"
                          type={newpasswordType}
                          onChange={(e) => setnewPasswordInput(e.target.value)}
                          value={newpasswordInput}
                          className={cx(authStyle["form-control"])}
                          required
                        />
                      </div>
                      {error && (
                        <p
                          className={cx(authStyle["error"])}
                          style={{ color: "#7f1d1d" }}
                        >
                          * {error}
                        </p>
                      )}

                      <div className={cx(authStyle["form-group"])}>
                        <button
                          onClick={onConfirmChanges}
                          className={cx(
                            authStyle["btn"],
                            authStyle["form-control"],
                            authStyle["btn-primary"],
                            authStyle["rounded"],

                            authStyle["px-3"]
                          )}
                        >
                          Change password
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={cx(
                      authStyle["w-100"],
                      authStyle["text-center"],
                      authStyle["md-4"],
                      authStyle["text"]
                    )}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChangePassword;
