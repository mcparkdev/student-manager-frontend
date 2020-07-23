import React from "react";
import StaffProfile from "./StaffProfile";
import {
  ClockCircleOutlined,
  BookOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import ListRight from "../ListRight";
// import moment from "moment";

const { TabPane } = Tabs;

export default function StaffRight(props) {
  return (
    <ListRight {...props} data={props.staffData} isStaff={true}>
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
          <StaffProfile {...props} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FundProjectionScreenOutlined />
              강의
            </span>
          }
          key="3"
        >
          <div className="staff-courses">가의</div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <BookOutlined />
              전체 기록
            </span>
          }
          key="4"
        >
          전체 기록
        </TabPane>
      </Tabs>
    </ListRight>
  );
}
