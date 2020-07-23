import React from "react";
import { Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
export default function Delete(props) {
  return (
    <Popconfirm
      title="이 항목을 삭제하겠습니까?"
      placement="bottomRight"
      onConfirm={props.onConfirmDelete}
      onCancel={props.onCancelDelete}
      okText="삭제"
      cancelText="취소"
    >
      <div className="content-body-delete">
        <DeleteTwoTone twoToneColor="#eb2f96" />
        {props.label !== undefined && <div>{props.label}</div>}
      </div>
    </Popconfirm>
  );
}
