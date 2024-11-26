import React from "react";
import { HiPlayPause } from "react-icons/hi2";
import { VscDebugRestart } from "react-icons/vsc";

function handleCountDown(countDown) {
  const minutes = Math.floor(countDown / 60);
  const seconds = countDown % 60;
  const formattedminutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedseconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedminutes}:${formattedseconds}`;
}

function Timer(props) {
  return (
    <div className="timer--container">
      <div className="countdown--container">
        <h4>{props.title}</h4>
        <h1 className={props.title === "Session" ? "" : "red--timer"}>
          {handleCountDown(props.countDown)}
        </h1>
      </div>
      <div className="timerbutton--container">
        <button onClick={props.handleToggle}>
          <HiPlayPause className="change--button" />
        </button>
        <button onClick={props.handleReset}>
          <VscDebugRestart className="change--button" />
        </button>
      </div>
    </div>
  );
}

export default Timer;
