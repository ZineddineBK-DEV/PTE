import { useRef, useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import Datetime from "react-datetime";
import { AnimatePresence } from "framer-motion";
import { Modal } from "..";

import { BiBookmark } from "react-icons/bi";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";

import { MdPendingActions, MdEventAvailable } from "react-icons/md";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getRoomEvents,
  setRoomEvent,
  deleteEvent,
  acceptEvent,
  reset,
} from "../../features/material-resources/rooms/roomSlice";

const RoomCalendar = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  var b = {};
  b["calendarRef_" + id] = useRef(null);

  const { roomEvents, isError, isSuccess, message } = useSelector(
    (state) => state.room
  );
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [EventModalOpen, setEventModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [EventInfo, setEventInfo] = useState("");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white capitalize";
  useEffect(() => {
    
    const _start = new Date(new Date().setDate(new Date().getDate() - 30));
    const _end = new Date(new Date().setDate(new Date().getDate() + 30));
    const start = new Date(
      _start.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    const end = new Date(
      _end.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    dispatch(
      getRoomEvents({
        start: start,
        end: end,
        room: id,
      })
    ).then((res) => {
      if (res.payload === "Request failed with status code 404") {
        navigate("/rooms");
      }
    });
  }, [id, reducerValue, dispatch, navigate, date]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleDateClick = (e) => {
    setDate(e.date);
    setAddEventModalOpen(true);
  };
  const eventHandleAdd = async (data) => {
    data.start = new Date(
      data.start.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    data.end = new Date(
      data.end.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    dispatch(setRoomEvent(data)).then(() => {
      setAddEventModalOpen(false);
      forceUpdate();
    });

    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
  };

  const handleDatesSet = (data) => {
    /** Get query*/
    const body = {
      start: data.start,
      end: data.end,
      room: id,
    };

    dispatch(getRoomEvents(body));
  };
  function renderEventContent(eventInfo) {
    if (eventInfo.event._def.extendedProps.isAccepted) {
      return (
        <div className="relative inline-flex w-full justify-start px-2 py-1 overflow-hidden font-medium transition-all bg-green-500 rounded-xl group cursor-pointer">
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-green-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
          <span className="relative w-full inline-flex text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            <MdEventAvailable className="text-white pt-1 text-xl" />{" "}
            <i className="capitalize font-base text-white pt-1">
              {eventInfo.event.title}
            </i>
          </span>
        </div>
      );
    } else {
      return (
        <div className="relative inline-flex w-full justify-start px-2 py-1 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group cursor-pointer">
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
          <span className="relative w-full inline-flex text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            <MdPendingActions className="text-white pt-1 text-xl" />{" "}
            <i className="capitalize font-base text-white pt-1">
              {eventInfo.event.title}
            </i>
          </span>
        </div>
      );
    }
  }
  const onEventClick = (eventObj) => {
    var eventData = roomEvents.filter((ev) => {
      return ev._id === eventObj.el.fcSeg.eventRange.def.extendedProps._id;
    });
    setEventInfo(eventData[0]);
    setEventModalOpen(true);
  };
  const AddEventForm = (date) => {
    const [start, setStart] = useState(date.date);
    const [end, setEnd] = useState(date.date);
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false);
    const onSubmit = (e) => {
      e.preventDefault();
      if (new Date(start).getTime() >= new Date(end).getTime()) {
        setError(true);
      } else {
        eventHandleAdd({
          title,
          start,
          end,
          room: id,
          applicant: user.id,
        });
      }
    };

    return (
      <form
        onSubmit={onSubmit}
        className="bg-white p-10 rounded-sm  w-10/12  my-3"
      >
        <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
          Set Event
        </h1>
        <div>
          <label className="text-gray-800 font-semibold block my-3 text-md">
            Context
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            className={inputClassName}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Start</label>
              <Datetime
                value={start}
                name="start"
                onChange={(e) => setStart(e._d)}
                className={inputClassName}
              />
            </div>
            <div>
              <label>End</label>
              <Datetime
                value={end}
                name="end"
                onChange={(e) => {
                  setEnd(e._d);
                }}
                className={inputClassName}
              />
            </div>
          </div>
          {error && (
            <p className="text-red-800 text-sm">
              * End date should be greater then start date{" "}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-4 rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Reserve</span>
        </button>
      </form>
    );
  };
  const EventForm = (props) => {
    const onConfirmEvent = (eventID) => {
      dispatch(acceptEvent(eventID)).then(() => {
        setEventModalOpen(false);
        forceUpdate();
      });
    };
    const onDeleteEvent = (eventID) => {
      dispatch(deleteEvent(eventID)).then(() => {
        setEventModalOpen(false);
        forceUpdate();
      });
    };
    return (
      <div className="bg-white p-10 rounded-lg font-medium">
        <div className="inline-flex space-x-16">
          <div className="inline-flex ml-3 w-36">
            {props.event.applicant && (
              <>
                <div>
                  <img
                    className="w-12 h-12 rounded-md shadow-lg"
                    src={`http://localhost:3000/images/${props.event.applicant.image}`}
                    alt="applicant"
                  />
                </div>
                <div className="ml-3 block capitalize text-sm font-medium mt-1">
                  <div className="underline text-gray-600">Applicant</div>
                  <div>{props.event.applicant.fullName}</div>
                </div>
              </>
            )}
          </div>
        </div>
        <br />
        <div className="inline-flex pl-2 pt-3 capitalize">
          <div className="pt-1">
            <BiBookmark className="shadow-xl text-gray-600" />
          </div>
          <h1 className="  pl-3 underline text-gray-600">context </h1>
          <h1 className=" capitalize pl-3 ">: {props.event.title} </h1>
        </div>
        <br />

        {/* Start */}
        <div className="inline-flex pl-2 capitalize">
          <div>
            <AiOutlineCalendar className="shadow-xl text-gray-600 text-lg" />
          </div>
          <h1 className="pl-2 text-gray-600 underline">start </h1>
          <h1 className="pl-2">
            {new Date(props.event.start).toISOString().substring(0, 10)}
          </h1>
          <h1 className="pl-2 text-gray-700">AT</h1>
          <AiOutlineClockCircle className="text-gray-700 pl-2 text-2xl pt-1" />
          <h1 className="pl-1">{props.event.start.match(/\d\d:\d\d/)[0]}</h1>
        </div>
        <br />
        {/* end */}
        <div className="inline-flex pl-2 capitalize">
          <div>
            <AiOutlineCalendar className="shadow-xl text-gray-600 text-lg" />
          </div>
          <h1 className="pl-2 text-gray-600 underline">end &nbsp;&nbsp; </h1>
          <h1 className="pl-2">
            : {new Date(props.event.end).toISOString().substring(0, 10)}
          </h1>
          <h1 className="pl-2 text-gray-700">AT</h1>
          <AiOutlineClockCircle className="text-gray-700 pl-2 text-2xl pt-1" />
          <h1 className="pl-1"> {props.event.end.match(/\d\d:\d\d/)[0]}</h1>
        </div>
        <br />

        <div className="grid grid-cols-2 gap-1 mt-5">
          {(user.roles.includes("admin") ||
            user.id === props.event.applicant._id) && (
            <button
              onClick={() => onDeleteEvent(props.event._id)}
              className="rounded px-5 py-2.5 overflow-hidden group bg-rose-500 relative hover:bg-gradient-to-r hover:from-rose-500 hover:to-rose-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-rose-400 transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Delete</span>
            </button>
          )}
          {!props.event.isAccepted && user.roles.includes("admin") && (
            <button
              onClick={() => onConfirmEvent(props.event._id)}
              className="rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Confirm</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className=" col-span-3 rounded-lg relative z-0">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          ref={b["calendarRef_" + id]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,listWeek, timeGridWeek,timeGridDay",
          }}
          dateClick={handleDateClick}
          eventAdd={(event) => eventHandleAdd(event)}
          datesSet={(data) => handleDatesSet(data)}
          eventContent={renderEventContent}
          eventClick={onEventClick}
          events={roomEvents}
          weekends={false}
          slotMinTime="08:00"
          slotMaxTime="21:00"
        />
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {EventModalOpen && (
          <Modal
            modalOpen={EventModalOpen}
            handleClose={() => setEventModalOpen(false)}
            Form={EventForm}
            event={EventInfo}
          />
        )}
      </AnimatePresence>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {addEventModalOpen && (
          <Modal
            modalOpen={addEventModalOpen}
            handleClose={() => setAddEventModalOpen(false)}
            Form={AddEventForm}
            date={date}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RoomCalendar;
