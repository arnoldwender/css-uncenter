import { useCallback, useRef } from "react";
import confetti from "canvas-confetti";

/* ── Cyan-themed confetti burst for max chaos moments ── */
export function useConfetti() {
  const fired = useRef(false);

  const fireChaosConfetti = useCallback(() => {
    if (fired.current) return;
    fired.current = true;

    /* Burst from both sides with cyan/magenta particles */
    const colors = ["#00ffff", "#ff00ff", "#00ff88", "#ffff00"];

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { x: 0.2, y: 0.6 },
      colors,
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { x: 0.8, y: 0.6 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
      });
    }, 150);

    /* Final center burst */
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 360,
        origin: { x: 0.5, y: 0.4 },
        colors,
        ticks: 300,
        startVelocity: 30,
        gravity: 0.6,
      });
    }, 400);
  }, []);

  /* Small particle burst for snippet application */
  const fireSnippetParticles = useCallback((x: number, y: number) => {
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ["#00ffff", "#00ffff88"],
      ticks: 80,
      gravity: 1.2,
      scalar: 0.6,
      startVelocity: 15,
    });
  }, []);

  const reset = useCallback(() => {
    fired.current = false;
  }, []);

  return { fireChaosConfetti, fireSnippetParticles, reset };
}
