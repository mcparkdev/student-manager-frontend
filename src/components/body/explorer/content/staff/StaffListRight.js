import React from "react";

import BlockView from "../BlockView";
import StaffTable from "./StaffTable";
import { ClockCircleOutlined, BookOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ListRight from "../ListRight";
const { TabPane } = Tabs;

export default function StaffListRight(props) {
  return (
    <ListRight
      {...props}
      data={props.currentStaffList}
      name="강사"
      nameCounter="명"
      isList={true}
    >
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
              <BookOutlined />
              전체 기록
            </span>
          }
          key="2"
        >
          <BlockView title="강사명단">
            <StaffTable {...props} />
          </BlockView>
        </TabPane>
      </Tabs>
    </ListRight>
  );
}
