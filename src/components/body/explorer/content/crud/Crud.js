import React from "react";
import Create from "./Create";
import Edit from "./Edit";
import Delete from "./Delete";

export default function Crud(props) {
  // console.log(props);
  return (
    <React.Fragment>
      <div className="content-body-actions">
        {props.create !== false && (
          <Create
            label="새로 만들기"
            onClickCreate={() => props.onClickCreate(true)}
          />
        )}
        {props.edit !== false && (
          <Edit label="수정하기" onClickEdit={() => props.onClickEdit(true)} />
        )}
        {props.delete !== false && (
          <Delete
            label="삭제하기"
            onConfirmDelete={
              props.id !== undefined
                ? () => props.onConfirmDelete(props.id)
                : props.onConfirmDelete
            }
            onCancelDelete={props.onCancelDelete}
          />
        )}
      </div>
    </React.Fragment>
  );
}
