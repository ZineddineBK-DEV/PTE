import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { setShowHeaders } from "../features/global";
import { forgotPassword } from "../features/user/userSlice";
import { Spinner } from "../components";
import logo from "../data/logo.png";
import cx from "classnames";
import authStyle from "../authentication.module.css";
import { HiOutlineMail } from "react-icons/hi";
import { FiLock } from "react-icons/fi";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData; 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    } else {
      dispatch(setShowHeaders(false));
    }
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const onForgotPassword = () => {
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid Email");
    } else {
      dispatch(forgotPassword(email)).then((res) => {
        if (!res.error) {
          navigate("/verification-code", {
            state: { email: email },
          });
        } else {
          toast.error("Invalid Email");
        }
      });
    }
  };

  return user ? null : (



    <div className="w-full h-full flex fixed flex-col login_screen">

      <div className="w-full fixed mt--1 flex flex-col justify-center">
        <img
          src={logo}
          alt="LOGO"
          className="h-28 w-28 m-auto p-2"
          style={{ height: "25%", width: "15%" }}

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
            <div className="m-auto py-20  w-full h-full justify-center " >
              <div className="w-full max-w-md m-auto bg-white rounded-lg border shadow py-4 px-8">

                <p
                  className=" text-xl font-semibold text-center font-serif "
                  style={{ color: "#03AEEF" }}
                >
                  Account Login
                </p><br></br>
                <p className={cx(authStyle["text-center"])}>
                  Sign in by entering the informations below
                </p>
                <form
                  onSubmit={onSubmit}
                  className={cx(authStyle["login-form"])}
                >
                  <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiOutlineMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@example.com"
                      onChange={onChange}
                    />
                  </div>
                  <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiLock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="********"
                      onChange={onChange}
                    />
                  </div>
                  <div
                    className={cx(
                      authStyle["form-group"],
                      authStyle["d-md-flex"]
                    )}
                  >
                    <div
                      className={cx(
                        authStyle["w-100"],
                        authStyle["text-md-right"]
                      )}
                    >
                      <span
                        onClick={onForgotPassword}
                        to="#"
                        className={authStyle.link}
                      >
                        Forgot Password
                      </span>
                    </div>
                  </div>
                  <div className={cx(authStyle["form-group"])}>
                    <button
                      type="submit"
                      className={cx(
                        authStyle["btn"],
                        authStyle["form-control"],
                        authStyle["btn-primary"],
                        authStyle["rounded"],

                        authStyle["px-3"]
                      )}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div
                  className={cx(
                    authStyle["w-100"],
                    authStyle["text-center"],
                    authStyle["md-4"],
                    authStyle["text"]
                  )}
                >
                  <p className={cx(authStyle["mb-0"])}>
                    Don't have an account?
                  </p>
                  <Link to="/register" className="link">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

  );
}

export default Login;
