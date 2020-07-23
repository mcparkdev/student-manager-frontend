import axios from "axios";
import * as types from "./staffTypes";
import { server } from "../store";
// const server = "192.168.0.17:8000";
// const server = "192.168.0.11:8000";

export const getStaff = (staffID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFF_REQUEST_GET });
  axios
    .get(`http://${server}/api/staffsGet/?id=${staffID}`)
    .then((res) => {
      dispatch({
        type: types.FETCH_STAFF_SUCCESS_GET,
        payload: { staffData: res.data[0] },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFF_ERROR_GET,
        payload: err,
      });
    });
};

export const getStaffByStudent = (studentID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFF_REQUEST_GET });
  axios
    .get(`http://${server}/api/studentsGet/?studentID=${studentID}`)
    .then((res) => {
      const studentData = res.data[0];
      const courseID = studentData.course[0].id;
      axios
        .get(`http://${server}/api/staffsGet/?course__id=${courseID}`)
        .then((res) => {
          const staffData = res.data[0];
          dispatch({
            type: types.FETCH_STAFF_SUCCESS_GET,
            payload: { staffData },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_STAFF_ERROR_GET,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFF_ERROR_GET,
        payload: err,
      });
    });
};

export const getStaffByCourse = (courseID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFF_REQUEST_GET });
  axios
    .get(`http://${server}/api/staffsGet/?course__id=${courseID}`)
    .then((res) => {
      const staffData = res.data[0];

      dispatch({
        type: types.FETCH_STAFF_SUCCESS_GET,
        payload: { staffData },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFF_ERROR_GET,
        payload: err,
      });
    });
};

export const getStaffListByPeriod = (periodID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFFLIST_REQUEST_GET });
  axios
    .get(`http://${server}/api/staffsGet/?course__period__id=${periodID}`)
    .then((res) => {
      const staffList = res.data
        .map((staff) => {
          return {
            ...staff,
            registerDateSort: new Date(staff.registerDate),
          };
        })
        .sort((a, b) => b.registerDateSort - a.registerDateSort);
      dispatch({
        type: types.FETCH_STAFFLIST_SUCCESS_GET,
        payload: { staffList },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFFLIST_ERROR_GET,
        payload: err,
      });
    });
};

export const getStaffList = () => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFF_REQUEST_GET });
  axios
    .get(`http://${server}/api/staffsGet/`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: types.FETCH_STAFFLIST_SUCCESS_GET,
        payload: { staffList: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFFLIST_ERROR_GET,
        payload: err,
      });
    });
};

export const postStaff = (newStaffData) => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFF_REQUEST_POST });
  // console.log(newStaffData);
  axios
    .post(`http://${server}/api/staffs/`, JSON.stringify(newStaffData), {
      headers: {
        //   "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    })
    .then((responsePOST) => {
      axios
        .get(`http://${server}/api/staffsGet/${responsePOST.data.id}`)
        .then((responseGET) => {
          dispatch({
            type: types.FETCH_STAFF_SUCCESS_POST,
            payload: { staffData: responseGET.data },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_STAFF_ERROR_POST,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFF_ERROR_POST,
        payload: err,
      });
    });
};

export const putStaff = (editedStaffData, staffID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFF_REQUEST_PUT });

  axios
    .put(
      `http://${server}/api/staffs/${staffID}/`,
      JSON.stringify(editedStaffData),
      {
        headers: {
          "Content-Type": "application/json",
        },
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }
    )
    .then((res) => {
      dispatch({
        type: types.FETCH_STAFF_SUCCESS_PUT,
        payload: { staffData: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFF_ERROR_PUT,
        payload: err,
      });
    });
};

export const deleteStaff = (staffID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STAFF_REQUEST_DELETE });

  axios
    .delete(`http://${server}/api/staffs/${staffID}/`)
    .then((res) => {
      dispatch({
        type: types.FETCH_STAFF_SUCCESS_DELETE,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STAFF_ERROR_DELETE,
        payload: err,
      });
    });
};
