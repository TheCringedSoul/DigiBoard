import './p.css';
import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = () => {
  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(25);
  const [clockCount, setClockCount] = useState(25 * 60);
  const [currentTimer, setCurrentTimer] = useState("Session");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio('../../public/tone.wav'));

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setClockCount(prevClockCount => {
          if (prevClockCount === 0) {
            // Play the alert sound
            audioRef.current.play();

            const newTimer = currentTimer === "Session" ? "Break" : "Session";
            const newClockCount = (newTimer === "Session" ? sessionCount : breakCount) * 60;
            setCurrentTimer(newTimer);
            return newClockCount;
          }
          return prevClockCount - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, clockCount, currentTimer, breakCount, sessionCount]);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setBreakCount(5);
    setSessionCount(25);
    setClockCount(25 * 60);
    setCurrentTimer("Session");
    setIsPlaying(false);
  };

  const convertToTime = (count) => {
    const minutes = Math.floor(count / 60).toString().padStart(2, '0');
    const seconds = (count % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleBreakChange = (amount) => {
    if (breakCount + amount >= 1 && breakCount + amount <= 60) {
      setBreakCount(prevBreakCount => {
        const newBreakCount = prevBreakCount + amount;
        if (!isPlaying && currentTimer === "Break") {
          setClockCount(newBreakCount * 60);
        }
        return newBreakCount;
      });
    }
  };

  const handleSessionChange = (amount) => {
    if (sessionCount + amount >= 1 && sessionCount + amount <= 60) {
      setSessionCount(prevSessionCount => {
        const newSessionCount = prevSessionCount + amount;
        if (!isPlaying && currentTimer === "Session") {
          setClockCount(newSessionCount * 60);
        }
        return newSessionCount;
      });
    }
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer-controls">
        <div className="timer-control">
          <h2>Break Length</h2>
          <button onClick={(e) => handleBreakChange(-1, e)}>-</button>
          <span>{breakCount}</span>
          <button onClick={(e) => handleBreakChange(1, e)}>+</button>
        </div>
        <div className="timer-control">
          <h2>Session Length</h2>
          <button onClick={(e) => handleSessionChange(-1, e)}>-</button>
          <span>{sessionCount}</span>
          <button onClick={(e) => handleSessionChange(1, e)}>+</button>
        </div>
      </div>
      <div className="clock-container">
        <h1>{currentTimer}</h1>
        <span>{convertToTime(clockCount)}</span>
        <div className="timer-actions">
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
