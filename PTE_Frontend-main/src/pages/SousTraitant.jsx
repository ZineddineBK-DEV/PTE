import React, { useEffect, useReducer, useState } from "react";
import _ from "lodash";
import Select from "react-select";
import { Header, Modal } from "../components";
import { roles } from "../data/dummy";
import { AnimatePresence } from "framer-motion";
import { TiWarningOutline } from "react-icons/ti";
import Tippy from "@tippyjs/react";
import { setShowHeaders } from "../features/global";
import {
  deleteUser,
  searchUsers,
  reset,
  AddUser,
  updateUserRoles,
  getAllUsers,
} from "../features/user/userSlice";
import {
  searchCvs,
} from "../features/cvs/cvsSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { toast } from "react-toastify";
import { BiEditAlt } from "react-icons/bi";
const pageSize = 10;
const SousTraitant = () => {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);

  const [rolesModalOpen, setRolesModalOpen] = useState(false);
  const [DeleteEmployeeModal, setDeleteEmployeeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [paginatedUsers, setPaginatedUsers] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const pageCount = users ? Math.ceil(users.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);
  const [fullNameFilter, setfullNameFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const onFilterUsersSubmit = () => {
    dispatch(
      searchUsers({
        fullName: fullNameFilter,
       
      })
    ).then((res) => {
      setPaginatedUsers(_(res.payload).slice(0).take(pageSize).value());
    });
  };
  const onFilterCvsSubmit = () => {
  
    dispatch(
      searchCvs({
        skillsFilter: skillsFilter,
      }),
      ).then((res) => {
        setPaginatedUsers(_(res.payload).slice(0).take(pageSize).value());
      });
  };
  useEffect(() => {
    dispatch(searchUsers({})).then((res) => {
      if (res.payload.length > 0) {
        setPaginatedUsers(_(res.payload).slice(0).take(pageSize).value());
      } else {
        setPaginatedUsers(null);
      }
    });
 
    dispatch(setShowHeaders(true));
  }, [reducerValue, dispatch]);

  useEffect(() => {
  dispatch(searchCvs({})).then((res) => {
    if (res.payload.length > 0) {
      setPaginatedUsers(_(res.payload).slice(0).take(pageSize).value());
    } else {
      setPaginatedUsers(null);
    }
  });

  dispatch(setShowHeaders(true));
}, [reducerValue, dispatch]);

  useEffect(() => {
    dispatch(reset());
    if (isError) {
      if (message.trim().length > 0) {
        toast.error(message);
      }
    }

    if (isSuccess) {
      if (message.trim().length > 0) {
        toast.success(message);
      }
    }
  }, [isError, isSuccess, message, dispatch]);
  const onDeleteUser = (id) => {
    dispatch(deleteUser(id));
    setDeleteEmployeeModal(false);
    forceUpdate();
  };
  const onRolesEdit = (user) => {
    setSelectedUser(user);
    setRolesModalOpen(true);
  };
  const pagination = (pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    setPaginatedUsers(_(users).slice(startIndex).take(pageSize).value());
  };
  /********************* */
  
  const AddUserForm = () => {
    const [fullName, setFullname] = useState("");
    const [email, setMail] = useState("");
    const [cvEx, setCv] = useState("");
    const [external, setExternal] = useState("");

    const onSubmit = (e) => {
      e.preventDefault();
      const body = {fullName,email,cvEx,external };
      dispatch(AddUser(body));
      dispatch(getAllUsers());
      setAddUserModalOpen(false);
    };
    return (
      <div className="py-6 px-6 lg:px-8 w-full bg-white">
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Add External
        </h3>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              FullName
            </label>
            <input
              onChange={(e) => setFullname(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
             Email
            </label>
            <input
              onChange={(e) => setMail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
             Curriculume Vitae
            </label>
            <input
            type={"file"}
              onChange={(e) => setCv(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div
                      className="flex py-3 border-gray-200 text-sm leading-5 text-black-500 "
                      style={{ fontSize: 15, paddingTop: 15 }}
                    >
                      <span className="px-3">External</span>
                    </div>
                    <div className="flex">
                      <div className="flex  mr-4">
                        <input
                          type="radio"
                          value="Yes"
                          name="external"
                          className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => setExternal(e.target.value)}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Yes
                        </label>
                      </div>
                      <div className="flex ml-4 " style={{ paddingBottom: 15 }}>
                        <input
                          type="radio"
                          value="No"
                          name="external"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => setExternal(e.target.value)}
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        No
                        </label>
                      </div>
                    </div>
          <button
            type="submit"
            className="w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add</span>
          </button>
        </form>
      </div>
    );
  };
  const deleteUserForm = () => {
    return (
      <div className="w-full  bg-black rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <TiWarningOutline className="text-6xl mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this User?
              <div className="flex items-center space-x-3 p-1 mb-2 border-2 ring-1 mt-1 rounded-lg">
                <div className="inline-flex ">
                  {" "}
                  <img
                    className="w-16 h-16 object-cover rounded-full shadow-lg"
                    alt="User avatar"
                    src={`http://localhost:3000/images/${selectedUser.image}`}
                  />{" "}
                </div>
                <div>
                  <p className="capitalize pl-3 text-lg font-bold">
                    {" "}
                    {selectedUser.fullName}{" "}
                  </p>
                </div>
              </div>
            </h3>

            <button
              onClick={() => {
                onDeleteUser(selectedUser._id);
              }}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setDeleteEmployeeModal(false)}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="mt-4 pl-2 w-full bg-white rounded-3xl">
        <Header category="Page" title="External"/>

        <div className="overflow-x-auto w-full">
          <div className="rounded overflow-hidden shadow-lg w-screen max-w-5xl bg-gray-100 grid grid-cols-5 mx-12 mb-3">
            <div className="p-3 font-sm">
              <label className="block mb-2 text-sm font-medium text-[#041e62] dark:text-gray-300">
                Fullname
              </label>
              <input
                onChange={(e) => setfullNameFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#041e62] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              />
            </div>
        
          
            <div className="p-3 font-sm">
              <label className="block mb-2 text-sm font-medium text-[#041e62] dark:text-gray-300">
                Skills
              </label>
              <input
                onChange={(e) => setSkillsFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#041e62] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              />
            </div>
          
            <div className="pt-10">
              <button
                onClick={onFilterUsersSubmit}
                className="w-auto rounded px-16 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-700 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Search</span>
              </button>
            </div>
            {user.roles.includes("admin") && (
            <div className="pt-10 ">
              <button
             className="w-auto rounded px-16 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-700 transition-all ease-out duration-300"
             onClick={() => setAddUserModalOpen(true)}
              >
                
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">+ External</span>
              </button>
            </div>
            )}
          </div>
          {/* ************ */}
          <table className=" mx-12 max-w-5xl w-screen whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-[#041e62]">
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  {" "}
                  Name{" "}
                </th>
                {user.roles.includes("admin") && (
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  {" "}
                 Curriculume Vitae{" "}
                </th>
                )}
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  {" "}
                  Skills{" "}
                </th>
               

                <th className="font-semibold text-sm uppercase px-6 py-4"> </th>
              </tr>
            </thead>
            {paginatedUsers ? (
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="inline-flex w-10 h-10">
                          {" "}
                          <img
                            className="w-10 h-10 object-cover rounded-full"
                            alt="User avatar"
                            src={`http://localhost:3000/images/${employee.image}`}
                          />{" "}
                        </div>
                        <div>
                          <p className="capitalize"> {employee.fullName} </p>
                          <p className="text-gray-500 text-sm font-semibold tracking-wide">
                            {" "}
                            {employee.email}{" "}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="capitalize"> {employee.title} </p>
                      <p className="text-gray-500 text-sm font-semibold tracking-wide capitalize">
                        {" "}
                        {employee.department}{" "}
                      </p>
                    </td>
                    <td>
                      <p className="text-gray-500 text-sm font-semibold tracking-wide capitalize">
                        {" "}
                        {employee.address}{" "}
                      </p>
                    </td>
                   
                    <td className="px-6 py-4 text-center">
                      {" "}
                                       {/* Delete button */}
                      {user.roles.includes("admin") ? (
                        <button
                          onClick={() => {
                            setSelectedUser(employee);
                            setDeleteEmployeeModal(true);
                          }}
                          className="ml-1 relative inline-flex items-center justify-center py-1 overflow-hidden font-medium text-red-900 transition duration-300 ease-out border-2 border-red-900 rounded-full shadow-md group"
                        >
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-900 group-hover:translate-x-0 ease text-xl">
                            <AiTwotoneDelete />
                          </span>
                          <span className="absolute flex items-center justify-center w-full h-full text-red-900 transition-all duration-300 transform group-hover:translate-x-full ease">
                            Delete
                          </span>
                          <span className="relative invisible">
                            Button Text
                          </span>
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>
                    <div className="p-8">No data to display</div>{" "}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {/* Pagination */}
          <div
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px pt-2  mx-12"
            aria-label="Pagination"
          >
            <button
              onClick={() => pagination(currentPage - 1)}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>

              <HiChevronLeft />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => pagination(page)}
                aria-current="page"
                className={
                  page === currentPage
                    ? "z-10 bg-indigo-50 border-[#041e62] text-[#041e62] relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
              >
                {" "}
                {page}{" "}
              </button>
            ))}

            <button
              onClick={() => pagination(currentPage + 1)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              disabled={currentPage === pageCount}
            >
              <span className="sr-only">Next</span>

              <HiChevronRight />
            </button>
          </div>
        </div>
     
        {user.roles.includes("admin") && DeleteEmployeeModal ? (
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {DeleteEmployeeModal && (
              <Modal
                modalOpen={DeleteEmployeeModal}
                handleClose={() => setDeleteEmployeeModal(false)}
                Form={deleteUserForm}
              />
            )}
          </AnimatePresence>
          
        ) : null}
        {user.roles.includes("admin") && addUserModalOpen ? (

  <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {addUserModalOpen && (
          <Modal
            modalOpen={addUserModalOpen}
            handleClose={() => setAddUserModalOpen(false)}
            Form={AddUserForm}
          />
        )}
      </AnimatePresence>
 ) : null}


        
      </div>
    </>
  );
};
export default SousTraitant;
