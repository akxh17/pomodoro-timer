import React from "react";
import { IoIosArrowDropup } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";

function SessionLength(props) {
  return (
    <div className="sessionlength--container">
      <h3>Session Length</h3>
      <div className="sessionbutton--container">
        <button onClick={props.handleIncrement} disabled={props.play}>
          <IoIosArrowDropup className="change--button" />
        </button>
        <h3>{props.value}</h3>
        <button onClick={props.handleDecrement} disabled={props.play}>
          <IoIosArrowDropdown className="change--button" />
        </button>
      </div>
    </div>
  );
}

export default SessionLength;
