import React from "react";
import StaffItem from "../items/StaffItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";

export default function StaffListLeft(props) {
  const staffList = props.staffList;
  return (
    <BodyContentLeft data={staffList}>
      <div className="content-left-current">
        <LeftSection title="교사">
          {staffList.map((staff, index) => {
            return <StaffItem {...props} key={index} staffData={staff} />;
          })}
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
