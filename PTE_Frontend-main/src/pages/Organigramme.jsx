import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setShowHeaders } from "../features/global";
import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";


import {
  
  getUserById,
  updateUser,
  deleteItemFromCv,
} from "../features/user/userSlice";
import cover from "../data/cover.jpg";

import { FiEdit3 } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";


const Organigramme = () => {
  const [InfoModalOpen, setInfoModalOpen] = useState(false);
  const [ImageModalOpen, setImageModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { userProfile } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.auth);
   
  useEffect(() => {
    
    
  }, []);
  useEffect(() => {
  
  });


  return userProfile ? (

    <div className="bg-gray-100 antialiased">
      <main className="main-container">
        <div className="grid gap-5 lg:grid-cols-3">
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
                    src={`http://localhost:3001/images/${userProfile.image}`}
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

             
            </div>
            {/* End Info Block */}
           
            {/* End Skill Block */}
          </div>
          {/* End Left Side */}
          
          
        </div>
        
      </main>
    
     
     
    
     

    </div>
  ) : null;
};
export default Organigramme ;
