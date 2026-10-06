import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { glitchText } from "../utils";

const BASE_TITLE = "CSS UN-CENTER PRO";

export function useGlitchTitle() {
  const [title, setTitle] = useState(BASE_TITLE);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let restoreTimer: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      setTitle(glitchText(BASE_TITLE, 0.12));
      restoreTimer = setTimeout(() => setTitle(BASE_TITLE), 120);
    }, 3500);
    return () => {
      clearInterval(iv);
      clearTimeout(restoreTimer);
    };
  }, [reducedMotion]);

  return reducedMotion ? BASE_TITLE : title;
}
