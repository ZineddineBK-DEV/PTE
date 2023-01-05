import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCarAlt, FaTransgender } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { BsCalendarWeekFill } from "react-icons/bs";

import {
  MdAlternateEmail,
  MdPassword,
  MdOutlinePhone,
  MdEmojiFlags,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { RiSuitcaseLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { Spinner } from "../components";
import logo from "../data/logo.png";
import authStyle from "../authentication.module.css";
import cx from "classnames";
import Select from "react-select";
import {
  nationalities,
  fSituations,
  departments,
  countries,
} from "../data/dummy";
function Register() {
  const initialState = {
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    nationality: "",
    familySituation: "",
    DateOfBirth: "",
    address: "",
    drivingLicense: false,
    department: "",
    hiringDate: "",
    gender: "male",
    experience: 0,
  };
  const [formData, setFormData] = useState({
    ...initialState,
  });
  const [src, setSrc] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(
        "Register request added succefully \n\nWaiting for admin confirmation"
      );
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSelectNationality = (option) => {
    setFormData((prevState) => ({
      ...prevState,
      nationality: option.value,
    }));
  };
  const onSelectCountry = (option) => {
    setFormData((prevState) => ({
      ...prevState,
      address: option.value,
    }));
  };
  const onSelectFSituation = (option) => {
    setFormData((prevState) => ({
      ...prevState,
      familySituation: option.value,
    }));
  };

  const onSelectDepartment = (option) => {
    setFormData((prevState) => ({
      ...prevState,
      department: option.value,
    }));
  };

  const onFileUpload = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
    } else if (
      formData.department === "" ||
      formData.nationality === "" ||
      formData.image === "" ||
      formData.DateOfBirth === "" ||
      formData.gender === "" ||
      formData.familySituation === ""
    ) {
      toast.error(" Required fields not filled");
    } else {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      dispatch(register(data));
      setFormData({ ...initialState });
      setSrc(null);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return user ? null : (
    <>
       <div className="w-full h-full flex  flex-col signup_screen">
       <div className="w-full fixed mt--1 flex flex-col justify-center">
        <img
          src={logo}
          alt="LOGO"
          className="h-28 w-28 m-auto"
          style={{ height: "25%" , width:"15%"}}
          
        />
        
      </div>




        <section className={cx(authStyle["ftco-section"])}>
          <div className={authStyle["container"]}>
            <div
              className={cx(
                authStyle["row"],
                authStyle["justify-content-center"]
              )}
            >
             <div className="m-auto py-20  w-full h-full  justify-center " >
                <div className="w-full max-w-md m-auto bg-white rounded-lg border shadow py-4 px-8">
                 
              <p
          className=" text-xl font-semibold text-center font-serif "
          style={{ color: "#03AEEF" }}
        >
          Sign Up
        </p><br></br>
                  <p className={cx(authStyle["text-center"])}>
                    Sign up by entering the informations below
                  </p>
                  <form
                    onSubmit={onSubmit}
                    className={cx(authStyle["login-form"])}
                    encType="multipart/form-data"
                  >
                    {/* Image */}
                    <div className="grid grid-cols-2 gap-2 py-3">
                      <div>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={onFileUpload}
                          accept="image/png, image/jpeg"
                        />
                      </div>
                      <div>
                        {src ? (
                          <img
                            className="rounded-lg shadow-lg"
                            alt="user"
                            src={src}
                            id="userImage"
                          />
                        ) : null}
                      </div>
                    </div>
                    {/* Fullname */}
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className={cx(
                          authStyle["icon"],
                          authStyle["d-flex"],
                          authStyle["align-items-center"],
                          authStyle["justify-content-center"]
                        )}
                      >
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        className={cx(authStyle["form-control"])}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        placeholder="Fullname"
                        onChange={onChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className={cx(
                          authStyle["icon"],
                          authStyle["d-flex"],
                          authStyle["align-items-center"],
                          authStyle["justify-content-center"]
                        )}
                      >
                        <MdAlternateEmail />
                      </div>
                      <input
                        type="email"
                        className={cx(authStyle["form-control"])}
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={onChange}
                        required
                      />
                    </div>
                    {/* Phone */}
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className={cx(
                          authStyle["icon"],
                          authStyle["d-flex"],
                          authStyle["align-items-center"],
                          authStyle["justify-content-center"]
                        )}
                      >
                        <MdOutlinePhone />
                      </div>
                      <input
                        type="text"
                        className={cx(authStyle["form-control"])}
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        placeholder="Phone Number"
                        onChange={onChange}
                        required
                      />
                    </div>
                    {/* Gender */}
                    <hr />
                    <div
                      className="flex py-3 border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15, paddingTop: 15 }}
                    >
                      <FaTransgender className={cx(authStyle["icon"])} />
                      <span className="px-3">Gender</span>
                    </div>
                    <div className="flex">
                      <div className="flex  mr-4">
                        <input
                          type="radio"
                          value="female"
                          name="gender"
                          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={formData.gender === "female"}
                          onChange={onChange}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Female
                        </label>
                      </div>
                      <div className="flex ml-4 " style={{ paddingBottom: 15 }}>
                        <input
                          type="radio"
                          value="male"
                          name="gender"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={formData.gender === "male"}
                          onChange={onChange}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Male
                        </label>
                      </div>
                    </div>
                    <hr />
                    {/* Nationality */}
                    <div
                      className="flex  py-3  border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15 }}
                    >
                      <MdEmojiFlags style={{ fontSize: 20 }} />
                      <span className="px-3">Nationality</span>
                    </div>
                    <Select
                      options={nationalities}
                      onChange={onSelectNationality}
                    />
                    {/* Address */}
                    <div
                      className="flex  py-3  border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15 }}
                    >
                      <GrLocation style={{ fontSize: 18 }} />
                      <span className="px-3 ">Address</span>
                    </div>
                    <Select options={countries} onChange={onSelectCountry} />
                    {/* Family situation */}
                    <div
                      className="flex  py-3  border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15, paddingTop: 21 }}
                    >
                      <FaUser style={{ fontSize: 18 }} />
                      <span className="px-3 ">Family Situation</span>
                    </div>
                    <Select
                      options={fSituations}
                      onChange={onSelectFSituation}
                    />
                    {/* Date Of Birth */}
                    <div
                      className="flex  border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15, paddingTop: 18 }}
                    >
                      <BsCalendarWeekFill
                        style={{ fontSize: 16, paddingTop: 1 }}
                      />
                      <span className="px-3">Date of birth</span>
                    </div>
                    <div>
                      <input
                        type="date"
                        name="DateOfBirth"
                        className={cx(authStyle["form-control"])}
                        placeholder="yyyy-MM-dd"
                        onChange={onChange}
                      />
                    </div>

                    {/* Department */}
                    <div
                      className="flex  py-3  border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15 }}
                    >
                      <RiSuitcaseLine style={{ fontSize: 18 }} />
                      <span className="px-3 ">Department</span>
                    </div>
                    <Select
                      options={departments}
                      onChange={onSelectDepartment}
                    />

                    <br />
                    {/* Experience */}
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className={cx(
                          authStyle["icon"],
                          authStyle["d-flex"],
                          authStyle["align-items-center"],
                          authStyle["justify-content-center"]
                        )}
                      >
                        <MdOutlineWorkOutline />
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="40"
                        className={cx(authStyle["form-control"])}
                        id="experience"
                        name="experience"
                        placeholder="Years of experience"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <br />
                    {/* Hiring Date */}
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className="flex  border-gray-200 text-sm leading-5 text-black-500 "
                        style={{ fontSize: 16 }}
                      >
                        <BsCalendarWeekFill
                          style={{ fontSize: 14, paddingTop: 1 }}
                        />
                        <span className="px-3">Hiring Date</span>
                      </div>

                      <input
                        type="date"
                        className={cx(authStyle["form-control"])}
                        name="hiringDate"
                        placeholder="dd-mm-yyyy"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <br />
                    <hr />

                    {/* Driving License */}
                    <div
                      className="flex py-3 border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15 }}
                    >
                      <FaCarAlt className={cx(authStyle["icon"])} />
                      <span className="px-3">Driving Licence</span>
                    </div>
                    <div className="flex" onChange={onChange}>
                      <div className="flex  mr-4">
                        <input
                          type="radio"
                          value="true"
                          name="drivingLicense"
                          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Yes
                        </label>
                      </div>
                      <div className="flex ml-4">
                        <input
                          type="radio"
                          value="false"
                          name="drivingLicense"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          No
                        </label>
                      </div>
                    </div>
                    <hr />
                    {/* Password */}
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className={cx(
                          authStyle["icon"],
                          authStyle["d-flex"],
                          authStyle["align-items-center"],
                          authStyle["justify-content-center"]
                        )}
                      >
                        <MdPassword />
                      </div>
                      <input
                        type="password"
                        className={cx(authStyle["form-control"])}
                        id="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={onChange}
                      />
                    </div>
                    {/* Confim Password */}
                    <div className={cx(authStyle["form-group"])}>
                      <div
                        className={cx(
                          authStyle["icon"],
                          authStyle["d-flex"],
                          authStyle["align-items-center"],
                          authStyle["justify-content-center"]
                        )}
                      >
                        <MdPassword />
                      </div>
                      <input
                        type="password"
                        className={cx(authStyle["form-control"])}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={onChange}
                      />
                    </div>
                    <div className={cx(authStyle["form-group"])}>
                      <button
                        type="submit"
                        className={cx(
                          authStyle["form-control"],
                          authStyle["btn"],
                          authStyle["btn-primary"],
                          authStyle["rounded"],
                          authStyle["submit"],
                          authStyle["px-3"]
                        )}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                  <div
                    className={cx(
                      authStyle["w-100"],
                      authStyle["text-center"],
                      authStyle["mt-4"],
                      authStyle["text"]
                    )}
                  >
                    <p className={cx(authStyle["mb-0"])}>
                      Already have an account?
                    </p>
                    <Link to="/login" className={authStyle.link}>
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
