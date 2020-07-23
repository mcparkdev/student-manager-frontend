import React from "react";
// import PeriodListCurrentItem from "./PeriodListCurrentItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";
import CourseItem from "../items/CourseItem";

export default function CurrentListLeft(props) {
  console.log(props.courseList);
  return (
    <BodyContentLeft data={props.courseList}>
      <div className="content-left-current">
        <LeftSection title="현황">
          {props.courseList
            .sort((a, b) => a.name - b.name)
            .map((course, index) => {
              return <CourseItem {...props} key={index} courseData={course} />;
            })}
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
