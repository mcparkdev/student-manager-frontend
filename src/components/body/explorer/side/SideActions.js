import React from "react";

export default function SideActions(props) {
  return (
    <div className="explorer-side-actions">
      {props.type === "all" && (
        <React.Fragment>
          <div className="explorer-side-close">x</div>
          <div className="explorer-side-minimize">-</div>
          <div className="explorer-side-maximize">+</div>
        </React.Fragment>
      )}
      {props.type === "close" && <div className="explorer-side-close">x</div>}
      {props.type === "minimize" && (
        <div className="explorer-side-minimize">-</div>
      )}
    </div>
  );
}
