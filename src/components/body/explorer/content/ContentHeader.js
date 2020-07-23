import React from "react";
import ContentSearch from "./ContentSearch";
import { LeftOutlined, RightOutlined, SyncOutlined } from "@ant-design/icons";
import { Tooltip, Spin } from "antd";

export default function ContentHeader(props) {
  // console.log(props);
  return (
    <div className="content-header">
      <div className="content-header-left">
        <div className="content-header-left-actions">
          <div
            className="content-header-left-prev"
            onClick={() => props.history.goBack()}
          >
            <Tooltip title="이전" color="#007fff" placement="bottom">
              <LeftOutlined />
            </Tooltip>
          </div>
          <div
            className="content-header-left-next"
            onClick={() => props.history.goForward()}
          >
            <Tooltip title="다음" color="#007fff" placement="bottom">
              <RightOutlined />
            </Tooltip>
          </div>
          <div
            className="content-header-left-refresh"
            onClick={() => props.resetList()}
          >
            <Tooltip title="새로고침" color="#007fff" placement="bottom">
              <SyncOutlined />
            </Tooltip>
          </div>
        </div>
        <div className="content-header-left-search">
          <ContentSearch {...props} />
        </div>
        <Spin size="small" spinning={props.loadingGET} />
      </div>
      <div className="content-header-right">
        <div className="content-header-right-view"></div>
      </div>
    </div>
  );
}
