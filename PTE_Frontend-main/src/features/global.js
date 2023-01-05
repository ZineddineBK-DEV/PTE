import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenSize: undefined,
  accountSettingsModal: false,
  passwordCheckModal: false,
  activeMenu: false,
  isClickedUserSettings: false,
  isClickedNotifications: false,
  showHeaders: false,
};

const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.currentColor = action.payload;
      localStorage.setItem("colorMode", action.payload);
    },
    handleUserSettingsClick: (state, action) => {
      state.isClickedUserSettings = action.payload;
    },
    handleNotificationsClick: (state, action) => {
      state.isClickedNotifications = action.payload;
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },

    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setShowHeaders: (state, action) => {
      state.showHeaders = action.payload;
    },

    resetIsClicked: (state) => {
      state.isClickedNotifications = false;
      state.isClickedUserSettings = false;
    },
    setaccountSettingsModal: (state, action) => {
      state.accountSettingsModal = action.payload;
    },
    setPasswordCheckModal: (state, action) => {
      state.passwordCheckModal = action.payload;
      state.isSuccess = true;
    },
  },
});

export const {
  handleUserSettingsClick,
  handleNotificationsClick,
  setScreenSize,
  setActiveMenu,
  setShowHeaders,
  setaccountSettingsModal,
  setPasswordCheckModal,
  resetIsClicked,
} = global.actions;
export default global.reducer;
