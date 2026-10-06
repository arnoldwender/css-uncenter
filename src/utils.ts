import { ACHIEVEMENTS, GLITCH_CHARS } from "./constants";

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

/* Treat persisted values as untrusted so one corrupt entry cannot poison future writes. */
function readCounter(key: string): number {
  const value = localStorage.getItem(key);
  if (value === null || value.trim() === "") return 0;
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : 0;
}

/* Preserve valid progress while dropping obsolete IDs, invalid types and duplicates. */
function validateAchievements(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const knownIds = new Set(ACHIEVEMENTS.map((achievement) => achievement.id));
  return [...new Set(value.filter((id): id is string => typeof id === "string" && knownIds.has(id)))];
}

export function getHighScore(): number {
  try {
    return readCounter(HIGH_SCORE_KEY);
  } catch {
    return 0;
  }
}

export function setHighScore(score: number): void {
  if (!Number.isSafeInteger(score) || score < 0) return;
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
    return readCounter(GLOBAL_COUNTER_KEY);
  } catch {
    return 0;
  }
}

export function incrementGlobalCounter(): number {
  try {
    const current = Math.min(Number.MAX_SAFE_INTEGER, getGlobalCounter() + 1);
    localStorage.setItem(GLOBAL_COUNTER_KEY, current.toString());
    return current;
  } catch {
    return 0;
  }
}

export function getUnlockedAchievements(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || "[]");
    return validateAchievements(value);
  } catch {
    return [];
  }
}

export function saveAchievements(ids: string[]): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(validateAchievements(ids)));
  } catch {
    /* localStorage unavailable */
  }
}

/* ── Generate random value within range ── */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
