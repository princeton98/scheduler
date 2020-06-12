import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
    const transition = (newMode, replace) => {
      if (replace) {
        history.push(initial)
      }
      else {
    history.push(mode)
      }
    setMode(newMode)
  }
  const back = () => {
    setMode(history[history.length-1])
    history.pop();
  }
  return  {transition, back, mode} 
} 