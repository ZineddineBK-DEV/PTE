import { useEffect, useState } from "react";
import { Header } from "../components";
import { setShowHeaders } from "../features/global";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { filterUsers } from "../features/user/userSlice";
import { reset } from "../features/material-resources/vehicles/vehicleSlice";
import { BiSearchAlt } from "react-icons/bi";
const TechnicalTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector(
    (state) => state.userEvents
  );
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [myCalendar, setMyCalendar] = useState(false);
  useEffect(() => {
    dispatch(filterUsers({ paths: "fullName image title department" }));
    dispatch(setShowHeaders(true));
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) {
      dispatch(filterUsers({ paths: "fullName image title department" }));
    } else {
      dispatch(
        filterUsers({
          paths: "fullName image title department",
          fullName: value,
          title: value,
          department: value,
        })
      );
    }
  }

  return (
    <div className=" p-2 md:p-10 bg-white rounded-3xl">
      {myCalendar ? (
        <Header title="My Calendar" />
      ) : (
        <Header title="Technical Team" />
      )}

      <div className="grid grid-cols-4 divide-x">
        <div className=" overflow-auto" style={{ maxHeight: "735px" }}>
          {/* begin Users block */}
          <div className="grid grid-cols-1 divide-y px-1">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray ">
                <BiSearchAlt />
              </span>
              <input
                onKeyDown={handleKeyDown}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm outline-0"
                placeholder="Fullname || Title || Department ..."
                type="text"
                name="search"
              />
            </label>
            <button
              onClick={() => {
                navigate("/techteam/events/" + user.id);
                setMyCalendar(true);
              }}
              className=" rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">My Calendar</span>
            </button>

            {users.length > 0 ? (
              users.map((user) => (
                <NavLink
                  onClick={() => setMyCalendar(false)}
                  to={"/techteam/events/" + user._id}
                  key={user._id}
                  className={({ isActive }) =>
                    isActive
                      ? "py-3 px-2 mt-1 bg-[#04267b] text-white rounded-lg"
                      : "py-3 px-2 mt-1 bg-gray-200 rounded-lg"
                  }
                >
                  <div className="overflow-hidden relative max-w-sm mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5 ingeneer">
                    <img
                      className=" rounded-full shadow-lg"
                      src={`http://localhost:3000/images/${user.image}`}
                      alt="ingeneer"
                    />
                    <div className="flex flex-col py-1 pl-24">
                      <strong className="text-slate-900 text-sm font-medium dark:text-slate-200 capitalize">
                        {user.fullName}
                      </strong>
                      <span className="text-slate-500 text-sm font-medium dark:text-slate-400 capitalize">
                        {user.title}
                      </span>
                      <span className="text-slate-500 text-sm font-medium dark:text-slate-400 capitalize">
                        {user.department}
                      </span>
                    </div>
                  </div>
                </NavLink>
              ))
            ) : (
              <div className="py-3 px-2 bg-gray-200 rounded-lg h-full">
                No data to display
              </div>
            )}
          </div>
          {/* end Users block */}
        </div>

        <div className=" col-span-3 rounded-lg relative z-0">
          {/* Begin Calender Block*/}

          <Outlet />

          {/* End Calender Block*/}
        </div>
      </div>
    </div>
  );
};

export default TechnicalTeam;
