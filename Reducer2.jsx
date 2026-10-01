const Reducer = (state, action) =>{
   switch (action.type) { 
      case "SET_LOADING":
         return {
         ...state,
         loading: true,
         error: null,
         };
      case "SEND_OTP_SUCCESS":
         return {
         ...state,
         loading: false,
         step: "VERIFY_OTP",
         phoneNumber: action.payload.phoneNumber,
         otp: action.payload.otp,
         error: null,
         };
      case "VERIFY_OTP_SUCCESS":
         return {
         ...state,
         loading: false,
         step: "AUTHENTICATED",
         customerId: action.payload.customerId,
         customerGUID: action.payload.customerGUID,
         token: action.payload.token,
         AuthLoggedIn:true,
         error: null,
         };
      case "AUTH_ERROR":
         return {
         ...state,
         loading: false,
         error: action.payload,
         };
      case "PROFILE_DATA":
         return {
         ...state,
         profileData: action.payload,
         loading:false
         };
      case "LOGOUT":
         return {
         step: "SEND_OTP",
         phoneNumber: "",
         otp: "",
         loading: false,
         error: null,
         customerId: "",
         customerGUID: "",
         AuthLoggedIn:"",
         token: null,
         };
      case "SHIPPING_ADDRESS_DATA":
         return{
            ...state,
            ShippingAddress:action.payload.data,
            loading: false,
         }
   
      default:
   }
   return  state;
}

export default Reducer;