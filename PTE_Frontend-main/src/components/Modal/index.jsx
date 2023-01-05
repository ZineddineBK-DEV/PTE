import Backdrop from "../Backdrop";
import { motion } from "framer-motion";
import { GrClose } from "react-icons/gr";
const Modal = ({ handleClose, Form, date, event }) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="float-left ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="rounded-full px-2 py-2 bg-white border-none"
          >
            <GrClose className="text-white" style={{ color: "white" }} />
          </motion.button>
        </div>

        <Form date={date} event={event} />
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
