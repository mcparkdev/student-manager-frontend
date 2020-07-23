import React from "react";
import StudentProfile from "./StudentProfile";
import {
  ClockCircleOutlined,
  BookOutlined,
  UserOutlined,
  // FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import ListRight from "../ListRight";
const { TabPane } = Tabs;

export default function StaffRight(props) {
  return (
    <ListRight {...props} data={props.studentData} isStudent={true}>
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
          <StudentProfile {...props} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <BookOutlined />
              전체 기록
            </span>
          }
          key="3"
        >
          전체 기록
        </TabPane>
      </Tabs>
    </ListRight>
  );
}
