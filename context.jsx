import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/Reducer";
// import { useNavigate } from 'react-router-dom';

const AppContext = createContext();
const API_BASE = "https://admin.casaabuelagoa.com/api";

// Rehydrate user state from localStorage if available
const savedUser = JSON.parse(localStorage.getItem("user") || "null");

const AppProvider = ({ children }) => {
  // const navigate = useNavigate();

  const initialState = {
    step: savedUser ? "AUTHENTICATED" : "SEND_OTP", // Automatically set correct step on page refresh
    phoneNumber: "",
    AuthLoggedIn: !!savedUser, // Boolean flag indicating if logged in
    otp: "",
    loading: false,
    error: null,
    customerId: savedUser?.customerId || "",
    customerGUID: savedUser?.customerGUID || "",
    token: savedUser?.token || null,
    profileData: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // ---- Send OTP Function
  const SendOtp = async (identifier) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(`${API_BASE}/Login/SendOTP`, {
        mobileNo: identifier,
      });
      const res = response.data;
      console.log(res);

      dispatch({
        type: "SEND_OTP_SUCCESS",
        payload: {
          phoneNumber: identifier,
          otp: res.otp,
        },
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response?.data?.message || "Failed to send OTP",
      });
    }
  };

  // ---- Validate OTP Function
  const validateOtp = async (otpInput) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(`${API_BASE}/Login/VerifyOTPAndLogin`, {
        mobileNo: state.phoneNumber,
        otp: otpInput,
      });
      const res = response.data;

      const userData = {
        customerId: res.customerId,
        customerGUID: res.customerGUID,
      };

      // 1. Save data synchronously to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // 2. Update Reducer state
      dispatch({
        type: "VERIFY_OTP_SUCCESS",
        payload: userData,
      });

      if (res.success) {
        alert("Login Successful");
        // navigate("/");
      }
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response?.data?.message || "Invalid OTP",
      });
    }
  };

  // ---- Logout user
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  // ---- Get Profile Data (Dynamic State usage)
  const GetProfileData = async () => {
    // Ensure credentials exist before sending request
    if (!state.customerId || !state.customerGUID) return;

    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(
        `${API_BASE}/Customer/GetCustomerProfile/${state.customerId}/${state.customerGUID}`
      );

      dispatch({
        type: "PROFILE_DATA",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response?.data?.message || "Failed to fetch profile",
      });
    }
  };

  // ---- Fetch Profile automatically when logged in
  useEffect(() => {
    if (state.AuthLoggedIn && state.customerId && state.customerGUID) {
      GetProfileData();
    }
  }, [state.AuthLoggedIn, state.customerId, state.customerGUID]); // Strictly monitor credential changes

  return (
    <AppContext.Provider
      value={{
        ...state,
        SendOtp,
        validateOtp,
        logout,
        GetProfileData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
