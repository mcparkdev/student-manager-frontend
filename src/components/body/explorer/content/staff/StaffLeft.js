import React from "react";
import CourseItem from "../items/CourseItem";
import StudentItem from "../items/StudentItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";

export default function StaffLeft(props) {
  const profileImage = props.staffData.profileImage;
  const courseList = props.currentCourseList;
  console.log(props);
  return (
    <BodyContentLeft data={courseList} profileImage={profileImage}>
      <div className="content-left-current">
        <LeftSection title="강의">
          {courseList.map((course, index) => {
            return (
              <CourseItem
                key={index}
                studentList={course.studentList}
                courseData={course}
              />
            );
          })}
        </LeftSection>
        <LeftSection title="학생">
          {courseList.map((course, index) => {
            return course.studentList.map((student) => {
              return (
                <StudentItem
                  key={index}
                  studentData={student}
                  courseData={course}
                />
              );
            });
          })}
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
