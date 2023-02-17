import "./App.css";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateRight,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [status, setStatus] = useState('session pause');
  const [breakLength, setBreakLength] = useState(1);
  const [sessionLength, setSessionLength] = useState(1);
  const [timer, setTimer] = useState({minutes: 0, seconds: 3});
  return (
    <div className="App">
      <div id="container">
        <p>25 + 5 Clock</p>
        <Break breakLength={breakLength} setBreakLength={setBreakLength} status={status}/>
        <Session
          sessionLength={sessionLength}
          setSessionLength={setSessionLength}
          setTimer={setTimer}
          status={status}
        />
        <Timer timer={timer} status={status} />
        <Controls
          breakLength={breakLength}
          sessionLength={sessionLength}
          timer={timer}
          setTimer={setTimer}
          status={status}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
}

function Break(props) {
  let handleClick = (e) => {
    if (props.status=="session" || props.status=="break") return;
    let targetID = e.currentTarget.id;
    if (targetID === "break-increment" && props.breakLength < 60)
      props.setBreakLength(props.breakLength + 1);
    if (targetID === "break-decrement" && props.breakLength > 1)
      props.setBreakLength(props.breakLength - 1);
  };
  return (
    <div id="break">
      <label for="break-length" id="break-label">
        Break Length
      </label>
      <button id="break-increment" onClick={handleClick}>
        <FontAwesomeIcon icon={faArrowUp} size={"2x"} />
      </button>
      <p id="break-length">{props.breakLength}</p>
      <button id="break-decrement" onClick={handleClick}>
        <FontAwesomeIcon icon={faArrowDown} size={"2x"} />
      </button>
    </div>
  );
}

function Session(props) {
  let handleClick = (e) => {
    if (props.status=="session" || props.status=="break") return;
    let targetID = e.currentTarget.id;
    if (targetID === "session-increment" && props.sessionLength < 60) {
      props.setTimer({minutes: props.sessionLength + 1, seconds: 0});
      props.setSessionLength(props.sessionLength + 1);
    }
    if (targetID === "session-decrement" && props.sessionLength > 1){
      props.setTimer({minutes: props.sessionLength - 1, seconds: 0});
      props.setSessionLength(props.sessionLength - 1);
    }
  };
  return (
    <div id="session">
      <label for="session-length" id="session-label">
        Session Length
      </label>
      <button id="session-increment" onClick={handleClick}>
        <FontAwesomeIcon icon={faArrowUp} size={"2x"} />
      </button>
      <p id="session-length">{props.sessionLength}</p>
      <button id="session-decrement" onClick={handleClick}>
        <FontAwesomeIcon icon={faArrowDown} size={"2x"} />
      </button>
    </div>
  );
}

function Timer(props) {
  return (
    <div id="timer">
      <label for="time-left" id="timer-label">
        {props.status}
      </label>
      <p id="time-left">{props.timer.minutes}:{props.timer.seconds}</p>
    </div>
  );
}

let timerUpdate;
function Controls(props) {
  function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
  }
  let startTimer = () => {
    switch(props.status) {
      case "session pause": 
      case "break pause":
        if (props.status==="session pause") props.setStatus('session');
        if (props.status==="break pause") props.setStatus('break');
        let futureDate = new Date(Date.now() + props.timer.minutes * 60000 + props.timer.seconds * 1000);
        
        timerUpdate = setInterval(()=>{
          let intervalInSeconds = (futureDate-Date.now())/1000;
          if (intervalInSeconds <= 0) {
            if (props.status === "session") {
              console.log("interval<0 " + props.status);
              props.setStatus("break pause");
              props.setTimer({minutes: props.breakLength, seconds: 0});
            }
            if (props.status === "break") {
              console.log("interval<0 " + props.status);
              props.setStatus("session pause");
              props.setTimer({minutes: props.sessionLength, seconds: 0});
            }
            clearInterval(timerUpdate);
            startTimer();
          } 
          else {
            props.setTimer({minutes: Math.floor(intervalInSeconds/60), seconds: Math.floor(intervalInSeconds%60)});
          } 
        }, 100);
        break;
        
      case "session": 
        clearInterval(timerUpdate);
        props.setStatus('session pause');
        break;

      case "break":
        clearInterval(timerUpdate);
        props.setStatus('break pause');
        break;

      default: return;
    }
  };
  return (
    <div id="controls">
      <button id="start_stop" onClick={startTimer}>
        <FontAwesomeIcon icon={faPlay} size={"2x"} />
        <FontAwesomeIcon icon={faPause} size={"2x"} />
      </button>
      <button id="reset">
        <FontAwesomeIcon icon={faRotateRight} size={"2x"} />
      </button>
    </div>
  );
}
export default App;
