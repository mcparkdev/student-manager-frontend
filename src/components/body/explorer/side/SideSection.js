import React from "react";
// import { RightOutlined } from "@ant-design/icons";
// import {
//   CalendarOutlined,
//   FundProjectionScreenOutlined,
//   BookOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function SideSection(props) {
  return (
    <div className="explorer-side-section">
      <div className="explorer-side-header">{props.section.title}</div>
      <div className="explorer-side-item-container">
        {props.section.items.map((item, index) => (
          <div
            className="explorer-side-item-key"
            key={`explorer-side-item-${index}`}
            // style={
            //   props.selected === item.name
            //     ? {
            //         backgroundColor: "#e0dedf",
            //       }
            //     : {}
            // }
            onClick={() => props.onClick(item.name)}
          >
            <NavLink exact to={`/${item.name}s`}>
              <div className="explorer-side-item">
                <i className={item.icon}></i>
                <div className="explorer-side-item-label">{item.label}</div>
                {/* <div className="explorer-side-item-left">
                  {item.status ? (
                    <div className={item.status} />
                  ) : (
                    <i className={item.icon}></i>
                  )}
                  <div className="explorer-side-item-label">{item.label}</div>
                </div> */}
                {/* <div className="explorer-side-item-right">
                  <div className="explorer-side-item-action-button">
                    <RightOutlined />
                  </div>
                </div> */}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
