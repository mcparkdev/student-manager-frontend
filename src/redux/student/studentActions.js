import axios from "axios";
import * as types from "./studentTypes";
import { server } from "../store";
// const server = "192.168.0.17:8000";
// const server = "192.168.0.11:8000";

export const getStudent = (studentID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENT_REQUEST_GET });
  axios
    .get(`http://${server}/api/studentsGet/${studentID}`)
    .then((res) => {
      const studentData = res.data[0];
      dispatch({
        type: types.FETCH_STUDENT_SUCCESS_GET,
        payload: { studentData },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENT_ERROR_GET,
        payload: err,
      });
    });
};

export const getStudentList = () => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENT_REQUEST_GET });
  axios
    .get(`http://${server}/api/studentsGet/`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: types.FETCH_STUDENTLIST_SUCCESS_GET,
        payload: { studentList: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENTLIST_ERROR_GET,
        payload: err,
      });
    });
};

export const getStudentListByStaff = (staffID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENTLIST_REQUEST_GET });
  axios
    .get(`http://${server}/api/staffsGet/${staffID}`)
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
      const courseID = course.id;
      axios
        .get(`http://${server}/api/studentsGet/?course__id=${courseID}`)
        .then((res) => {
          const studentList = res.data;
          dispatch({
            type: types.FETCH_STUDENTLIST_SUCCESS_GET,
            payload: { studentList },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_STUDENTLIST_ERROR_GET,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENTLIST_ERROR_GET,
        payload: err,
      });
    });
};

export const getStudentListByPeriod = (periodID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENTLIST_REQUEST_GET });
  axios
    .get(`http://${server}/api/studentsGet/?course__period__id=${periodID}`)
    .then((res) => {
      const studentList = res.data;
      dispatch({
        type: types.FETCH_STUDENTLIST_SUCCESS_GET,
        payload: { studentList },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENTLIST_ERROR_GET,
        payload: err,
      });
    });
};

export const getStudentListByCourse = (courseID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENTLIST_REQUEST_GET });

  axios
    .get(`http://${server}/api/studentsGet/?course__id=${courseID}`)
    .then((res) => {
      const studentList = res.data;
      dispatch({
        type: types.FETCH_STUDENTLIST_SUCCESS_GET,
        payload: { studentList },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENTLIST_ERROR_GET,
        payload: err,
      });
    });
};

export const postStudent = (newStudentData) => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENT_REQUEST_POST });

  axios
    .post(`http://${server}/api/students/`, JSON.stringify(newStudentData), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((responsePOST) => {
      axios
        .get(`http://${server}/api/studentsGet/${responsePOST.data.id}`)
        .then((responseGET) => {
          dispatch({
            type: types.FETCH_STUDENT_SUCCESS_POST,
            payload: { studentData: responseGET.data },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_STUDENT_ERROR_POST,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENT_ERROR_POST,
        payload: err,
      });
    });
};

export const putStudent = (editedStudentData, studentID) => async (
  dispatch
) => {
  dispatch({ type: types.FETCH_STUDENT_REQUEST_PUT });

  axios
    .put(
      `http://${server}/api/students/${studentID}/`,
      JSON.stringify(editedStudentData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.FETCH_STUDENT_SUCCESS_PUT,
        payload: { studentData: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENT_ERROR_PUT,
        payload: err,
      });
    });
};

export const deleteStudent = (studentID) => async (dispatch) => {
  dispatch({ type: types.FETCH_STUDENT_REQUEST_DELETE });

  axios
    .delete(`http://${server}/api/students/${studentID}/`)
    .then((res) => {
      dispatch({
        type: types.FETCH_STUDENT_SUCCESS_DELETE,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_STUDENT_ERROR_DELETE,
        payload: err,
      });
    });
};
