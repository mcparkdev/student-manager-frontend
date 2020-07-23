import axios from "axios";
import * as types from "./courseTypes";
import { server } from "../store";
// const server = "192.168.0.17:8000";
// const server = "192.168.0.11:8000";

export const getCourseList = () => async (dispatch) => {
  // console.log("normal course list request");
  dispatch({ type: types.FETCH_COURSE_REQUEST_GET });

  axios
    .get(`http://${server}/api/coursesGet/`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: types.FETCH_COURSELIST_SUCCESS_GET,
        payload: { courseList: res.data },
      });
      // console.log("normal course list success");
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSELIST_ERROR_GET,
        payload: err,
      });
    });
};

export const getCourse = (courseID) => async (dispatch) => {
  dispatch({ type: types.FETCH_COURSE_REQUEST_GET });
  axios
    .get(`http://${server}/api/coursesGet/?id=${courseID}`)
    .then((res) => {
      const courseData = res.data[0];
      dispatch({
        type: types.FETCH_COURSE_SUCCESS_GET,
        payload: { courseData },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSE_ERROR_GET,
        payload: err,
      });
    });
};

export const getCourseByStudent = (studentID) => async (dispatch) => {
  dispatch({ type: types.FETCH_COURSE_REQUEST_GET });
  axios
    .get(`http://${server}/api/studentsGet/?studentID=${studentID}`)
    .then((res) => {
      const studentData = res.data[0];
      const courseID = studentData.course[0].id;
      axios
        .get(`http://${server}/api/coursesGet/?id=${courseID}`)
        .then((res) => {
          const courseData = res.data[0];
          dispatch({
            type: types.FETCH_COURSE_SUCCESS_GET,
            payload: { courseData },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_COURSE_ERROR_GET,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSE_ERROR_GET,
        payload: err,
      });
    });
};

export const getCourseByStaff = (staffID) => async (dispatch) => {
  dispatch({ type: types.FETCH_COURSE_REQUEST_GET });
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
        .get(`http://${server}/api/coursesGet/${courseID}`)
        .then((res) => {
          const courseData = res.data;
          dispatch({
            type: types.FETCH_COURSE_SUCCESS_GET,
            payload: { courseData },
          });
        })
        .catch((err) => {
          dispatch({
            type: types.FETCH_COURSE_ERROR_GET,
            payload: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSE_ERROR_GET,
        payload: err,
      });
    });
};

export const getCourseListByPeriod = (periodID) => async (dispatch) => {
  // console.log("courseList by period requested");
  dispatch({ type: types.FETCH_COURSELIST_REQUEST_GET });
  axios
    .get(`http://${server}/api/coursesGet/?period__id=${periodID}`)
    .then((res) => {
      const courseList = res.data
        .map((course) => {
          return {
            ...course,
            startDate: new Date(course.period.startDate),
          };
        })
        .sort((a, b) => b.startDate - a.startDate);
      console.log("courseList by period success");
      dispatch({
        type: types.FETCH_COURSELIST_SUCCESS_GET,
        payload: { courseList },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSELIST_ERROR_GET,
        payload: err,
      });
    });
};

export const postCourse = (newCourseData) => async (dispatch) => {
  dispatch({ type: types.FETCH_COURSE_REQUEST_POST });

  axios
    .post(`http://${server}/api/courses/`, JSON.stringify(newCourseData), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch({
        type: types.FETCH_COURSE_SUCCESS_POST,
        payload: { courseData: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSE_ERROR_POST,
        payload: err,
      });
    });
};

export const putCourse = (editedCourseData, courseID) => async (dispatch) => {
  dispatch({ type: types.FETCH_COURSE_REQUEST_PUT });

  axios
    .put(
      `http://${server}/api/courses/${courseID}/`,
      JSON.stringify(editedCourseData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.FETCH_COURSE_SUCCESS_PUT,
        payload: { courseData: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSE_ERROR_PUT,
        payload: err,
      });
    });
};

export const deleteCourse = (courseID) => async (dispatch) => {
  dispatch({ type: types.FETCH_COURSE_REQUEST_DELETE });

  axios
    .delete(`http://${server}/api/courses/${courseID}/`)
    .then((res) => {
      dispatch({
        type: types.FETCH_COURSE_SUCCESS_DELETE,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_COURSE_ERROR_DELETE,
        payload: err,
      });
    });
};
