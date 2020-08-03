import React from "react";
import {
  ClockCircleOutlined,
  BookOutlined,
  UserOutlined,
  AuditOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import ListRight from "../ListRight";
import CourseProfile from "./CourseProfile";
// import moment from "moment";
// import Create from "../crud/Create";
// import Delete from "../crud/Delete";
const { TabPane } = Tabs;

export default function CourseRight(props) {
  const course = props.courseData;
  const data = {
    ...course,
    periodName: course.period.name,
    periodRange: `${
      new Date(course.period.startDate).getUTCMonth() + 1
    }.${new Date(course.period.startDate).getUTCDate()}~
    ${new Date(course.period.endDate).getUTCMonth() + 1}.${new Date(
      course.period.endDate
    ).getUTCDate()}`,
    totalStaffs: course.staffList.length,
    totalStudents: course.studentList.length,
  };

  return (
    <ListRight {...props} data={data} isCourse={true}>
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <ClockCircleOutlined />
              타임라인
            </span>
          }
          key="1"
        >
          타임라인
        </TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined />
              프로필
            </span>
          }
          key="2"
        >
          <CourseProfile {...props} />
        </TabPane>
        <TabPane
          tab={
            <span>
              {/* <FundProjectionScreenOutlined />
               */}
              <AuditOutlined />
              {/* <i className="fas fa-chalkboard-teacher"/> */}
              교사
            </span>
          }
          key="3"
        >
          <div className="staff-courses">교사</div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <SmileOutlined />
              {/* <i className="fas fa-book-open"></i> */}
              {/* <IconFont type="icon-javascript" /> */}
              학생
            </span>
          }
          key="4"
        >
          <div className="staff-courses">학생</div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <BookOutlined />
              전체 기록
            </span>
          }
          key="5"
        >
          전체 기록
        </TabPane>
      </Tabs>
    </ListRight>
  );
}
