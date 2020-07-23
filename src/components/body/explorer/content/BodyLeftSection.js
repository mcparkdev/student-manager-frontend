import React from "react";

export default function BodyLeftSection(props) {
  return (
    <div className="content-left-current-section">
      <div className="current-section-title">
        <span>{props.title}</span>
        <div className="seperator-grey"></div>
      </div>
      <div className="current-section-item-container">{props.children}</div>
    </div>
  );
}
