import { useCallback, useEffect, useRef } from "react";
import type confettiType from "canvas-confetti";
import { useReducedMotion } from "framer-motion";

/* ── Cyan-themed confetti burst for max chaos moments ── */
export function useConfetti() {
  const fired = useRef(false);
  const engine = useRef<typeof confettiType>();
  const generation = useRef(0);
  const reduced = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotion = useReducedMotion();
  reduced.current = Boolean(reducedMotion);

  /* An import finishing after reset or unmount must not resurrect particles. */
  const loadEngine = useCallback(async () => {
    const requestedGeneration = generation.current;
    try {
      const { default: confetti } = await import("canvas-confetti");
      if (requestedGeneration !== generation.current || reduced.current) return;
      engine.current = confetti;
      return confetti;
    } catch {
      /* Decorative effects can fail without interrupting the score interaction. */
      return;
    }
  }, []);

  /* Reset also cancels delayed bursts so an undone action stays undone. */
  const reset = useCallback(() => {
    generation.current += 1;
    fired.current = false;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    engine.current?.reset();
  }, []);

  useEffect(() => reset, [reset]);

  const fireChaosConfetti = useCallback(async () => {
    if (fired.current || reducedMotion) return;
    fired.current = true;
    const confetti = await loadEngine();
    if (!confetti) return;

    /* Burst from both sides with cyan/magenta particles */
    const colors = ["#00ffff", "#ff00ff", "#00ff88", "#ffff00"];

    confetti({
      disableForReducedMotion: true,
      particleCount: 120,
      spread: 80,
      origin: { x: 0.2, y: 0.6 },
      colors,
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
    });

    timers.current.push(setTimeout(() => {
      confetti({
        disableForReducedMotion: true,
        particleCount: 120,
        spread: 80,
        origin: { x: 0.8, y: 0.6 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
      });
    }, 150));

    /* Final center burst */
    timers.current.push(setTimeout(() => {
      confetti({
        disableForReducedMotion: true,
        particleCount: 80,
        spread: 360,
        origin: { x: 0.5, y: 0.4 },
        colors,
        ticks: 300,
        startVelocity: 30,
        gravity: 0.6,
      });
    }, 400));
  }, [reducedMotion, loadEngine]);

  /* Small particle burst for snippet application */
  const fireSnippetParticles = useCallback(async (x: number, y: number) => {
    if (reducedMotion) return;
    const confetti = await loadEngine();
    if (!confetti) return;
    confetti({
      disableForReducedMotion: true,
      particleCount: 15,
      spread: 40,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ["#00ffff", "#00ffff88"],
      ticks: 80,
      gravity: 1.2,
      scalar: 0.6,
      startVelocity: 15,
    });
  }, [reducedMotion, loadEngine]);

  return { fireChaosConfetti, fireSnippetParticles, reset };
}
