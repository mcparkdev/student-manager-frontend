import React from "react";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export default function CustomTag(props) {
  return (
    <React.Fragment>
      {props.payedCourse ? (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {props.short ? "" : "납부 완료"}
        </Tag>
      ) : !props.payedCourse ? (
        <Tag icon={<CloseCircleOutlined />} color="error">
          {props.short ? "" : "미납"}
        </Tag>
      ) : (
        <Tag icon={<SyncOutlined spin />} color="processing">
          {props.short ? "" : "미정"}
        </Tag>
      )}
    </React.Fragment>
  );
}
