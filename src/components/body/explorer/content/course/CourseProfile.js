import React from "react";
import BlockView from "../BlockView";
import BlockListView from "../BlockListView";
import Edit from "../crud/Edit";

export default function CourseProfile(props) {
  const courseData = props.courseData;
  const data =
    courseData !== undefined
      ? {
          general: [
            { key: "강의명", value: courseData.name },
            {
              key: "학기",
              value: `${courseData.period.year}/${courseData.period.name}`,
            },
            {
              key: "강의기간",
              value: `${
                new Date(courseData.period.startDate).getUTCMonth() + 1
              }.
              ${new Date(courseData.period.startDate).getUTCDate()}
              ~${
                new Date(courseData.period.endDate).getUTCMonth() + 1
              }.${new Date(courseData.period.endDate).getUTCDate()}`,
            },
            {
              key: "강의시간",
              value: `${courseData.startTime.substring(
                0,
                courseData.startTime.length - 3
              )}~${courseData.endTime.substring(
                0,
                courseData.endTime.length - 3
              )}`,
            },
            {
              key: "등록금",
              value: courseData.fee,
              number: true,
            },
            {
              key: "강사 활동비",
              value: courseData.salary,
              number: true,
            },
            {
              key: "비고",
              value: courseData.comment ? courseData.comment : "없음",
            },
          ],
        }
      : undefined;
  // console.log(props);
  return (
    <React.Fragment>
      <Edit label="수정하기" {...props} />
      <BlockView title="기본사항">
        <BlockListView items={data.general} />
      </BlockView>
    </React.Fragment>
  );
}
