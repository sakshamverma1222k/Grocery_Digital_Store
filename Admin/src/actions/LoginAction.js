import { userConstants } from "./actionTypes";
import {
  loginUser,
  loginSeller,
} from "../services/API";
import { AsyncStorage } from "react";
import { useHistory } from "react-router-dom";

export const loginActions = {
  loginUserAction,
  getTokenAction,
  removeTokenAction,
  loginSellerAction,
};

function loginUserAction(user: any, navigation) {
  return (dispatch) => {
    dispatch(request(user));
    loginUser(user).then(
      (data) => {
        console.log(data.data.data);
        //AsyncStorage.setItem('token', data.data.accessToken);
        //history.push('/someRoute')
        localStorage.setItem("token", data.data.data.updateDate);
        dispatch(success(data.data.data));
      },
      (error) => {
        dispatch(failure(error));
        //dispatch(alertActions.error('Please enter correct Username/Password'));
      }
    );
  };

  function request(user: any) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user: any) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error: any) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function loginSellerAction(seller: any, navigation) {
  return (dispatch) => {
    dispatch(request(seller));
    loginSeller(seller)
      .then((data) => {
        console.log(data.data.data);
        localStorage.setItem("token",JSON.stringify(data.data.data));
        dispatch(success(data.data.data));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(seller: any) {
    return { type: userConstants.LOGIN_REQUEST, seller };
  }
  function success(seller: any) {
    return { type: userConstants.LOGIN_SUCCESS, seller };
  }
  function failure(error: any) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function getTokenAction() {
  return (dispatch) => {
    AsyncStorage.getItem("token")
      .then((data) => {
        console.log("got the token " + data);
        dispatch(restore(data));
      })
      .catch((err) => {
        dispatch(failure(err.message || "ERROR"));
      });
  };
  function restore(token: any) {
    return { type: userConstants.TOKEN_RESTORE, token };
  }
  function failure(error: any) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function removeTokenAction(navigation) {
  return (dispatch) => {
    AsyncStorage.removeItem("token")
      .then((data) => {
        console.log("got the token " + data);
        dispatch(remove(data));
        //navigation.navigate('Login');
      })
      .catch((err) => {
        dispatch(failure(err.message || "ERROR"));
      });
  };
  function remove(token: any) {
    return { type: userConstants.LOGOUT_REQUEST, token };
  }
  function failure(error: any) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}
