import React from "react";
import BlockView from "../BlockView";
import BlockListView from "../BlockListView";
import Edit from "../crud/Edit";

export default function StudentProfile(props) {
  const student = props.studentData;
  const data =
    student !== undefined
      ? {
          general: [
            { key: "이름", value: student.firstName },
            { key: "성", value: student.lastName },
            { key: "생년월일", value: student.birthDate },
            { key: "성별", value: student.gender },
            {
              key: "주민번호",
              value: `${student.documentType} ${student.documentID}`,
            },
            { key: "집주소", value: student.address },
            { key: "직업", value: student.ocupation },

            { key: "학생 ID", value: student.studentID },
            { key: "납부", value: student.payedCourse, payTag: true },
          ],
          contact: [
            { key: "핸드폰 번호", value: student.phoneNumber },
            { key: "이메일", value: student.email },
          ],
          guardian: [
            { key: "이름", value: student.guardianFirstName },
            { key: "성", value: student.guardianLastName },
            { key: "관계", value: student.guardianRelationship },
            { key: "연락처", value: student.guardianPhoneNumber },
          ],
        }
      : undefined;

  return (
    <React.Fragment>
      <Edit label="수정하기" {...props} />
      <BlockView title="기본사항">
        <BlockListView items={data.general} />
      </BlockView>
      <BlockView title="연락처">
        <BlockListView items={data.contact} />
      </BlockView>
      <BlockView title="보호자">
        <BlockListView items={data.guardian} />
      </BlockView>
    </React.Fragment>
  );
}
