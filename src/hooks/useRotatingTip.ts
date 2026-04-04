import { useState, useEffect } from "react";
import { CHAOS_TIPS } from "../constants";

export function useRotatingTip() {
  const [tip, setTip] = useState(CHAOS_TIPS[0]);

  useEffect(() => {
    const iv = setInterval(() => {
      setTip(CHAOS_TIPS[Math.floor(Math.random() * CHAOS_TIPS.length)]);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  return tip;
}
