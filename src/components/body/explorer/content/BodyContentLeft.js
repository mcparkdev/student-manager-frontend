import React from "react";
import logo from "../../../../school/logo.jpg";

export default function BodyContentLeft(props) {
  return (
    <div className="content-left">
      {props.profileImage !== undefined ? (
        <div className="content-left-profile-picture">
          <img src={props.profileImage} alt="profile"></img>
        </div>
      ) : (
        <div className="content-left-profile-picture-logo">
          <img src={logo} alt="profile"></img>
        </div>
      )}

      {props.children}
    </div>
  );
}
