import { useEffect, useReducer, useState } from "react";
import _ from "lodash";
import { Header } from "../components";

import { setShowHeaders } from "../features/global";
import {
  deleteUser,
  getSignupRequests,
  confirmSignUp,
  reset,
} from "../features/user/userSlice";

import { useSelector, useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { toast } from "react-toastify";
const pageSize = 10;

const RegisterRequests = () => {
  const dispatch = useDispatch();

  const { requests, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [paginatedUsers, setPaginatedUsers] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const pageCount = requests ? Math.ceil(requests.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);
  const [fullNameFilter, setfullNameFilter] = useState("");
  const [departmentFilter, setdepartmentFilter] = useState("");
  const [addressFilter, setaddressFilter] = useState("");

  const onFilterSubmit = () => {
    dispatch(
      getSignupRequests({
        fullName: fullNameFilter,
        department: departmentFilter,
        address: addressFilter,
        isEnabled: "false",
      })
    ).then((res) => {
      if (res.payload.length > 0) {
        setPaginatedUsers(_(res.payload).slice(0).take(pageSize).value());
      } else {
        setPaginatedUsers(null);
      }
    });
  };
  useEffect(() => {
    dispatch(getSignupRequests({ isEnabled: "false" })).then((res) => {
      if (res.payload.length > 0) {
        setPaginatedUsers(_(res.payload).slice(0).take(pageSize).value());
      } else {
        setPaginatedUsers(null);
      }
    });
    dispatch(setShowHeaders(true));
  }, [reducerValue, dispatch]);

  useEffect(() => {
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
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);
  const onDeleteUser = (id) => {
    dispatch(deleteUser(id));
    forceUpdate();
  };
  const pagination = (pageNo) => {
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    setPaginatedUsers(_(requests).slice(startIndex).take(pageSize).value());
  };

  return (
    <>
   


      <div className="mt-4 pl-2 w-full bg-white rounded-3xl">
      <Header category="Page" title="Register Requests" />

        <div className="overflow-x-auto w-full">
          <div className="rounded overflow-hidden shadow-lg w-full max-w-4xl bg-gray-100 grid grid-cols-4 mx-12 mb-3">
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
                onChange={(e) => setaddressFilter(e.target.value)}
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
            <div className="pt-10 ml-8">
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
          <table className=" mx-12 max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
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

                <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                  {" "}
                  role{" "}
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
                    <td className="px-6 py-4">
                      <p className="capitalize"> {employee.address} </p>
                    </td>

                    <td className="px-6 py-4 text-center capitalize">
                      {" "}
                      {employee.roles[0]}{" "}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {" "}
                      <button
                        onClick={() => {
                          dispatch(confirmSignUp(employee._id));
                          forceUpdate();
                        }}
                        className="relative inline-flex items-center justify-center  py-1 overflow-hidden font-medium text-green-900 transition duration-300 ease-out border-2 border-green-900 rounded-full shadow-md group"
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-900 group-hover:translate-x-0 ease">
                          <FaCheck className="text-2xl" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-green-900 transition-all duration-300 transform group-hover:translate-x-full ease">
                          Accept
                        </span>
                        <span className="relative invisible">Button Text</span>
                      </button>
                      {/* Decline button */}
                      {user.roles.includes("admin") ? (
                        <button
                          onClick={() => {
                            onDeleteUser(employee._id);
                          }}
                          className="ml-1 relative inline-flex items-center justify-center py-1 overflow-hidden font-medium text-red-900 transition duration-300 ease-out border-2 border-red-900 rounded-full shadow-md group"
                        >
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-900 group-hover:translate-x-0 ease text-xl">
                            <ImCross />
                          </span>
                          <span className="absolute flex items-center justify-center w-full h-full text-red-900 transition-all duration-300 transform group-hover:translate-x-full ease">
                            Decline
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
              disabled={currentPage === pageCount || pageCount === 0}
            >
              <span className="sr-only">Next</span>

              <HiChevronRight/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterRequests;
