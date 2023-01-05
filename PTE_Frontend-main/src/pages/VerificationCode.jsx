import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { codeVerif } from "../features/user/userSlice";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";
import logo from "../data/logo.png";
import cx from "classnames";
import authStyle from "../authentication.module.css";
const VerificationCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [code, setCode] = useState(null);
  const { isError, message, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    if (!location.state) {
      navigate(-1);
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
  const onSubmit = () => {
    if (code.trim().length === 0) {
      toast.error("Please enter your verification code");
    } else {
      dispatch(codeVerif({ email: location.state.email, code: code })).then(
        (res) => {
          if (!res.error) {
            navigate(
              "/change-psw/" + res.payload.id,

              {
                state: { email: location.state.email },
              }
            );
          }
        }
      );
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
                    Please Enter your verification code
        </p><br></br>
                 
                  <p className={cx(authStyle["text-center"])}>
                    A verification code has been sent to your email
                  </p>
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
                        <MdVerified />
                      </div>
                      <input
                        type="text"
                        name="code"
                        placeholder="Enter your verification code"
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        className={cx(authStyle["form-control"])}
                        required
                      />
                    </div>

                    <div className={cx(authStyle["form-group"])}>
                      <button
                        onClick={onSubmit}
                        className={cx(
                          authStyle["btn"],
                          authStyle["form-control"],
                          authStyle["btn-primary"],
                          authStyle["rounded"],
                          authStyle["px-3"]
                        )}
                      >
                        Verify code
                      </button>
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

export default VerificationCode;
