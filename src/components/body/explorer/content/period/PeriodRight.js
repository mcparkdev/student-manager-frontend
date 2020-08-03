import React from "react";
import {
  ClockCircleOutlined,
  BookOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import ListRight from "../ListRight";
import PeriodProfile from "./PeriodProfile";
// import moment from "moment";
// import Create from "../crud/Create";
// import Delete from "../crud/Delete";
const { TabPane } = Tabs;

export default function StaffRight(props) {
  const period = props.periodData;
  const data = {
    ...period,
    periodRange: `${new Date(period.startDate).getUTCMonth() + 1}.${new Date(
      period.startDate
    ).getUTCDate()}~
    ${new Date(period.endDate).getUTCMonth() + 1}.${new Date(
      period.endDate
    ).getUTCDate()}`,
    totalCourses: props.courseList.length,
    totalStaffs: props.staffList.length,
    totalStudents: props.studentList.length,
  };

  return (
    <ListRight {...props} data={data} isPeriod={true}>
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
          <PeriodProfile {...props} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FundProjectionScreenOutlined />
              수업
            </span>
          }
          key="3"
        >
          <div className="staff-courses">수업</div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <FundProjectionScreenOutlined />
              교사
            </span>
          }
          key="4"
        >
          <div className="staff-courses">교사</div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <FundProjectionScreenOutlined />
              학생
            </span>
          }
          key="5"
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
          key="6"
        >
          전체 기록
        </TabPane>
      </Tabs>
    </ListRight>
  );
}
