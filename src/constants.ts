/* ── Glitch character set for title animation ── */
export const GLITCH_CHARS = "!@#$%^&*[]|/?";

/* ── Rotating pro tips shown in the ticker ── */
export const CHAOS_TIPS = [
  "PRO TIP: margin: auto is for cowards",
  "PRO TIP: text-align: center is a crutch",
  "PRO TIP: flexbox was a mistake",
  "PRO TIP: position: absolute everywhere",
  "PRO TIP: just use tables. it's 1998.",
  "PRO TIP: negative margins build character",
  "PRO TIP: z-index: 9999 solves everything",
  "PRO TIP: !important on every line",
  "PRO TIP: overflow: visible is freedom",
  "PRO TIP: float: left until it works",
  "PRO TIP: Comic Sans is the font of the people",
  "PRO TIP: who needs responsive design?",
  "PRO TIP: pixel-perfect means nothing if the pixels are free",
  "PRO TIP: margins should always be negative. always.",
  "PRO TIP: if it works in IE6, ship it",
];

/* ── Chaos modes define how snippets transform the preview ── */
export type ChaosMode = "subtle" | "anarchy" | "corporate" | "physics";

export const CHAOS_MODES: { id: ChaosMode; label: string; description: string }[] = [
  { id: "subtle", label: "SUBTLE CHAOS", description: "Slight offsets & rotations. Tasteful destruction." },
  { id: "anarchy", label: "FULL ANARCHY", description: "Random positions, sizes, skews. No rules." },
  { id: "corporate", label: "CORPORATE APPROVED", description: "Left-aligned. Comic Sans. Times New Roman." },
  { id: "physics", label: "PHYSICS MODE", description: "Gravity. Elements fall and bounce." },
];

/* ── CSS snippets with mode-specific chaos values and point scores ── */
export interface CSSSnippet {
  label: string;
  css: string;
  points: number;
  funnyComment: string;
  /* Mode-specific transform overrides for the preview */
  modeEffects: Record<ChaosMode, {
    rotation?: number;
    offsetX?: number;
    offsetY?: number;
    scale?: number;
    skewX?: number;
    skewY?: number;
    opacity?: number;
    fontFamily?: string;
    fontSize?: string;
    textAlign?: string;
  }>;
}

export const CSS_SNIPPETS: CSSSnippet[] = [
  {
    label: "THE BUTTON",
    css: `margin-left: 73.6%;\nmargin-top: -200px;\nposition: relative;\ntransform: skewX(12deg);`,
    points: 25,
    funnyComment: "/* freedom from tyranny */",
    modeEffects: {
      subtle: { offsetX: 20, rotation: 2, skewX: 3 },
      anarchy: { offsetX: 200, offsetY: -100, rotation: 45, skewX: 30, scale: 1.5 },
      corporate: { offsetX: 0, textAlign: "left", fontFamily: "'Times New Roman', serif" },
      physics: { offsetY: 300, rotation: 15 },
    },
  },
  {
    label: "THE HEADING",
    css: `text-align: right;\npadding-left: 847px;\nletter-spacing: -3px;\nfont-size: 0.3rem;`,
    points: 30,
    funnyComment: "/* reject centering, embrace chaos */",
    modeEffects: {
      subtle: { offsetX: -15, rotation: -1, fontSize: "0.95em" },
      anarchy: { offsetX: -200, rotation: -30, fontSize: "0.3em", scale: 2 },
      corporate: { textAlign: "left", fontFamily: "'Comic Sans MS', cursive", fontSize: "2em" },
      physics: { offsetY: 250, rotation: -20 },
    },
  },
  {
    label: "THE IMAGE",
    css: `float: left;\nmargin-right: -150px;\nopacity: 0.3;\ntransform: rotate(7deg);`,
    points: 20,
    funnyComment: "/* images deserve to be free */",
    modeEffects: {
      subtle: { rotation: 5, opacity: 0.7, offsetX: 10 },
      anarchy: { rotation: 180, opacity: 0.2, offsetX: -100, scale: 0.3 },
      corporate: { rotation: 0, opacity: 1, offsetX: -50, textAlign: "left" },
      physics: { offsetY: 400, rotation: 90 },
    },
  },
  {
    label: "THE NAV",
    css: `position: fixed;\nbottom: -40px;\nleft: 33%;\nz-index: -1;`,
    points: 25,
    funnyComment: "/* navigation is overrated */",
    modeEffects: {
      subtle: { offsetY: 10, offsetX: -20, rotation: 1 },
      anarchy: { offsetY: 200, offsetX: 150, rotation: -60, scale: 0.5 },
      corporate: { offsetX: 0, offsetY: 0, textAlign: "left", fontFamily: "'Courier New', monospace" },
      physics: { offsetY: 350, rotation: 45 },
    },
  },
  {
    label: "THE HERO",
    css: `transform: perspective(500px) rotateY(15deg);\nmargin: -50px 0 0 100px;\nfilter: blur(1px);`,
    points: 35,
    funnyComment: "/* heroes don't need centering */",
    modeEffects: {
      subtle: { rotation: 3, offsetX: 15, skewY: 2 },
      anarchy: { rotation: -45, offsetX: -150, offsetY: 80, skewX: 25, skewY: 15 },
      corporate: { textAlign: "left", fontFamily: "'Arial Black', sans-serif", fontSize: "0.8em" },
      physics: { offsetY: 280, rotation: -35 },
    },
  },
  {
    label: "THE CARD",
    css: `position: relative;\ntop: -9999px;\nleft: 73%;\nwriting-mode: vertical-rl;`,
    points: 30,
    funnyComment: "/* cards should wander */",
    modeEffects: {
      subtle: { offsetX: -10, offsetY: 8, rotation: -2 },
      anarchy: { offsetX: 120, offsetY: -60, rotation: 90, scale: 0.4 },
      corporate: { offsetX: -30, textAlign: "left", fontFamily: "'Georgia', serif" },
      physics: { offsetY: 320, rotation: 60 },
    },
  },
  {
    label: "THE FOOTER",
    css: `position: fixed;\ntop: 0;\nright: -200px;\ntransform: scaleX(-1);`,
    points: 20,
    funnyComment: "/* footers belong at the top */",
    modeEffects: {
      subtle: { offsetY: -5, rotation: 0.5 },
      anarchy: { offsetY: -200, rotation: 180, scale: -1 },
      corporate: { textAlign: "left", fontFamily: "'Papyrus', fantasy" },
      physics: { offsetY: 380, rotation: -70 },
    },
  },
  {
    label: "THE PADDING",
    css: `padding: 0 0 0 847px;\nmargin: -100px auto;\nbox-sizing: content-box;`,
    points: 40,
    funnyComment: "/* padding is just margins with anxiety */",
    modeEffects: {
      subtle: { offsetX: 25, scale: 1.02 },
      anarchy: { offsetX: 300, scale: 1.8, rotation: 12 },
      corporate: { offsetX: 0, fontFamily: "'Verdana', sans-serif" },
      physics: { offsetY: 290, rotation: 25 },
    },
  },
];

