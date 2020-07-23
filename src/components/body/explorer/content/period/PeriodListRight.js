import React from "react";
import PeriodTable from "./PeriodTable";
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
        data={props.periodList}
        name={"학기"}
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
            <BlockView title="학기명단">
              <PeriodTable {...props} />
            </BlockView>
          </TabPane>
        </Tabs>
      </ListRight>
    </>
  );
}
