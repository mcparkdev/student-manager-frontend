import React, { Component } from "react";
import Explorer from "./explorer/Explorer";
// import Widget from "./widget/Widget";

class Body extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-body">
          <div className="body-explorers">
            <Explorer {...this.props} />
          </div>
          {/* <div className="body-widgets">
            <Widget />
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Body;
