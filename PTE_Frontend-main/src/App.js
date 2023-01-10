import { React } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";
import { isExpired } from "react-jwt";
import {
  setaccountSettingsModal,
  setPasswordCheckModal,
} from "./features/global";
import { logout } from "./features/auth/authSlice";

import {
  Navbar,
  Footer,
  Sidebar,
  GuardedRoute,
  VehicleCalendar,
  RoomCalendar,
  TechTeamCalendar,
  ActionPlanEvent,
  Modal,
  AccountSettingsForm,
  PasswordCheckForm,
} from "./components";

import {
  Home,
  Organigramme,
  Employees,
  SousTraitant,
  ActionPlan,
  RegisterRequests,
  Login,
  Register,
  UserDetails,
  Vehicles,
  Rooms,
  TechnicalTeam,
  VerificationCode,
  ChangePassword,
  
} 
from "./pages";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const { activeMenu, showHeaders, accountSettingsModal, passwordCheckModal } =
    useSelector((state) => state.global);
  const { user } = useSelector((state) => state.auth);

  if (user) {
    if (isExpired(user.token)) {
      dispatch(logout());
    }
  }

  const renderPageWithHeaders = (
    <div>
      <BrowserRouter>
        <div className="flex relative font-light tracking-wide ">
          {activeMenu ? (
            <div>
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                <Route
                  path="/"
                  exact
                  element={
                    <GuardedRoute>
                      <Home />
                    </GuardedRoute>
                  }
                />
                <Route
                  path="/home"
                  exact
                  element={
                    <GuardedRoute>
                      <Home />
                    </GuardedRoute>
                  }
                />

                {/* pages  */}

                <Route
                  path="/employees"
                  element={
                    <GuardedRoute>
                      <Employees />
                    </GuardedRoute>
                  }
                />
                <Route
                  path="/sousTraitant"
                  element={
                    <GuardedRoute>
                      <SousTraitant />
                    </GuardedRoute>
                  }
                />
                <Route
                  path="/organigramme"
                  exact
                  element={
                    <GuardedRoute>
                      <Organigramme />
                    </GuardedRoute>
                  }
                />
                <Route
                  path="/ActionPlan"
                  element={
                    <GuardedRoute>
                      <ActionPlan />
                    </GuardedRoute>
                  }
                >
                  <Route
                    path="events/:id"
                    element={
                      <GuardedRoute>
                        <ActionPlanEvent />
                      </GuardedRoute>
                    }
                  />
                </Route>




                <Route
                  path="/registerRequests"
                  element={
                    <GuardedRoute>
                      <RegisterRequests />
                    </GuardedRoute>
                  }
                />
                {/* Vehicles */}
                <Route
                  path="/vehicles"
                  element={
                    <GuardedRoute>
                      <Vehicles />
                    </GuardedRoute>
                  }
                >
                  <Route
                    path="events/:id"
                    element={
                      <GuardedRoute>
                        <VehicleCalendar />
                      </GuardedRoute>
                    }
                  />
                </Route>

                {/* Rooms */}
                <Route
                  path="/rooms"
                  element={
                    <GuardedRoute>
                      <Rooms />
                    </GuardedRoute>
                  }
                >
                  <Route
                    path="events/:id"
                    element={
                      <GuardedRoute>
                        <RoomCalendar />
                      </GuardedRoute>
                    }
                  />
                </Route>
                {/* Technical Team */}
                <Route
                  path="/techteam"
                  element={
                    <GuardedRoute>
                      <TechnicalTeam />
                    </GuardedRoute>
                  }
                >
                  <Route
                    path="events/:id"
                    element={
                      <GuardedRoute>
                        <TechTeamCalendar />
                      </GuardedRoute>
                    }
                  />
                </Route>

                {/* apps  */}

                <Route
                  path="/user-details"
                  element={
                    <GuardedRoute>
                      <UserDetails />
                    </GuardedRoute>
                  }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
      {accountSettingsModal && (
        <Modal
          modalOpen={accountSettingsModal}
          handleClose={() => dispatch(setaccountSettingsModal(false))}
          Form={AccountSettingsForm}
        />
      )}
      {passwordCheckModal && (
        <Modal
          modalOpen={passwordCheckModal}
          handleClose={() => {
            dispatch(setPasswordCheckModal(false));
          }}
          Form={PasswordCheckForm}
        />
      )}
    </div>
  );

  const renderPageWithNoHeaders = (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <GuardedRoute>
                <Home />
              </GuardedRoute>
            }
          />
          <Route
            path="/home"
            exact
            element={
              <GuardedRoute>
                <Home />
              </GuardedRoute>
            }
          />

          {/* pages  */}

          <Route
            path="/employees"
            element={
              <GuardedRoute>
                <Employees />
              </GuardedRoute>
            }
          />

          <Route
            path="/sousTraitant"
            element={
              <GuardedRoute>
                <SousTraitant />
              </GuardedRoute>
            }
          />
          <Route
            path="/organigramme"
            exact
            element={
              <GuardedRoute>
                <Organigramme />
              </GuardedRoute>
            }
          />
          <Route
            path="/registerRequests"
            element={
              <GuardedRoute>
                <RegisterRequests />
              </GuardedRoute>
            }
          />

          {/* Vehicles */}
          <Route
            path="/vehicles"
            element={
              <GuardedRoute>
                <Vehicles />
              </GuardedRoute>
            }
          >
            <Route
              path="events/:id"
              element={
                <GuardedRoute>
                  <VehicleCalendar />
                </GuardedRoute>
              }
            />
          </Route>

          {/* Rooms */}
          <Route
            path="/rooms"
            element={
              <GuardedRoute>
                <Rooms />
              </GuardedRoute>
            }
          >
            <Route
              path="events/:id"
              element={
                <GuardedRoute>
                  <RoomCalendar />
                </GuardedRoute>
              }
            />
          </Route>
          {/* Technical Team */}
          <Route
            path="/techteam"
            element={
              <GuardedRoute>
                <TechnicalTeam />
              </GuardedRoute>
            }
          >
            <Route
              path="events/:id"
              element={
                <GuardedRoute>
                  <TechTeamCalendar />
                </GuardedRoute>
              }
            />
          </Route>


          <Route
            path="/ActionPlan"
            element={
              <GuardedRoute>
                <ActionPlan />
              </GuardedRoute>
            }
          >
            <Route
              path="events/:id"
              element={
                <GuardedRoute>
                  <ActionPlanEvent />
                </GuardedRoute>
              }
            />
          </Route>

          <Route
            path="/user-details"
            element={
              <GuardedRoute>
                <UserDetails />
              </GuardedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification-code" element={<VerificationCode />} />
          <Route path="/change-psw/:id" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );

  return showHeaders ? renderPageWithHeaders : renderPageWithNoHeaders;
};

export default App;
