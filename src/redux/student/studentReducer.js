import * as types from "./studentTypes";

const initialState = {
  loadingPOST: false,
  loadingGET: false,
  loadingPUT: false,
  loadingDELETE: false,
  loadingPATCH: false,
  studentData: {},
  studentList: [],
  error: {},
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STUDENT_REQUEST_DELETE:
      return {
        ...state,
        loadingDELETE: true,
      };
    case types.FETCH_STUDENT_SUCCESS_DELETE:
      return {
        ...state,
        loadingDELETE: false,
      };
    case types.FETCH_STUDENT_ERROR_DELETE:
      return {
        ...state,
        loadingDELETE: false,
        error: action.payload,
      };

    case types.FETCH_STUDENT_REQUEST_POST:
      return {
        ...state,
        loadingPOST: true,
      };
    case types.FETCH_STUDENT_SUCCESS_POST:
      return {
        ...state,
        loadingPOST: false,
        studentData: action.payload.studentData,
      };
    case types.FETCH_STUDENT_ERROR_POST:
      return {
        ...state,
        loadingPOST: false,
        error: action.payload,
      };

    case types.FETCH_STUDENT_REQUEST_PATCH:
      return {
        ...state,
        loadingPATCH: true,
      };
    case types.FETCH_STUDENT_SUCCESS_PATCH:
      return {
        ...state,
        loadingPATCH: false,
        studentData: action.payload.studentData,
      };
    case types.FETCH_STUDENT_ERROR_PATCH:
      return {
        ...state,
        loadingPATCH: false,
        error: action.payload,
      };

    case types.FETCH_STUDENT_REQUEST_PUT:
      return {
        ...state,
        loadingPUT: true,
      };
    case types.FETCH_STUDENT_SUCCESS_PUT:
      return {
        ...state,
        loadingPUT: false,
        studentData: action.payload.studentData,
      };
    case types.FETCH_STUDENT_ERROR_PUT:
      return {
        ...state,
        loadingPUT: false,
        error: action.payload,
      };

    case types.FETCH_STUDENT_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_STUDENT_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        studentData: action.payload.studentData,
      };
    case types.FETCH_STUDENT_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    case types.FETCH_STUDENTLIST_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_STUDENTLIST_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        studentList: action.payload.studentList,
      };
    case types.FETCH_STUDENTLIST_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default studentReducer;
