import React from "react";
import useInterval from "../utils/useInterval";
import { useState } from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

//******  the purpose of this component is that at each interval just this component rerenders not the whole app ******/

function Progress({
  focusDuration,
  breakDuration,
  isTimerRunning,
  isSessionStarted,
}) {
  //first time we get here is focusing time
  //first time we get here remaining timer is equal to focusing time
  const [remainingTimer, setRemainingTimer] = useState(focusDuration * 60); //problem here
  // duration state variable switches between focusing duration or breaking duration. for the first time it is focusing duration
  // duration switches between focusing duration or breaking duration each time remainingTimer becomes zero
  const [duration, setDuration] = useState(focusDuration);
  //durationType is used inside JSX to show either "Focusing For" or "On Break For"
  const [durationType, setDurationType] = useState("Focusing");
  useInterval(
    () => {
      if (!remainingTimer) {
        if (durationType === "Focusing") {
          setRemainingTimer(breakDuration * 60);
          setDuration(breakDuration);
          setDurationType("On Break");
        } else {
          setRemainingTimer(focusDuration * 60);
          setDuration(focusDuration);
          setDurationType("Focusing");
        }
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      } else {
        setRemainingTimer((current) => current - 1);
      }

      // what happens when the timer is running
    },
    isTimerRunning ? 1000 : null
  );

  const getProgressPercent = () => {
    const durationInSecond = duration * 60; //durationType==="Focusing"? focusDuration*60 : breakDuration*60;
    const timeElapsedInSecond = durationInSecond - remainingTimer;
    const timeElapsedPercent = (
      (timeElapsedInSecond * 100) /
      durationInSecond
    ).toFixed(0);
    return timeElapsedPercent;
  };

  const getPausedMessage = () => {
    const durationInSecond = durationType * 60; //durationType==="Focusing"? focusDuration*60 : breakDuration*60;
    if (!isTimerRunning && remainingTimer !== durationInSecond) {
      return "PAUSED";
    } else {
      return "";
    }
  };
  if (!isSessionStarted) {
    /*because state variables are set only once. when focuse and break duration changes
    the remaining time doesn't change and keeps only the first focus value so we need
    to change the value of remaininf here before sesion starts for next times the interval 
    does the job*/
    if (remainingTimer !== focusDuration * 60) {
      setRemainingTimer(focusDuration*60);
      setDuration(focusDuration);
      setDurationType("Focusing");
    }

    // console.log(
    //   "Inside Progress: if (!isSessionStarted) :",
    //   remainingTimer,
    //   durationType,
    //   durationType
    // );
    return (
      <p>
        {" "}
        Please set the desired duration and start the session. Once you started
        the session you can't change the duration or you can terminate the
        session by clicking on Stop button{" "}
      </p>
    );
  }


  return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {durationType} for {minutesToDuration(duration)} minutes
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(remainingTimer)} remaining
          </p>
          <h2>{getPausedMessage()}</h2>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={getProgressPercent()} // TODO: Increase aria-valuenow as elapsed time increases
              //aria-valuenow={(secondsToDuration(timer)).substr(0,2)} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: getProgressPercent() + "%" }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
