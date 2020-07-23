import React from "react";
import { EditTwoTone } from "@ant-design/icons";
export default function Edit(props) {
  return (
    <div className="content-body-edit" onClick={props.onClickEdit}>
      <EditTwoTone />
      {props.label !== undefined && <div>{props.label}</div>}
    </div>
  );
}
