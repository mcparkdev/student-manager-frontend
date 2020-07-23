import * as types from "./periodTypes";

const initialState = {
  loadingPOST: false,
  loadingGET: false,
  loadingPUT: false,
  loadingDELETE: false,
  periodData: {},
  periodList: [],
  error: {},
};

const periodReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PERIOD_REQUEST_POST:
      return {
        ...state,
        loadingPOST: true,
      };
    case types.FETCH_PERIOD_SUCCESS_POST:
      return {
        ...state,
        loadingPOST: false,
        periodData: action.payload.periodData,
      };
    case types.FETCH_PERIOD_ERROR_POST:
      return {
        ...state,
        loadingPOST: false,
        error: action.payload,
      };

    case types.FETCH_PERIOD_REQUEST_PUT:
      return {
        ...state,
        loadingPUT: true,
      };
    case types.FETCH_PERIOD_SUCCESS_PUT:
      return {
        ...state,
        loadingPUT: false,
        periodData: action.payload.periodData,
      };
    case types.FETCH_PERIOD_ERROR_PUT:
      return {
        ...state,
        loadingPUT: false,
        error: action.payload,
      };

    case types.FETCH_PERIOD_REQUEST_DELETE:
      return {
        ...state,
        loadingDELETE: true,
      };
    case types.FETCH_PERIOD_SUCCESS_DELETE:
      return {
        ...state,
        loadingDELETE: false,
      };
    case types.FETCH_PERIOD_ERROR_DELETE:
      return {
        ...state,
        loadingDELETE: false,
        error: action.payload,
      };

    case types.FETCH_PERIOD_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_PERIOD_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        periodData: action.payload.periodData,
      };
    case types.FETCH_PERIOD_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    case types.FETCH_PERIODLIST_REQUEST_GET:
      return {
        ...state,
        loadingGET: true,
      };
    case types.FETCH_PERIODLIST_SUCCESS_GET:
      return {
        ...state,
        loadingGET: false,
        periodList: action.payload.periodList,
      };
    case types.FETCH_PERIODLIST_ERROR_GET:
      return {
        ...state,
        loadingGET: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default periodReducer;
