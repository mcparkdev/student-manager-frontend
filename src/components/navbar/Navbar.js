import React, { Component } from "react";
// import moment from "moment";
// import "moment/locale/ko"; // without this line it didn't work
import Clock from "react-live-clock";
// import localization from "moment/locale/ko";

class Navbar extends Component {
  render() {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return (
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-left-list">
            <div className="navbar-left-list-title">재콜롬비아한국학교</div>
            {/* <div>설정</div>
          <div>도움말</div> */}
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-right-list">
            <div>안녕하세요, Admin!</div>
            {/* <div>(수) 오후 3:56</div> */}
            <div>
              {`(${days[new Date().getDay()]})  `}{" "}
              <Clock format={"h:mm:ss A"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
