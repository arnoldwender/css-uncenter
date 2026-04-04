import { GLITCH_CHARS } from "./constants";

/* ── Glitch text: randomly replace chars at given intensity ── */
export function glitchText(text: string, intensity: number): string {
  return text
    .split("")
    .map((c) =>
      Math.random() < intensity
        ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        : c
    )
    .join("");
}

/* ── LocalStorage helpers for high score persistence ── */
const HIGH_SCORE_KEY = "css-uncenter-high-score";
const GLOBAL_COUNTER_KEY = "css-uncenter-global-counter";
const ACHIEVEMENTS_KEY = "css-uncenter-achievements";

export function getHighScore(): number {
  try {
    return parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

export function setHighScore(score: number): void {
  try {
    const current = getHighScore();
    if (score > current) {
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
  } catch {
    /* localStorage unavailable */
  }
}

export function getGlobalCounter(): number {
  try {
    return parseInt(localStorage.getItem(GLOBAL_COUNTER_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

export function incrementGlobalCounter(): number {
  try {
    const current = getGlobalCounter() + 1;
    localStorage.setItem(GLOBAL_COUNTER_KEY, current.toString());
    return current;
  } catch {
    return 0;
  }
}

export function getUnlockedAchievements(): string[] {
  try {
    return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveAchievements(ids: string[]): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(ids));
  } catch {
    /* localStorage unavailable */
  }
}

/* ── Generate random value within range ── */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
