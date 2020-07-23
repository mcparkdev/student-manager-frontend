import React from "react";
import { Skeleton } from "antd";

export default function SkeletonGeneric(props) {
  return (
    <React.Fragment>
      {props.loading && (
        <div style={{ flexDirection: "column", width: "100%" }}>
          {props.avatar && (
            <Skeleton
              loading={props.loading}
              avatar
              paragraph
              active
            ></Skeleton>
          )}
          <Skeleton loading={props.loading} paragraph active></Skeleton>
          <Skeleton loading={props.loading} paragraph active></Skeleton>
          <Skeleton loading={props.loading} paragraph active></Skeleton>
        </div>
      )}
    </React.Fragment>
  );
}
