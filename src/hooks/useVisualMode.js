import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace) => {
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    }
    else {
      //adding new mode to history array
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  }
  const back = () => {
    //cannot run back if there isn't enough transitions
    if (history.length < 2) {
      return;
    }
    else {
    setHistory(prev => [...prev.slice(0, history.length - 1)])
    setMode(history[history.length - 2])
    }
  }
  return { transition, back, mode }
} 