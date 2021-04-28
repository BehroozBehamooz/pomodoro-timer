import React from "react";
import classNames from "../utils/class-names";
import Progress from "./Progress";


function PlayStop({
  focusDuration,
  breakDuration,
  isTimerRunning,
  setIsTimerRunning,
  isSessionStarted,
  startSession
}) {
  
  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    if (!isSessionStarted){
      startSession(true);//it just runs once when the user play then no matter if the uses pauses we are still in that session
    }
  }  
  const refreshPage = () => {
    // startSession(false);
    // setIsTimerRunning(false);
    window.location.reload();
    };

  // console.log("Inside PlayStop: ",focusDuration,breakDuration);

  return (
    <div>
      <div className="row ">
        <div className="col ">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className={classNames({
                btn: true,
                "btn-secondary": !isTimerRunning,
                "btn-danger": isTimerRunning,
              })}
              title="Stop the session"
              onClick={refreshPage}
              disabled={!isSessionStarted}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      
      <Progress
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
        isSessionStarted={isSessionStarted}
      />
      
    </div>
  );
}

export default PlayStop;
