import React, { Component } from "react";
import ExplorerSide from "./ExplorerSide";
import ExplorerContent from "./ExplorerContent";

import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getStudent,
  postStudent,
  putStudent,
  deleteStudent,
  getStudentList,
} from "../../../redux/student/studentActions";
import {
  getStaff,
  postStaff,
  putStaff,
  deleteStaff,
  getStaffList,
} from "../../../redux/staff/staffActions";
import {
  getCourse,
  postCourse,
  putCourse,
  deleteCourse,
  getCourseList,
} from "../../../redux/course/courseActions";
import {
  getPeriod,
  postPeriod,
  putPeriod,
  deletePeriod,
  getPeriodList,
} from "../../../redux/period/periodActions";

// import Draggable from "react-draggable";

class Explorer extends Component {
  static propTypes = {
    loadingStudentGET: PropTypes.bool.isRequired,
    loadingStudentPOST: PropTypes.bool.isRequired,
    loadingStudentPUT: PropTypes.bool.isRequired,
    loadingStudentDELETE: PropTypes.bool.isRequired,
    loadingCourseGET: PropTypes.bool.isRequired,
    loadingCoursePOST: PropTypes.bool.isRequired,
    loadingCoursePUT: PropTypes.bool.isRequired,
    loadingCourseDELETE: PropTypes.bool.isRequired,
    loadingStaffGET: PropTypes.bool.isRequired,
    loadingStaffPOST: PropTypes.bool.isRequired,
    loadingStaffPUT: PropTypes.bool.isRequired,
    loadingStaffDELETE: PropTypes.bool.isRequired,
    loadingPeriodGET: PropTypes.bool.isRequired,
    loadingPeriodPOST: PropTypes.bool.isRequired,
    loadingPeriodPUT: PropTypes.bool.isRequired,
    loadingPeriodDELETE: PropTypes.bool.isRequired,

    studentData: PropTypes.object.isRequired,
    studentList: PropTypes.array.isRequired,
    staffData: PropTypes.object.isRequired,
    staffList: PropTypes.array.isRequired,
    courseData: PropTypes.object.isRequired,
    courseList: PropTypes.array.isRequired,
    periodData: PropTypes.object.isRequired,
    periodList: PropTypes.array.isRequired,

    studentError: PropTypes.object,
    staffError: PropTypes.object,
    courseError: PropTypes.object,
    periodError: PropTypes.object,
  };

  resetList = () => {
    this.props.getStudentList();
    this.props.getStaffList();
    this.props.getCourseList();
    this.props.getPeriodList();
  };

  componentDidMount() {
    this.resetList();
  }

  render() {
    return (
      // <Draggable bounds="parent" disabled={false}>
      <div className="explorer">
        <Route
          path="/"
          render={({ match, history }) => (
            <ExplorerSide {...this.props} match={match} history={history} />
          )}
        />
        <Route
          path="/"
          render={({ match, history }) => (
            <ExplorerContent
              {...this.props}
              match={match}
              history={history}
              resetList={this.resetList}
            />
          )}
        />
      </div>
      // </Draggable>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingStudentGET: state.student.loadingGET,
  loadingStudentPOST: state.student.loadingPOST,
  loadingStudentPUT: state.student.loadingPUT,
  loadingStudentDELETE: state.student.loadingDELETE,
  studentData: state.student.studentData,
  studentList: state.student.studentList,
  studentError: state.student.error,

  loadingStaffGET: state.staff.loadingGET,
  loadingStaffPOST: state.staff.loadingPOST,
  loadingStaffPUT: state.staff.loadingPUT,
  loadingStaffDELETE: state.staff.loadingDELETE,
  staffData: state.staff.staffData,
  staffList: state.staff.staffList,
  staffError: state.staff.error,

  loadingCourseGET: state.course.loadingGET,
  loadingCoursePOST: state.course.loadingPOST,
  loadingCoursePUT: state.course.loadingPUT,
  loadingCourseDELETE: state.course.loadingDELETE,
  courseData: state.course.courseData,
  courseList: state.course.courseList,
  courseError: state.course.error,

  loadingPeriodGET: state.period.loadingGET,
  loadingPeriodPOST: state.period.loadingPOST,
  loadingPeriodPUT: state.period.loadingPUT,
  loadingPeriodDELETE: state.period.loadingPOST,
  periodData: state.period.periodData,
  periodList: state.period.periodList,
  periodError: state.period.error,
});

export default connect(mapStateToProps, {
  getStudent,
  postStudent,
  putStudent,
  deleteStudent,
  getStudentList,

  getStaff,
  postStaff,
  putStaff,
  deleteStaff,
  getStaffList,

  getCourse,
  postCourse,
  putCourse,
  deleteCourse,
  getCourseList,

  getPeriod,
  postPeriod,
  putPeriod,
  deletePeriod,
  getPeriodList,
})(Explorer);
