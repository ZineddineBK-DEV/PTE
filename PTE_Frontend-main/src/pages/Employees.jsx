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
  updateUserRoles,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { toast } from "react-toastify";
import { BiEditAlt } from "react-icons/bi";
const pageSize = 10;
const Employees = () => {
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
  const [titleFilter, settitleFilter] = useState("");
  const [departmentFilter, setdepartmentFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const onFilterSubmit = () => {
    dispatch(
      searchUsers({
        fullName: fullNameFilter,
        title: titleFilter,
        department: departmentFilter,
        address: addressFilter,
      })
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
  const RolesForm = () => {
    const [userRoles, setuserRoles] = useState(getRoles());
    const onSelectRole = (e) => {
      setuserRoles(Array.isArray(e) ? e.map((x) => x) : []);
    };
    function getRoles() {
      var defaultVal = [];
      selectedUser.roles.forEach((r) => {
        roles.forEach((element) => {
          if (element.value === r) {
            defaultVal.push(element);
          }
        });
      });
      return defaultVal;
      //return roles.filter((r) => selectedUser.roles.includes(r.value));
    }
    const onSubmit = () => {
      var selectedRoles = [];
      userRoles.forEach((x) => selectedRoles.push(x.value));
      dispatch(
        updateUserRoles({
          _id: selectedUser._id,
          body: { roles: selectedRoles },
        })
      ).then(() => {
        setRolesModalOpen(false);
        forceUpdate();
      });
    };
    return (
      <div className="bg-white p-10 rounded-sm min-w-full ">
        <h1 className="text-center text-2xl mb-6 text-gray-600 font-medium font-sans">
          Edit User Roles
        </h1>

        <div className="flex items-center space-x-3 p-4 mb-2 border-2 ring-1 rounded-lg">
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
        <Select
          value={userRoles}
          isMulti
          options={roles}
          className="basic-multi-select mb-1"
          classNamePrefix="select"
          onChange={onSelectRole}
          isClearable
        />

        <button
          onClick={onSubmit}
          className=" mt-2 w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Confirm</span>
        </button>
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
        <Header category="Page" title="Employees" />

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
                Address
              </label>
              <input
                onChange={(e) => setAddressFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#041e62] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              />
            </div>
            <div className="p-3 font-sm">
              <label className="block mb-2 text-sm font-medium text-[#041e62] dark:text-gray-300">
                Title
              </label>
              <input
                onChange={(e) => settitleFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#041e62] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              />
            </div>
            <div className="p-3 font-sm">
              <label className="block mb-2 text-sm font-medium text-[#041e62] dark:text-gray-300">
                Department
              </label>
              <input
                onChange={(e) => setdepartmentFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-[#041e62] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize"
              />
            </div>
            <div className="pt-10 z-0">
              <button
                onClick={onFilterSubmit}
                className="w-auto rounded px-16 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-gray-800 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-700 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Search</span>
              </button>
            </div>
          </div>
          {/* ************ */}
          <table className=" mx-12 max-w-5xl w-screen whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-[#041e62]">
              <tr className="text-white text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  {" "}
                  Name{" "}
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  {" "}
                  Designation{" "}
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  {" "}
                  Address{" "}
                </th>
                {user.roles.includes("admin") && (
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                    {" "}
                    role{" "}
                  </th>
                )}

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
                    {user.roles.includes("admin") && (
                      <td className="px-6 py-4 text-center capitalize roles">
                        <div className="flex">
                          <div className="inline-flex">
                            <Tippy content="Edit roles">
                              <button
                                onClick={() => {
                                  onRolesEdit(employee);
                                }}
                                className="role-edit-btn"
                              >
                                <BiEditAlt />
                              </button>
                            </Tippy>

                            <div>
                              {employee.roles.map((role, index) => (
                                <div key={`${index}${employee._id}`}>
                                  {role === "sales_assistant" ? (
                                    <>
                                      <span className="text-sm">
                                        - Sales Assistant
                                      </span>{" "}
                                      <br />
                                    </>
                                  ) : null}

                                  {role === "virt_manager" ? (
                                    <>
                                      <span className="text-sm">
                                        - Virtualization manager
                                      </span>{" "}
                                      <br />
                                    </>
                                  ) : null}
                                  {role === "engineer" ? (
                                    <>
                                      <span className="text-sm">
                                        - Engineer
                                      </span>{" "}
                                      <br />
                                    </>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}

                    <td className="px-6 py-4 text-center">
                      {" "}
                      <button
                        onClick={() => {
                          navigate("/user-details", {
                            state: { id: employee._id },
                          });
                        }}
                        className="relative inline-flex items-center justify-center  py-1 overflow-hidden font-medium text-[#041e62] transition duration-300 ease-out border-2 border-[#041e62] rounded-full shadow-md group"
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#041e62] group-hover:translate-x-0 ease">
                          <HiArrowRight className="text-2xl" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-[#041e62] transition-all duration-300 transform group-hover:translate-x-full ease">
                          Profile
                        </span>
                        <span className="relative invisible">Button Text</span>
                      </button>
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
        {user.roles.includes("admin") && rolesModalOpen ? (
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {rolesModalOpen && (
              <Modal
                modalOpen={rolesModalOpen}
                handleClose={() => setRolesModalOpen(false)}
                Form={RolesForm}
              />
            )}
          </AnimatePresence>
        ) : null}
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
      </div>
    </>
  );
};
export default Employees;
