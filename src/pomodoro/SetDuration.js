import React, { useState } from "react";
import { minutesToDuration } from "../utils/duration";
import classNames from "../utils/class-names";
import PlayStop from "./PlayStop";

function SetDuration() {
  const [focusDuration,setFocusDuration]=useState(25);
  const [breakDuration,setBreakDuration]=useState(5);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSessionStarted,startSession]=useState(false);

  const handlePlusMinusClick = ({ target: { id } }) => {
    switch (id) {
      case "decrease-break":
        setBreakDuration((current)=>Math.max(1,current-1));        
        break;
      case "increase-break":
        setBreakDuration((current)=>Math.min(15,current+1))
        break;
      case "decrease-focus":
        setFocusDuration((current) => Math.max(5,current-5));
        break;
      case "increase-focus":
        setFocusDuration((current) => Math.min(60,current+5));
        break;
      default:
        break;
    }
  };
  // console.log("Inside SetDuration: ",focusDuration,breakDuration);

  return (
    <div className="pomodoro">
    <div className="row border border-primary ">
      <div className="col">
        <div className="input-group input-group-lg mb-2 ">
          <span className="input-group-text  m-1" data-testid="duration-focus">
            {/*display the current focus session duration */}
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className="input-group-append ">
            {/* decreasing focus duration and disable during a focus or break session */}
            <button
              type="button"
              className={classNames({
                btn: true,
                "btn-secondary": true,
                disabled: isTimerRunning || isSessionStarted,
              })}
              data-testid="decrease-focus"
              onClick={isTimerRunning || isSessionStarted ? undefined : handlePlusMinusClick}
              id="decrease-focus"
            >
              <span className="oi oi-minus" id="decrease-focus" />
            </button>
            {/* increasing focus duration  and disable during a focus or break session */}
            <button
              type="button"
              className={classNames({
                btn: true,
                "btn-secondary": true,
                disabled: isTimerRunning || isSessionStarted,
              })}
              data-testid="increase-focus"
              onClick={isTimerRunning || isSessionStarted ? undefined : handlePlusMinusClick}
              id="increase-focus"
            >
              <span className="oi oi-plus" id="increase-focus" />
            </button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              {/* display the current break session duration */}
              Break Duration: {minutesToDuration(breakDuration)}
            </span>
            <div className="input-group-append">
              {/* decreasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className={classNames({
                  btn: true,
                  "btn-secondary": true,
                  disabled: isTimerRunning || isSessionStarted,
                })}
                data-testid="decrease-break"
                onClick={isTimerRunning || isSessionStarted ? undefined : handlePlusMinusClick}
                id="decrease-break"
              >
                <span className="oi oi-minus" id="decrease-break" />
              </button>
              {/* increasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className={classNames({
                  btn: true,
                  "btn-secondary": true,
                  disabled: isTimerRunning || isSessionStarted,
                })}
                data-testid="increase-break"
                onClick={isTimerRunning || isSessionStarted ? undefined : handlePlusMinusClick}
                id="increase-break"
              >
                <span className="oi oi-plus" id="increase-break" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PlayStop 
                focusDuration={focusDuration}
                breakDuration={breakDuration}
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
                isSessionStarted={isSessionStarted}
                startSession={startSession}
      />
    </div>
  );
}

export default SetDuration;
