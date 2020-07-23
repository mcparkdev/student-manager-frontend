import React from "react";
import BlockView from "../BlockView";
import BlockListView from "../BlockListView";
import Edit from "../crud/Edit";

export default function PeriodProfile(props) {
  const periodData = props.periodData;
  const data =
    periodData !== undefined
      ? {
          general: [
            { key: "학기명", value: periodData.name },
            {
              key: "학기기간",
              value: `${new Date(periodData.startDate).getUTCMonth() + 1}.
              ${new Date(periodData.startDate).getUTCDate()}
              ~${new Date(periodData.endDate).getUTCMonth() + 1}.${new Date(
                periodData.endDate
              ).getUTCDate()}`,
            },
            {
              key: "비고",
              value: periodData.comment ? periodData.comment : "없음",
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
