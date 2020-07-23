import React, { Component } from "react";
import GridLayout from "react-grid-layout";

class MainGridLayout extends Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "widgetA", x: 10, y: 0, w: 2, h: 2, static: true },
      { i: "widgetB", x: 10, y: 2, w: 2, h: 2, static: true },
      { i: "widgetC", x: 10, y: 4, w: 2, h: 2, static: true },
      { i: "mainA", x: 0, y: 0, w: 5, h: 6 },
      { i: "mainB", x: 5, y: 0, w: 5, h: 6 },
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        useCSSTransforms={true}
      >
        <div key="widgetA">widget a</div>
        <div key="widgetB">widget b</div>
        <div key="widgetC">widget c</div>
        <div key="mainA">main a</div>
        <div key="mainB">main b</div>
      </GridLayout>
    );
  }
}

export default MainGridLayout;
