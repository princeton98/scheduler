import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace) => {
    if (replace) {
      setHistory([initial]);
    }
    else {
      //adding new mode to history array
      setHistory(prev => [...prev, mode]);
    }
    setMode(newMode);
  }
  const back = () => {
    setMode(history[history.length - 1])
    // need to pop so that if back is used twice, it goes to the second last value
    history.pop();
  }
  return { transition, back, mode }
} 