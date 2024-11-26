import { useState, useEffect } from "react";
import BreakLength from "./Components/BreakLength";
import SessionLength from "./Components/SessionLength";
import Timer from "./Components/Timer";
import audio from "./Audio/beep_sound.wav";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [countDown, setCountDown] = useState(1500);
  const [timeType, setTimeType] = useState("Session");

  let timeout;
  const track = new Audio(audio);

  useEffect(() => {
    setCountDown(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (play) {
      timeout = setTimeout(() => {
        console.log("Timer Running");
        if (countDown && play) {
          setCountDown(countDown - 1);
        }
        if (!countDown) {
          changeTimer();
        }
      }, 1000);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [play, countDown]);

  function changeTimer() {
    if (!countDown && timeType === "Session") {
      setCountDown(breakLength * 60);
      setTimeType("Break");
      track.play();
    }
    if (!countDown && timeType === "Break") {
      setCountDown(sessionLength * 60);
      setTimeType("Session");
      track.pause();
      track.currentTime = 0;
    }
  }

  function breakLengthIncrement() {
    if (breakLength < 60) {
      setBreakLength((prevBreak) => prevBreak + 1);
    }
  }

  function breakLengthDecrement() {
    if (breakLength > 1) {
      setBreakLength((prevBreak) => prevBreak - 1);
    }
  }

  function sessionLengthIncrement() {
    if (sessionLength < 60) {
      setSessionLength((prevBreak) => prevBreak + 1);
    }
  }

  function sessionLengthDecrement() {
    if (sessionLength > 1) {
      setSessionLength((prevBreak) => prevBreak - 1);
    }
  }

  function togglePlay() {
    setPlay((prevPlay) => !prevPlay);
  }

  function handleReset() {
    clearTimeout(timeout);
    setPlay(false);
    setCountDown(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimeType("Session");
    track.pause();
    track.currentTime = 0;
  }
  return (
    <div className="wrapper--container">
      <h1 className="header--container">POMODORO TIMER</h1>
      <hr className="horizontal--line" />
      <div className="length--container">
        <BreakLength
          value={breakLength}
          handleIncrement={breakLengthIncrement}
          handleDecrement={breakLengthDecrement}
          play={play}
        />
        <SessionLength
          value={sessionLength}
          handleIncrement={sessionLengthIncrement}
          handleDecrement={sessionLengthDecrement}
          play={play}
        />
      </div>
      <Timer
        play={play}
        handleToggle={togglePlay}
        countDown={countDown}
        handleReset={handleReset}
        title={timeType}
      />
    </div>
  );
}

export default App;
