import React, { useEffect, useState, useRef } from "react";
import {useReactToPrint} from 'react-to-print';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setShowHeaders } from "../features/global";
import { motion, AnimatePresence } from "framer-motion";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Select from "react-select";


import {
  updateCv,
  getUserById,
  updateUser,
  deleteItemFromCv,
} from "../features/user/userSlice";
import { Modal } from "../components";
import cover from "../data/cover.jpg";

import { FiEdit3 } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import { HiOutlineCalendar } from "react-icons/hi";
import { RiSuitcaseLine } from "react-icons/ri";
import { FcGraduationCap } from "react-icons/fc";
import { GrCertificate } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
import {
  nationalities,
  fSituations,
  departments,
  gender,
  countries,
} from "../data/dummy";




const UserDetails = () => {
  const [InfoModalOpen, setInfoModalOpen] = useState(false);
  const [ExperienceModalOpen, setExperienceModalOpen] = useState(false);
  const [EducationModalOpen, setEducationModalOpen] = useState(false);
  const [ProjectsModalOpen, setProjectsModalOpen] = useState(false);
  const [CertifModalOpen, setCertifModalOpen] = useState(false);
  const [SkillsModalOpen, setSkillsModalOpen] = useState(false);
  const [ImageModalOpen, setImageModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { userProfile } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.auth);
  const age = useRef(0);
  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#041e62] focus:border-[#041e62] block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize";
  useEffect(() => {
    
    if (!location.state) {
      navigate(-1);
    } else {
      dispatch(getUserById(location.state.id));
    }
    dispatch(setShowHeaders(true));
  }, []);
  useEffect(() => {
    age.current = userProfile
      ? new Date().getFullYear() -
        new Date(userProfile.DateOfBirth).getFullYear()
      : "undefined";
  });

  function OnDeleteItem(item, id) {
    const data = { id_cv: id, body: item };
    dispatch(deleteItemFromCv(data));
    dispatch(getUserById(userProfile._id));
  }

  /*********Informations Form********* */
  const InformationsForm = () => {
    const initialState = {
      DateOfBirth: new Date(userProfile.DateOfBirth).toISOString().slice(0, 10),
      nationality: userProfile.nationality,
      address: userProfile.address,
      familySituation: userProfile.familySituation,
      department: userProfile.department,
      drivingLicense: userProfile.drivingLicense,
      gender: userProfile.gender,
      experience: userProfile.experience,
      fullName: userProfile.fullName,
    };
    const [InfoForm, setInfoForm] = useState({ ...initialState });
    const onSubmit = (e) => {
      e.preventDefault();

      const data = { _id: userProfile._id, body: InfoForm };
      dispatch(updateUser(data));
      setInfoModalOpen(false);
    };
    const onChange = (e) => {
      setInfoForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const onSelectNationality = (option) => {
      setInfoForm((prevState) => ({
        ...prevState,
        nationality: option.value,
      }));
    };
    const onSelectFSituation = (option) => {
      setInfoForm((prevState) => ({
        ...prevState,
        familySituation: option.value,
      }));
    };
    const onSelectGender = (option) => {
      setInfoForm((prevState) => ({
        ...prevState,
        gender: option.value,
      }));
    };
    const onSelectDepartment = (option) => {
      setInfoForm((prevState) => ({
        ...prevState,
        department: option.value,
      }));
    };
    const onSelectDrivingLicence = (option) => {
      setInfoForm((prevState) => ({
        ...prevState,
        drivingLicense: option.value,
      }));
    };
    const onSelectCountry = (option) => {
      setInfoForm((prevState) => ({
        ...prevState,
        address: option.value,
      }));
    };

    return (
      <>
           <form
          onSubmit={onSubmit}
          className="bg-white p-10 rounded-sm  min-w-full font-medium"
        >
          <h1 className="text-center text-2xl mb-6 text-gray-600  font-sans">
            Informations
          </h1>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Fullname
            </label>
            <input
              type="text"
              name="fullName"
              defaultValue={InfoForm.fullName}
              onChange={(e) => onChange(e)}
              className={inputClassName}
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Department
            </label>
            <Select
              options={departments}
              defaultValue={departments.filter(
                (option) => option.value === InfoForm.department
              )}
              onChange={onSelectDepartment}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Experience
            </label>
            <input
              type="number"
              name="experience"
              min="0"
              max="40"
              defaultValue={InfoForm.experience}
              onChange={onChange}
              className={inputClassName}
            />
          </div>
          <br />
          <hr />
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Address
            </label>
            <Select
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              defaultValue={countries.filter(
                (option) => option.value === InfoForm.address
              )}
              options={countries}
              onChange={onSelectCountry}
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Nationality
            </label>
            <Select
              defaultValue={nationalities.filter(
                (option) => option.value === InfoForm.nationality
              )}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              options={nationalities}
              onChange={onSelectNationality}
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Date of Birth
            </label>
            <input
              className={inputClassName}
              type="date"
              name="DateOfBirth"
              defaultValue={InfoForm.DateOfBirth}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Gender
            </label>
            <Select
              options={gender}
              defaultValue={gender.filter(
                (option) => option.value === InfoForm.gender
              )}
              onChange={onSelectGender}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Family situation
            </label>
            <Select
              options={fSituations}
              defaultValue={fSituations.filter(
                (option) => option.value === InfoForm.familySituation
              )}
              onChange={onSelectFSituation}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <br />
          <hr />
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Driving Licence
            </label>
            <Select
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
              defaultValue={
                InfoForm.drivingLicense === true
                  ? { value: true, label: "Yes" }
                  : { value: false, label: "No" }
              }
              onChange={onSelectDrivingLicence}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Confirm</span>
          </button>
        </form>
      </>

      
    );
  };
  /******* */
  /**Experience Form */
  const ExperienceForm = () => {
    const endWorkYearElement = useRef();
    const startWorkYearElement = useRef();
    const initialState = {
      organization: "",
      period: "",
      job: "",
      task_description: "",
    };
    const [formData, setFormData] = useState({ ...initialState });
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(
        updateCv({
          id_cv: userProfile.cv._id,
          body: { professionnal_career: [formData] },
        })
      );
      dispatch(getUserById(userProfile._id));
      setExperienceModalOpen(false);
    };
    const onChangeWorkStartYear = (e) => {
      endWorkYearElement.current.disabled = false;
      endWorkYearElement.current.min = parseInt(e.target.value);
      endWorkYearElement.current.value = parseInt(e.target.value) + 1;
      const p = `${startWorkYearElement.current.value} - ${endWorkYearElement.current.value}`;
      setFormData((prevState) => ({
        ...prevState,
        period: p,
      }));
    };
    const onChangeWorkEndYear = (e) => {
      const p = `${startWorkYearElement.current.value} - ${endWorkYearElement.current.value}`;
      setFormData((prevState) => ({
        ...prevState,
        period: p,
      }));
    };
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    return (
      <>
        <form
          onSubmit={onSubmit}
          className="bg-white p-10 rounded-sm  min-w-full "
        >
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-medium font-sans">
            Experience
          </h1>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Organization
            </label>
            <input
              name="organization"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Period
              <span className="text-sm text-slate-300 px-1">(yyyy)</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {" "}
                <input
                  ref={startWorkYearElement}
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
                  placeholder="Start"
                  className={inputClassName}
                  required
                  onChange={onChangeWorkStartYear}
                />
              </div>
              <div>
                <input
                  ref={endWorkYearElement}
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
                  placeholder="End"
                  className={inputClassName}
                  onChange={onChangeWorkEndYear}
                  disabled
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Job
            </label>
            <input
              name="job"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Task description
              <span className="text-sm text-slate-300 px-1">( Max 400 )</span>
            </label>
            <textarea
              name="task_description"
              maxLength="400"
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none resize-y max-h-52"
              placeholder="-"
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add</span>
          </button>
        </form>
      </>
    );
  };
  const EducationForm = () => {
    const initialState = {
      establishment: "",
      section: "",
      diploma: "",
      year: "",
    };
    const [dataForm, setDataForm] = useState({ ...initialState });
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(
        updateCv({
          id_cv: userProfile.cv._id,
          body: { studies: [dataForm] },
        })
      );
      dispatch(getUserById(userProfile._id));
      setEducationModalOpen(false);
    };
    const onChange = (e) => {
      setDataForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <>
        <form
          onSubmit={onSubmit}
          className="bg-white p-10 rounded-sm  min-w-full "
        >
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-medium font-sans">
            Education
          </h1>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Establishment
            </label>
            <input
              name="establishment"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Section
            </label>
            <input
              name="section"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Diploma
            </label>
            <input
              name="diploma"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Year <span className="text-sm text-slate-300 px-1">(yyyy)</span>
            </label>
            <input
              name="year"
              type="number"
              min="1900"
              max="2099"
              step="1"
              placeholder="Year"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add</span>
          </button>
        </form>
      </>
    );
  };
  const ProjectsForm = () => {
    const initialState = {
      organization: "",
      title: "",
      description: "",
    };
    const [formData, setFormData] = useState({ ...initialState });
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(
        updateCv({
          id_cv: userProfile.cv._id,
          body: { projets: [formData] },
        })
      );
      dispatch(getUserById(userProfile._id));
      setProjectsModalOpen(false);
    };
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    return (
      <>
        <form
          onSubmit={onSubmit}
          className="bg-white p-10 rounded-sm min-w-full "
        >
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-medium font-sans">
            Project
          </h1>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Employing organization
            </label>
            <input
              name="organization"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Project title
            </label>
            <input
              name="title"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Description
            </label>
            <textarea
              name="description"
              maxLength="400"
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none capitalize resize-y max-h-52"
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className=" mt-2 w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add</span>
          </button>
        </form>
      </>
    );
  };
  /**Certifications Form */

  const CertifForm = () => {
    const initialState = {
      year: "",
      domaine: "",
    };
    const [formData, setFormData] = useState({ ...initialState });
    const onSubmit = (e) => {
      e.preventDefault();

      dispatch(
        updateCv({
          id_cv: userProfile.cv._id,
          body: { certifications: [formData] },
        })
      );
      dispatch(getUserById(userProfile._id));
      setCertifModalOpen(false);
    };
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    return (
      <>
        <form
          onSubmit={onSubmit}
          className="bg-white p-10 rounded-sm  min-w-full "
        >
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-medium font-sans">
            Certification
          </h1>
          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Domaine
            </label>
            <input
              name="domaine"
              type="text"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-800 font-medium block my-3 text-md">
              Year <span className="text-sm text-slate-300 px-1">(yyyy)</span>
            </label>
            <input
              name="year"
              type="number"
              min="1900"
              max="2099"
              step="1"
              placeholder="Year"
              className={inputClassName}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add</span>
          </button>
        </form>
      </>
    );
  };

  /***Skill Form */
  const SkillsForm = () => {
    const [tags, setTags] = useState([...userProfile.cv.skills]);
    const [error, setError] = useState("");
    const onSubmit = () => {
      dispatch(
        updateCv({
          id_cv: userProfile.cv._id,
          body: {skills: tags },
        })
      );
      dispatch(getUserById(userProfile._id));
      setSkillsModalOpen(false);
    };
    function handleKeyDown(e) {
      setError("");
      if (e.key !== "Enter") return;
      const value = e.target.value;
      if (!value.trim()) return;
      const exists = tags.findIndex((element) => {
        return element.toLowerCase().trim() === value.toLowerCase().trim();
      });

      if (exists > -1) {
        setError(` " ${value} " already exists`);
        e.target.value = "";
        return;
      }
      setTags([...tags, value.trim()]);

      e.target.value = "";
    }
    function removeTag(index) {
      setTags(tags.filter((el, i) => i !== index));
    }
    return (
      <>
        <div className="bg-white p-10 rounded-sm  min-w-full ">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-medium font-sans">
            Skills
          </h1>
          <div className="tags-input-container">
            {tags.length > 0
              ? tags.map((tag, index) => (
                  <div className="skill-tag capitalize" key={index}>
                    {tag}
                    <span
                      className="close"
                      onClick={() => {
                        removeTag(index);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ))
              : null}
            {/* */}
            <input
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Type here..."
              className="tags-input capitalize"
            />
          </div>
          <span className=" text-xs text-gray">Press Enter to add</span>
          <br />

          {error && (
            <span className="capitalize text-xs text-red-800 font-black">
              {error}
            </span>
          )}
          <button
            onClick={onSubmit}
            className="mt-4 w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add</span>
          </button>
        </div>
      </>
    );
  };
  const ImageForm = () => {
    const [src, setSrc] = useState(null);
    const [image, setImage] = useState({ image: "" });

    const onSubmit = (e) => {
      e.preventDefault();

      if (src) {
        const formdata = new FormData();
        Object.keys(image).forEach((key) => {
          formdata.append(key, image[key]);
        });
        const data = { _id: userProfile._id, body: formdata };
        dispatch(updateUser(data));
      }
      setImageModalOpen(false);
    };
    const onFileUpload = (e) =>{
      setSrc(URL.createObjectURL(e.target.files[0]));
      setImage({ image: e.target.files[0] });
    };

    return (
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="bg-white p-10 rounded-sm shadow-lg min-w-full shadow-neutral-600"
      >
        <h1 className="text-center text-2xl mb-6 text-gray-600 font-medium font-sans">
          Profile picture
        </h1>
        {/* Image */}
        <div className="grid grid-cols-2 gap-2 py-3">
          <div>
            <input
              type="file"
              name="image"
              id="image"
              onChange={onFileUpload}
              accept="image/png, image/jpeg"
              className={inputClassName}
            />
          </div>
          <div>
            {src ? (
              <img
                alt="user"
                src={src}
                id="userImage"
                className="shadow-lg rounded-lg"
              />
            ) : null}
          </div>
        </div>
        <button
          onClick={onSubmit}
          className="w-full mt-4 rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Change</span>
        </button>
      </form>
    );
  };

const componentRef =useRef();
const handlePrint= useReactToPrint({
content:()=> componentRef.current,
documentTitle:'Curriculum_Vitae',
});

  return userProfile ? (

    <div className="bg-gray-100 antialiased">
      <main className="main-container">
        <div ref={componentRef} className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5">
            {/* Start left side  */}
            <div className="shadow rounded-xl overflow-hidden">
              {/* Start User Block */}
              <div
                className="h-32 bg-cover"
                style={{ backgroundImage: `url(${cover})` }}
              ></div>
              <div className="pt-14 p-7 bg-white relative">
                {/* <span className="status-badge bg-gray-400">Busy</span> */}
                <div className="relative avatar-container">
                  <motion.img
                    whileHover={{ scale: 1.1, opacity: 0.7 }}
                    alt="avatar"
                    src={`http://localhost:3000/images/${userProfile.image}`}
                    className="user-photo"
                  />
                  {user.roles.includes("admin") ||
                  user.id === userProfile._id ? (
                    <Tippy content="Update image">
                      <motion.button
                        className="update-photo-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          ImageModalOpen
                            ? setImageModalOpen(false)
                            : setImageModalOpen(true)
                        }
                      >
                        <FaCloudUploadAlt />
                      </motion.button>
                    </Tippy>
                  ) : null}
                </div>

                <div className="text-lg font-medium mb-1.5  py-2 capitalize">
                  {userProfile.fullName}
                </div>
                <div className="text-sm text-gray-400 mb-7">
                  {userProfile.title}
                </div>
              </div>
            </div>
            {/* End User Block */}
            <div className="p-7 block-section">
              {/* Start Info Block  */}
              {user.roles.includes("admin") || user.id === userProfile._id ? (
                <Tippy content="Edit">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      InfoModalOpen
                        ? setInfoModalOpen(false)
                        : setInfoModalOpen(true)
                    }
                    className="editbtn text-xl text-[#041e62] hover:bg-gray-200 float-right py-2 px-2 rounded"
                  >
                    <FiEdit3 />
                  </motion.button>
                </Tippy>
              ) : null}

              <h2 className="block-title">Informations</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="text-gray-400">Experience</div>
                  <div className="font-medium text-right text-gray-600">
                    {userProfile.experience} + years
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">Department</div>
                  <div className="font-medium text-right text-gray-600 capitalize">
                    {userProfile.department}
                  </div>
                </div>
                <hr />
                <div className="flex justify-between">
                  <div className="text-gray-400">Location</div>
                  <div className="font-medium text-right text-gray-600 capitalize">
                    {userProfile.address}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">Nationality</div>
                  <div className="font-medium text-right text-gray-600 capitalize">
                    {userProfile.nationality}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">Age</div>
                  <div className="font-medium text-right text-gray-600 capitalize">
                    {age.current}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">Gender</div>
                  <div className="font-medium text-right text-gray-600 capitalize">
                    {userProfile.gender}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">Family Situation</div>
                  <div className="font-medium text-right text-gray-600 capitalize">
                    {userProfile.familySituation}
                  </div>
                </div>
                <hr />
                <div className="flex justify-between">
                  <div className="text-gray-400">Driving Licence</div>
                  <div className="font-medium text-right text-gray-600 capitalize">
                    {userProfile.drivingLicense ? <p>Yes</p> : <p>No</p>}
                  </div>
                </div>
              </div>
            </div>
            {/* End Info Block */}
            <div className="p-7 block-section flow-root">
              {/* Start Skill Block */}
              {user.roles.includes("admin") || user.id === userProfile._id ? (
                <Tippy content="Edit skills">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      SkillsModalOpen
                        ? setSkillsModalOpen(false)
                        : setSkillsModalOpen(true)
                    }
                    className="editbtn text-xl text-[#041e62] hover:bg-gray-200 float-right py-2 px-2 rounded"
                  >
                    <FiEdit3 />
                  </motion.button>
                </Tippy>
              ) : null}

              <h2 className="block-title">Skills</h2>
              <div className="-m-2 flex flex-wrap">
                {userProfile.cv.skills
                  ? userProfile.cv.skills.map((skill, index) => (
                      <span
                        className="skill-tag capitalize"
                        key={`${skill}${index}}`}
                      >
                        {skill}
                      </span>
                    ))
                  : null}
              </div>
            </div>
            {/* End Skill Block */}
          </div>
          {/* End Left Side */}
          <div className="space-y-5 lg:col-span-2">
            {/* Start Right Side  */}

            {/* Start About Me Block  */}
            {/* <div className="p-7 pb-0 block-section">
          <h2 className="block-title">About me</h2>
          <p className="text-gray-600 mb-5">
            Libero quas veritatis nulla distinctio fuga nihil temporibus et.
            Quia dicta sapiente qui porro molestiae nobis incidunt
            voluptatem. Et voluptas sunt nihil. At perferendis voluptatem
            dolores nulla. Adipisci dolore non. Praesentium ipsa magnam ut
            quia explicabo voluptates.
          </p>

          <div className="flex flex-col space-y-4">
            <a href="#0" className="mail-link social-link-hover">
              <MdOutlineAlternateEmail />
              <span>crisabbott@email.com</span>
            </a>

            <ul className="flex space-x-5">
              <li>
                <a href="#0" className="social-link-hover">
                  <ImFacebook2 />
                </a>
              </li>
              <li>
                <a href="#0" className="social-link-hover">
                  
                  <ImTwitter />
                </a>
              </li>
              <li>
                <a href="#0" className="social-link-hover">
                  <ImGithub />
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-200 my-5"></div>

          <ul className="flex space-x-8 font-medium">
            <li>
              <a href="#0" className="menu-link-active menu-link-hover">
                Resume
              </a>
            </li>
            <li>
              <a href="#0" className="menu-link menu-link-hover">
                Products
              </a>
            </li>
            <li>
              <a href="#0" className="menu-link menu-link-hover">
                Blog
              </a>
            </li>
          </ul>
          </div> */}
            {/* End About Me Block  */}

            <div className="p-7 block-section">
              {user.roles.includes("admin") || user.id === userProfile._id ? (
                <Tippy content="Add Experience">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      ExperienceModalOpen
                        ? setExperienceModalOpen(false)
                        : setExperienceModalOpen(true)
                    }
                    className="editbtn text-xl text-[#041e62] hover:bg-gray-200 float-right py-2 px-2 rounded"
                  >
                    <AiOutlineAppstoreAdd />
                  </motion.button>
                </Tippy>
              ) : null}

              {/* Start Experience Block  */}
              <h2 className="block-title">Experience</h2>
              {userProfile.cv.professionnal_career.length === 0 ? null : (
                <>
                  {userProfile.cv.professionnal_career.map((work, index) => (
                    <div
                      className="item mb-5 item-section"
                      key={`${work}${index}`}
                    >
                      <div className="w-full space-y-5">
                        <div className="item-header">
                          <div className="space-y-1.5">
                            <div className="font-medium">{work.job}</div>
                            <div className="flex space-x-5">
                              <div className="item-header-info">
                                <RiSuitcaseLine />
                                <span>{work.organization}</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 sm:text-right">
                            <div className="item-header-info">
                              <HiOutlineCalendar />
                              <span>{work.period}</span>
                              {user.roles.includes("admin") ||
                              user.id === userProfile._id ? (
                                <Tippy content="Delete Item">
                                  <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="deleteCvItem"
                                    onClick={() =>
                                      OnDeleteItem(
                                        {
                                          professionnal_career: {
                                            _id: work._id,
                                          },
                                        },
                                        userProfile.cv._id
                                      )
                                    }
                                  >
                                    <MdOutlineDelete />
                                  </motion.span>
                                </Tippy>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm">
                          {work.task_description}
                        </p>
                        <div className="border-b border-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {/* End Experience Block  */}

            {/* Start Education Block  */}
            <div className="p-7 block-section">
              {user.roles.includes("admin") || user.id === userProfile._id ? (
                <Tippy content="Add Education">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      EducationModalOpen
                        ? setEducationModalOpen(false)
                        : setEducationModalOpen(true)
                    }
                    className="editbtn text-xl text-[#041e62] hover:bg-gray-200 float-right py-2 px-2 rounded"
                  >
                    <AiOutlineAppstoreAdd />
                  </motion.button>
                </Tippy>
              ) : null}

              <h2 className="block-title">Education</h2>
              {userProfile.cv.studies.length > 0 ? (
                <>
                  {userProfile.cv.studies.map((std, index) => (
                    <div
                      className="item mb-5 item-section"
                      key={`${std}${index}`}
                    >
                      <div className=" w-full space-y-5">
                        <div className="item-header items-end">
                          <div className="space-y-1.5">
                            {std.diploma}

                            <div className="flex space-x-5">
                              <div className="item-header-info">
                                <FcGraduationCap />
                                <span>{std.establishment}</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1.5 sm:text-right">
                            <div className="item-header-info">
                              <HiOutlineCalendar />
                              <span>{std.year}</span>
                            </div>
                            {user.roles.includes("admin") ||
                            user.id === userProfile._id ? (
                              <Tippy content="Delete Item">
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="deleteCvItem"
                                  onClick={() =>
                                    OnDeleteItem(
                                      {
                                        studies: {
                                          _id: std._id,
                                        },
                                      },
                                      userProfile.cv._id
                                    )
                                  }
                                >
                                  <MdOutlineDelete />
                                </motion.span>
                              </Tippy>
                            ) : null}
                          </div>
                        </div>
                        <div className="border-b border-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
            {/* End Education Block */}
            {/* Start Projects Block  */}
            <div className="p-7 block-section">
              {user.roles.includes("admin") || user.id === userProfile._id ? (
                <Tippy content="Add Project">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      ProjectsModalOpen
                        ? setProjectsModalOpen(false)
                        : setProjectsModalOpen(true)
                    }
                    className="editbtn text-xl text-[#041e62] hover:bg-gray-200 float-right py-2 px-2 rounded"
                  >
                    <AiOutlineAppstoreAdd />
                  </motion.button>
                </Tippy>
              ) : null}

              <h2 className="block-title">Projects</h2>
              {userProfile.cv.projets.length > 0 ? (
                <>
                  {userProfile.cv.projets.map((project, index) => (
                    <div
                      className="item mb-5 item-section"
                      key={`${project}${index}`}
                    >
                      <div className="w-full space-y-5">
                        <div className="item-header items-end">
                          <div className="space-y-1.5">
                            <div className="font-medium capitalize">
                              {project.title}
                            </div>

                            <div className="flex space-x-5">
                              <div className="item-header-info">
                                <RiSuitcaseLine />
                                <span className="capitalize">
                                  {project.organization}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="top-0 right-0 ">
                            {user.roles.includes("admin") ||
                            user.id === userProfile._id ? (
                              <Tippy content="Delete Item">
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="deleteCvItem"
                                  onClick={() =>
                                    OnDeleteItem(
                                      {
                                        projets: {
                                          _id: project._id,
                                        },
                                      },
                                      userProfile.cv._id
                                    )
                                  }
                                >
                                  <MdOutlineDelete />
                                </motion.span>
                              </Tippy>
                            ) : null}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm capitalize">
                          {project.description}
                        </p>

                        <div className="border-b border-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
            {/* End Projects Block */}

            {/* Start Certifications Block  */}
            <div className="p-7 block-section">
              {user.roles.includes("admin") || user.id === userProfile._id ? (
                <Tippy content="Add Certification">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      CertifModalOpen
                        ? setCertifModalOpen(false)
                        : setCertifModalOpen(true)
                    }
                    className="editbtn text-xl text-[#041e62] hover:bg-gray-200 float-right py-2 px-2 rounded"
                  >
                    <AiOutlineAppstoreAdd />
                  </motion.button>
                </Tippy>
              ) : null}

              <h2 className="block-title">Certifications</h2>
              {userProfile.cv.certifications.length > 0 ? (
                <>
                  {userProfile.cv.certifications.map((certif, index) => (
                    <div
                      className="item mb-5 item-section"
                      key={`${certif}${index}`}
                    >
                      <div
                        className="company-logo"
                        style={{ color: "purple", fontSize: 18 }}
                      >
                        <GrCertificate />
                      </div>
                      <div className="w-full space-y-5">
                        <div className="item-header">
                          <div className="space-y-1.5">
                            <div className="font-medium capitalize">
                              {certif.domaine}
                            </div>
                          </div>
                          <div className="space-y-2 sm:text-right">
                            {/* <div className="job-item-badge">Full time</div> */}
                            <div className="item-header-info">
                              <HiOutlineCalendar />
                              <span>{certif.year}</span>
                              {user.roles.includes("admin") ||
                              user.id === userProfile._id ? (
                                <Tippy content="Delete Item">
                                  <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="deleteCvItem"
                                    onClick={() =>
                                      OnDeleteItem(
                                        {
                                          certifications: {
                                            _id: certif._id,
                                          },
                                        },
                                        userProfile.cv._id
                                      )
                                    }
                                  >
                                    <MdOutlineDelete />
                                  </motion.span>
                                </Tippy>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="border-b border-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
            {/* End Certifications Block */}
          </div>
          
        </div>
        <button
            onClick={handlePrint}
            className="mt-3 w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-10 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Download PDF</span>
          </button>
      </main>
      {/* Modals */}
      {/* begin Informations Form modal */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {InfoModalOpen && (
          <Modal
            modalOpen={InfoModalOpen}
            handleClose={() => setInfoModalOpen(false)}
            Form={InformationsForm}
          />
        )}
      </AnimatePresence>
      {/* end Informations Form modal */}
      {/* begin Experience Form modal */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {ExperienceModalOpen && (
          <Modal
            modalOpen={ExperienceModalOpen}
            handleClose={() => setExperienceModalOpen(false)}
            Form={ExperienceForm}
          />
        )}
      </AnimatePresence>
      {/* end Experience Form modal */}
      {/* begin Education Form modal */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {EducationModalOpen && (
          <Modal
            modalOpen={EducationModalOpen}
            handleClose={() => setEducationModalOpen(false)}
            Form={EducationForm}
          />
        )}
      </AnimatePresence>
      {/* end Education Form modal */}
      {/* begin Projects Form modal */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {ProjectsModalOpen && (
          <Modal
            modalOpen={ProjectsModalOpen}
            handleClose={() => setProjectsModalOpen(false)}
            Form={ProjectsForm}
          />
        )}
      </AnimatePresence>
      {/* end Projects Form modal */}
      {/* begin Certif Form modal */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {CertifModalOpen && (
          <Modal
            modalOpen={CertifModalOpen}
            handleClose={() => setCertifModalOpen(false)}
            Form={CertifForm}
          />
        )}
      </AnimatePresence>
      {/* end Certif Form modal */}
      {/* begin Skills Form modal */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {SkillsModalOpen && (
          <Modal
            modalOpen={SkillsModalOpen}
            handleClose={() => setSkillsModalOpen(false)}
            Form={SkillsForm}
          />
        )}
      </AnimatePresence>
      {/* end Skills Form modal */}
      {/* begin Image Form modal */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {ImageModalOpen && (
          <Modal
            modalOpen={ImageModalOpen}
            handleClose={() => setImageModalOpen(false)}
            Form={ImageForm}
          />
        )}
      </AnimatePresence>
      {/* end Skills Form modal */}
    </div>
  ) : null;
};
export default UserDetails;
