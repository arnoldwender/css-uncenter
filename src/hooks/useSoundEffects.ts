import { useCallback, useRef } from "react";

/* ── Web Audio API sound effects for chaos actions ── */

/* Audio context singleton — created on first user interaction */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/* Cracking/breaking sound — played when applying a snippet */
function playCrack() {
  const ctx = getAudioContext();
  const duration = 0.15;

  /* White noise buffer for crack texture */
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 800;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
}

/* Escalating alarm — pitched higher as chaos increases */
function playAlarm(chaosLevel: number) {
  const ctx = getAudioContext();
  const baseFreq = 200 + chaosLevel * 5;
  const duration = 0.25;

  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

/* Victory fanfare — played when chaos hits 100% */
function playVictory() {
  const ctx = getAudioContext();
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    const startTime = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

    osc.connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.3);
  });
}

/* Rubber-band snap — played when user tries to center something */
function playRubberBand() {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

/* Achievement unlock sound */
function playAchievement() {
  const ctx = getAudioContext();
  const notes = [880, 1108.73, 1318.51]; // A5, C#6, E6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    const start = ctx.currentTime + i * 0.08;
    gain.gain.setValueAtTime(0.2, start);
    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.2);

    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.2);
  });
}

export function useSoundEffects() {
  /* Track if victory was already played this session */
  const victoryPlayed = useRef(false);

  const crack = useCallback(() => {
    try { playCrack(); } catch { /* audio not available */ }
  }, []);

  const alarm = useCallback((chaosLevel: number) => {
    try { playAlarm(chaosLevel); } catch { /* audio not available */ }
  }, []);

  const victory = useCallback(() => {
    if (victoryPlayed.current) return;
    victoryPlayed.current = true;
    try { playVictory(); } catch { /* audio not available */ }
  }, []);

  const rubberBand = useCallback(() => {
    try { playRubberBand(); } catch { /* audio not available */ }
  }, []);

  const achievement = useCallback(() => {
    try { playAchievement(); } catch { /* audio not available */ }
  }, []);

  const resetVictory = useCallback(() => {
    victoryPlayed.current = false;
  }, []);

  return { crack, alarm, victory, rubberBand, achievement, resetVictory };
}
