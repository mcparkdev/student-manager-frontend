import React from "react";
import { Route, Switch } from "react-router-dom";
import Student from "./content/student/Student";
import StudentList from "./content/student/StudentList";
import Staff from "./content/staff/Staff";
import StaffList from "./content/staff/StaffList";
import Course from "./content/course/Course";
import CourseList from "./content/course/CourseList";
import Period from "./content/period/Period";
import PeriodList from "./content/period/PeriodList";
// import { Skeleton } from "antd";

// import ItemHooks from "./components/items/ItemHooks";
// history
// location
// staticContext
// match

const BaseRouter = (props) => (
  <React.Fragment>
    <Switch>
      <Route
        exact
        path="/students"
        render={({ match, history }) => (
          <StudentList {...props} match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/students/:studentID"
        render={({ match, history }) => (
          <Student {...props} match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/staffs"
        render={({ match, history }) => (
          <StaffList {...props} match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/staffs/:staffID"
        render={({ match, history }) => (
          <Staff {...props} match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/courses"
        render={({ match, history }) => (
          <CourseList {...props} match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/courses/:courseID"
        render={({ match, history }) => (
          <Course {...props} match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/periods"
        render={({ match, history }) => (
          <PeriodList {...props} match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/periods/:periodID"
        render={({ match, history }) => (
          <Period {...props} match={match} history={history} />
        )}
      />
    </Switch>
  </React.Fragment>
);

export default BaseRouter;
