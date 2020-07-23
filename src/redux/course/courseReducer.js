import * as types from "./courseTypes";

const initialState = {
  loadingPOST: false,
  loadingGET: false,
  loadingPUT: false,
  loadingDELETE: false,
  courseData: {},
  courseList: [],
  error: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COURSE_REQUEST_POST:
      return {
        ...state,
        loadingPOST: true,
      };
    case types.FETCH_COURSE_SUCCESS_POST:
      return {
        ...state,
        loadingPOST: false,
        courseData: action.payload.courseData,
      };
    case types.FETCH_COURSE_ERROR_POST:
      return {
        ...state,
        loadingPOST: false,
        error: action.payload,
      };

    case types.FETCH_COURSE_REQUEST_PUT:
      return {
        ...state,
        loadingPUT: true,
      };
    case types.FETCH_COURSE_SUCCESS_PUT:
      return {
        ...state,
        loadingPUT: false,
        courseData: action.payload.courseData,
      };
    case types.FETCH_COURSE_ERROR_PUT:
      return {
        ...state,
        loadingPUT: false,
        error: action.payload,
      };

    case types.FETCH_COURSE_REQUEST_DELETE:
      return {
        ...state,
        loadingDELETE: true,
      };
    case types.FETCH_COURSE_SUCCESS_DELETE:
      return {
        ...state,
        loadingDELETE: false,
      };
    case types.FETCH_COURSE_ERROR_DELETE:
      return {
        ...state,
        loadingDELETE: false,
        error: action.payload,
      };

    case types.FETCH_COURSE_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_COURSE_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        courseData: action.payload.courseData,
      };
    case types.FETCH_COURSE_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    case types.FETCH_COURSELIST_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_COURSELIST_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        courseList: action.payload.courseList,
      };
    case types.FETCH_COURSELIST_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default courseReducer;
