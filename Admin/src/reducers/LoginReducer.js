import { userConstants } from "../actions/actionTypes";

const initialState = {
  userData: {},
  loading: false,
  isSignout: false,
  userToken: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      console.log(action.seller);
      return {
        ...state,
        userData: action.user,
        loading: false,
        showOtp: true,
        userToken: action.seller.accessToken,
      };

    case userConstants.TOKEN_RESTORE:
      console.log(action.seller);
      return {
        ...state,
        userData: state.userData,
        userToken: action.token,
      };

    case userConstants.LOGOUT_REQUEST:
      return {
        ...state,
        userData: "",
        loading: false,
        showOtp: true,
        userToken: "",
      };

    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}