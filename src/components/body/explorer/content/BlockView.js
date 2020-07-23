import React from "react";

export default function BlockView(props) {
  return (
    <React.Fragment>
      <div className="block-header">{props.title}</div>
      <div className="block-content">{props.children}</div>
    </React.Fragment>
  );
}
