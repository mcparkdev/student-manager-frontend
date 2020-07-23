import axios from "axios";
import * as actionTypes from "./authTypes";
// import * as types from "./courseTypes";
import { server } from "../store";
// const server = "192.168.0.17:8000";
// const server = "192.168.0.11:8000";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  console.log(token);
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
  };
};

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => async (dispatch) => {
  return setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const authLogin = (username, password) => async (dispatch) => {
  dispatch(authStart());
  axios
    .post(`http://${server}/rest-auth/login/`, { username, password })
    .then((res) => {
      const token = res.data.key;
      console.log(token);
      const expirationDate = new Date(new Date().getTime() + 7200 * 1000);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationDate", expirationDate);
      dispatch(authSuccess(token));
      dispatch(checkAuthTimeout(3600));
    })
    .catch((err) => {
      dispatch(authError(err));
    });
};

export const authCheckState = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token === undefined) dispatch(logout());
  else {
    const expirationDate = new Date(localStorage.getItem("expirationDatae"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
