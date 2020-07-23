import * as types from "./staffTypes";

const initialState = {
  loadingPOST: false,
  loadingGET: false,
  loadingPUT: false,
  loadingDELETE: false,
  loadingPATCH: false,
  staffData: {},
  staffList: [],
  error: {},
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STAFF_REQUEST_POST:
      return {
        ...state,
        loadingPOST: true,
      };
    case types.FETCH_STAFF_SUCCESS_POST:
      return {
        ...state,
        loadingPOST: false,
        staffData: action.payload.staffData,
      };
    case types.FETCH_STAFF_ERROR_POST:
      return {
        ...state,
        loadingPOST: false,
        error: action.payload,
      };

    case types.FETCH_STAFF_REQUEST_PATCH:
      return {
        ...state,
        loadingPATCH: true,
      };
    case types.FETCH_STAFF_SUCCESS_PATCH:
      return {
        ...state,
        loadingPATCH: false,
        staffData: action.payload.staffData,
      };
    case types.FETCH_STAFF_ERROR_PATCH:
      return {
        ...state,
        loadingPATCH: false,
        error: action.payload,
      };

    case types.FETCH_STAFF_REQUEST_PUT:
      return {
        ...state,
        loadingPUT: true,
      };
    case types.FETCH_STAFF_SUCCESS_PUT:
      return {
        ...state,
        loadingPUT: false,
        staffData: action.payload.staffData,
      };
    case types.FETCH_STAFF_ERROR_PUT:
      return {
        ...state,
        loadingPUT: false,
        error: action.payload,
      };

    case types.FETCH_STAFF_REQUEST_DELETE:
      return {
        ...state,
        loadingDELETE: true,
      };
    case types.FETCH_STAFF_SUCCESS_DELETE:
      return {
        ...state,
        loadingDELETE: false,
      };
    case types.FETCH_STAFF_ERROR_DELETE:
      return {
        ...state,
        loadingDELETE: false,
        error: action.payload,
      };

    case types.FETCH_STAFF_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_STAFF_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        staffData: action.payload.staffData,
      };
    case types.FETCH_STAFF_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    case types.FETCH_STAFFLIST_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_STAFFLIST_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        staffList: action.payload.staffList,
      };
    case types.FETCH_STAFFLIST_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default staffReducer;
