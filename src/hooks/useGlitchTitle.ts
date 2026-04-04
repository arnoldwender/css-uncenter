import { useState, useEffect } from "react";
import { glitchText } from "../utils";

const BASE_TITLE = "CSS UN-CENTER PRO";

export function useGlitchTitle() {
  const [title, setTitle] = useState(BASE_TITLE);

  useEffect(() => {
    const iv = setInterval(() => {
      setTitle(glitchText(BASE_TITLE, 0.12));
      setTimeout(() => setTitle(BASE_TITLE), 120);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  return title;
}
