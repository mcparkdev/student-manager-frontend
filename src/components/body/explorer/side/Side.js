import React from "react";
// import SideActions from "./SideActions";
import SideTitle from "./SideTitle";
import SideSection from "./SideSection";

export default function Side(props) {
  return (
    <div
      id={`explorer-side-${props.data.name}`}
      className="explorer-side"
      // style={props.data.open ? { display: "block" } : { display: "none" }}
      // style={props.data.open ? { width: "15%" } : { width: 0, minWidth: 0 }}
      style={props.data.open ? { left: "0" } : { left: "-110%" }}
    >
      {/* <SideActions type="all" /> */}
      <SideTitle>
        제 콜롬비아 <br /> 한국학교{" "}
        {props.data.title !== "" ? ` / ${props.data.title}` : ""}
      </SideTitle>
      {props.data.sections.map((section, index) => (
        <SideSection
          key={`${props.data.name}-section-${index}`}
          section={section.section}
          selected={section.selected}
          onClick={section.onClick}
        />
      ))}
    </div>
  );
}
