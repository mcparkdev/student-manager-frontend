import axios from "axios";
import * as types from "./periodTypes";
import { server } from "../store";
// const server = "192.168.0.17:8000";
// const server = "192.168.0.11:8000";

export const getPeriod = (periodID) => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_GET });
  axios
    .get(`${server}/api/periods/?search=${periodID}`)
    .then((res) => {
      dispatch({
        type: types.FETCH_PERIOD_SUCCESS_GET,
        payload: { periodData: res.data[0] },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIOD_ERROR_GET,
        payload: err,
      });
    });
};

export const getPeriodByStudent = (studentID) => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_GET });
  axios
    .get(`${server}/api/studentsGet/?studentID=${studentID}`)
    .then((res) => {
      const studentData = res.data[0];
      const course = studentData.course
        .map((course) => {
          return {
            ...course,
            startDate: new Date(course.period.startDate),
          };
        })
        .sort((a, b) => b.startDate - a.startDate)[0];
      const periodID = course.period.id;
      axios
        .get(`${server}/api/periods/${periodID}`)
        .then((res) => {
          const periodData = res.data;
          dispatch({
            type: types.FETCH_PERIOD_SUCCESS_GET,
            payload: { periodData },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_PERIOD_ERROR_GET,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIOD_ERROR_GET,
        payload: err,
      });
    });
};

export const getPeriodByStaff = (staffID) => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_GET });
  axios
    .get(`${server}/api/staffsGet/${staffID}`)
    .then((res) => {
      const staffData = res.data;
      const course = staffData.course
        .map((course) => {
          return {
            ...course,
            startDate: new Date(course.period.startDate),
          };
        })
        .sort((a, b) => b.startDate - a.startDate)[0];
      const periodID = course.period.id;
      axios
        .get(`${server}/api/periods/${periodID}`)
        .then((res) => {
          const periodData = res.data;
          dispatch({
            type: types.FETCH_PERIOD_SUCCESS_GET,
            payload: { periodData },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_PERIOD_ERROR_GET,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIOD_ERROR_GET,
        payload: err,
      });
    });
};

export const getPeriodByCourse = (courseID) => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_GET });
  axios
    .get(`${server}/api/coursesGet/${courseID}`)
    .then((res) => {
      const periodData = res.data.period;
      dispatch({
        type: types.FETCH_PERIOD_SUCCESS_GET,
        payload: { periodData },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIOD_ERROR_GET,
        payload: err,
      });
    });
};

export const getPeriodList = () => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_GET });
  axios
    .get(`${server}/api/periods/`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: types.FETCH_PERIODLIST_SUCCESS_GET,
        payload: { periodList: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIODLIST_ERROR_GET,
        payload: err,
      });
    });
};

export const postPeriod = (newPeriodData) => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_POST });

  axios
    .post(`${server}/api/periods/`, JSON.stringify(newPeriodData), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch({
        type: types.FETCH_PERIOD_SUCCESS_POST,
        payload: { periodData: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIOD_ERROR_POST,
        payload: err,
      });
    });
};

export const putPeriod = (editedPeriodData, periodID) => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_PUT });

  axios
    .put(
      `${server}/api/periods/${periodID}/`,
      JSON.stringify(editedPeriodData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.FETCH_PERIOD_SUCCESS_PUT,
        payload: { periodData: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIOD_ERROR_PUT,
        payload: err,
      });
    });
};

export const deletePeriod = (periodID) => async (dispatch) => {
  dispatch({ type: types.FETCH_PERIOD_REQUEST_DELETE });

  axios
    .delete(`${server}/api/periods/${periodID}/`)
    .then((res) => {
      dispatch({
        type: types.FETCH_PERIOD_SUCCESS_DELETE,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_PERIOD_ERROR_DELETE,
        payload: err,
      });
    });
};
