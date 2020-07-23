import React from "react";
import BlockView from "../BlockView";
import BlockListView from "../BlockListView";
import Edit from "../crud/Edit";

export default function StaffProfile(props) {
  const staffData = props.staffData;
  const data =
    staffData !== undefined
      ? {
          general: [
            { key: "성명", value: staffData.name },
            { key: "영문성명", value: staffData.englishName },
            { key: "생년월일", value: staffData.birthDate },
            { key: "성별", value: staffData.gender },
            {
              key: "주민번호",
              value: `${staffData.documentType} ${staffData.documentID}`,
            },
            { key: "직업", value: staffData.ocupation },
            {
              key: "비고",
              value: staffData.comment ? staffData.comment : "없음",
            },
            { key: "등록날짜", value: staffData.registerDate },
          ],
          contact: [
            { key: "핸드폰 번호", value: staffData.phoneNumber },
            { key: "이메일", value: staffData.email },
          ],
        }
      : undefined;
  console.log(props);
  return (
    <React.Fragment>
      <Edit label="수정하기" {...props} />
      <BlockView title="기본사항">
        <BlockListView items={data.general} />
      </BlockView>
      <BlockView title="연락처">
        <BlockListView items={data.contact} />
      </BlockView>
    </React.Fragment>
  );
}
