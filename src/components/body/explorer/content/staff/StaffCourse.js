import React from "react";
import BlockView from "../BlockView";
import BlockListView from "../BlockListView";

export default function StaffCourse(props) {
  let salary = 0;
  let studentNum = 0;
  const courseList = props.courseList;
  const staffData = props.staffData;
  const courseNames = courseList.map((course) => {
    salary += parseInt(course.salary);
    studentNum += parseInt(course.studentList.length);
    return course.name;
  });
  const courseTimes = courseList.map((course) => {
    return `${course.startTime.substring(
      0,
      course.startTime.length - 3
    )}~${course.endTime.substring(0, course.endTime.length - 3)}`;
  });

  const data = (staffData, courseData) => {
    return {
      general: [
        { key: "강의명", value: courseData.birthDate },
        { key: "등록금", value: courseData.birthDate },
        { key: "강사 활동비", value: courseData.englishName },
        { key: "강의시간", value: courseData.birthDate },
        {
          key: "비고",
          value: courseData.comment ? courseData.comment : "없음",
        },
        {
          key: "혹기",
          value: courseData.comment ? courseData.comment : "없음",
        },
      ],
      current: [{ key: "학생 수", value: courseData.birthDate }],
    };
  };

  return (
    <BlockView title="기본사항">
      <BlockListView items={data.general} />
    </BlockView>
  );
}
