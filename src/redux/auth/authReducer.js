import * as types from "./authTypes";
// import {updateObject} from "../utility"

const initialState = {
  token: null,
  error: null,
  loading: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return {
        loading: true,
      };
    case types.AUTH_SUCCESS:
      return {
        loading: false,
        token: action.token,
        error: null,
      };
    case types.AUTH_ERROR:
      return {
        loading: false,
        error: action.error,
      };
    case types.AUTH_LOGOUT:
      return {
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
