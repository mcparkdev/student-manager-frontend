export const givePeriod = (periodID) => {
  return this.props.periodList !== undefined
    ? this.props.periodList.filter((period) => periodID === period.id)[0]
    : {};
};
export const giveCourseListByPeriod = (periodID) => {
  return this.props.courseList !== undefined
    ? this.props.courseList.filter((course) => periodID === course.period.id)
    : [];
};
export const giveStaffListByPeriod = (periodID) => {
  return this.props.staffList !== undefined
    ? this.props.staffList.filter((staff) => {
        return (
          staff.course.filter((course) => {
            return course.period.id === periodID;
          }).length > 0
        );
      })
    : [];
};
export const giveStudentListByPeriod = (periodID) => {
  return this.props.studentList !== undefined
    ? this.props.studentList.filter((student) => {
        return (
          student.course.filter((course) => {
            return course.period.id === periodID;
          }).length > 0
        );
      })
    : [];
};
