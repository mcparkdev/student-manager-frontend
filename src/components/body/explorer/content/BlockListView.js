import React from "react";
import NumberFormat from "react-number-format";
import PayTag from "../../PayTag";

export default function BlockListView(props) {
  return (
    <div className="block-content-items">
      {props.items.map((item, index) => (
        <div key={index} className="block-content-item">
          <div className="block-content-item-key">{item.key}</div>
          <div className="block-content-item-value">
            {item.number === true ? (
              <NumberFormat
                value={item.value}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
              />
            ) : item.payTag === true ? (
              <PayTag payedCourse={item.value} />
            ) : (
              <>{item.value}</>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
