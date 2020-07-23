import React from "react";
import { PlusSquareTwoTone } from "@ant-design/icons";
export default function Create(props) {
  return (
    <div className="content-body-create" onClick={props.onClickCreate}>
      <PlusSquareTwoTone twoToneColor="#52c41a" />
      {props.label !== undefined && <div>{props.label}</div>}
    </div>
  );
}