/* ── Achievements system ── */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (appliedCount: number, score: number, maxChaos: boolean) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-uncenter",
    title: "FIRST UN-CENTER",
    description: "Applied your first chaos snippet",
    icon: "ZAP",
    condition: (count) => count >= 1,
  },
  {
    id: "getting-warmed-up",
    title: "GETTING WARMED UP",
    description: "Applied 3 chaos snippets",
    icon: "FLAME",
    condition: (count) => count >= 3,
  },
  {
    id: "css-criminal",
    title: "CSS CRIMINAL",
    description: "Applied all chaos snippets",
    icon: "SKULL",
    condition: (count) => count >= CSS_SNIPPETS.length,
  },
  {
    id: "full-anarchy",
    title: "FULL ANARCHY",
    description: "Reached 100% chaos level",
    icon: "BOMB",
    condition: (_count, _score, maxChaos) => maxChaos,
  },
  {
    id: "century-club",
    title: "CENTURY CLUB",
    description: "Scored over 100 points",
    icon: "TROPHY",
    condition: (_count, score) => score >= 100,
  },
  {
    id: "point-hoarder",
    title: "POINT HOARDER",
    description: "Scored over 200 points",
    icon: "CROWN",
    condition: (_count, score) => score >= 200,
  },
];

/* ── Funny CSS output comments ── */
export const CSS_COMMENTS = [
  "/* freedom from tyranny */",
  "/* reject centering, embrace chaos */",
  "/* images deserve to be free */",
  "/* navigation is overrated */",
  "/* heroes don't need centering */",
  "/* cards should wander */",
  "/* footers belong at the top */",
  "/* padding is just margins with anxiety */",
  "/* this is fine */",
  "/* I know what I'm doing */",
  "/* do NOT fix this */",
  "/* future me: I'm sorry */",
  "/* works on my machine */",
  "/* the design system is a suggestion */",
];

/* ── Easter egg messages ── */
export const EASTER_EGG_MESSAGES = {
  maxChaos: "Congratulations. You've created Yahoo circa 1998.",
  allSnippets: 'ACHIEVEMENT UNLOCKED: "Even More Chaos" panel available below.',
  tryCenter: "Nice try. We don't do that here.",
};

/* ── Extra chaos snippets unlocked at max level ── */
export const EXTRA_SNIPPETS: CSSSnippet[] = [
  {
    label: "THE BLINK TAG",
    css: `animation: blink 0.3s infinite;\ntext-decoration: blink;\ncolor: hotpink;`,
    points: 50,
    funnyComment: "/* <blink> lives on in our hearts */",
    modeEffects: {
      subtle: { opacity: 0.5 },
      anarchy: { opacity: 0.1, scale: 3, rotation: 360 },
      corporate: { fontFamily: "'Comic Sans MS', cursive" },
      physics: { offsetY: 500, rotation: 180 },
    },
  },
  {
    label: "THE MARQUEE",
    css: `overflow: visible;\nwhite-space: nowrap;\nanimation: drift 0.5s linear infinite;`,
    points: 50,
    funnyComment: "/* <marquee> was peak web design */",
    modeEffects: {
      subtle: { offsetX: 30 },
      anarchy: { offsetX: 400, rotation: -90 },
      corporate: { fontFamily: "'Impact', sans-serif", fontSize: "3em" },
      physics: { offsetY: 450, offsetX: 200 },
    },
  },
  {
    label: "THE TABLE LAYOUT",
    css: `display: table-cell;\nvertical-align: bottom;\nwidth: 9999px;\nborder-collapse: separate;`,
    points: 60,
    funnyComment: "/* tables for layout, as nature intended */",
    modeEffects: {
      subtle: { offsetY: 15, scale: 0.98 },
      anarchy: { offsetY: -300, scale: 0.1, rotation: 270 },
      corporate: { fontFamily: "'Trebuchet MS', sans-serif", textAlign: "left" },
      physics: { offsetY: 500, rotation: -180 },
    },
  },
];
