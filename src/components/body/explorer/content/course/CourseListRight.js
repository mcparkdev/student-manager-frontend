import React from "react";
import CourseTable from "./CourseTable";
import BlockView from "../BlockView";
import { ClockCircleOutlined, BookOutlined } from "@ant-design/icons";

import { Tabs } from "antd";
import ListRight from "../ListRight";
const { TabPane } = Tabs;
export default function PeriodListRight(props) {
  return (
    <>
      <ListRight
        {...props}
        data={props.currentCourseList}
        name={"강의"}
        nameCounter={"개"}
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
            <BlockView title="강의명단">
              <CourseTable {...props} />
            </BlockView>
          </TabPane>
        </Tabs>
      </ListRight>
    </>
  );
}
