import React from "react";
import "../customCheckbox.css";

const CustomCheckbox = props => {
  return (
    <div>
      <label className="checkboxContainer">
        <span style={{ color: "#1f466a" }}>{props.label}</span>
        <input type="checkbox" />
        <span className="checkmark" />
      </label>
    </div>
  );
};

export default CustomCheckbox;
