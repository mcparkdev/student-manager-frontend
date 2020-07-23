import React from "react";
import PeriodItem from "../items/PeriodItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";

export default function PeriodListLeft(props) {
  return (
    <BodyContentLeft data={props.periodList}>
      <div className="content-left-current">
        <LeftSection title="올해 현황">
          {props.periodList
            .map((period) => {
              return {
                ...period,
                sortDate: new Date(period.startDate),
              };
            })
            .sort((a, b) => b.sortDate - a.sortDate)
            .map((period, index) => {
              const courseList = props.giveCourseListByPeriod(period.id);
              const staffList = props.giveStaffListByPeriod(period.id);
              const studentList = props.giveStudentListByPeriod(period.id);
              return (
                <PeriodItem
                  {...props}
                  key={index}
                  periodData={period}
                  courseList={courseList}
                  staffList={staffList}
                  studentList={studentList}
                />
              );
            })}
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
