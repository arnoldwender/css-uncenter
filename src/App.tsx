import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CSS_SNIPPETS,
  EXTRA_SNIPPETS,
  ACHIEVEMENTS,
  type ChaosMode,
  type CSSSnippet,
} from "./constants";
import { useGlitchTitle } from "./hooks/useGlitchTitle";
import { useRotatingTip } from "./hooks/useRotatingTip";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { useConfetti } from "./hooks/useConfetti";
import {
  getHighScore,
  setHighScore,
  getGlobalCounter,
  incrementGlobalCounter,
  getUnlockedAchievements,
  saveAchievements,
} from "./utils";
import { ScanlineOverlay, RubberBandOverlay } from "./components/Overlays";
import { Header } from "./components/Header";
import { ModeSelector } from "./components/ModeSelector";
import { ChaosMeter } from "./components/ChaosMeter";
import { ScoreBoard } from "./components/ScoreBoard";
import { LivePreview } from "./components/LivePreview";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { SnippetPanel } from "./components/SnippetPanel";
import { CSSOutputPanel } from "./components/CSSOutputPanel";
import { Achievements } from "./components/Achievements";
import { ShareCard } from "./components/ShareCard";
import { Footer } from "./components/Footer";
import { DevToolsPanel } from "./components/DevToolsPanel";
import { CenteringReport } from "./components/CenteringReport";
import { ChangelogProTier } from "./components/ChangelogProTier";

/* ── Main app: orchestrates chaos state, scores, achievements, and effects ── */
export default function App() {
  const titleGlitch = useGlitchTitle();
  const tip = useRotatingTip();
  const sounds = useSoundEffects();
  const confetti = useConfetti();

  /* Core chaos state */
  const [mode, setMode] = useState<ChaosMode>("subtle");
  const [chaos, setChaos] = useState(0);
  const [applied, setApplied] = useState<string[]>([]);
  const [appliedSnippets, setAppliedSnippets] = useState<CSSSnippet[]>([]);
  const [score, setScore] = useState(0);
  const [highScore] = useState(getHighScore);
  const [globalCounter, setGlobalCounter] = useState(getGlobalCounter);

  /* Achievement tracking */
  const [unlockedIds, setUnlockedIds] = useState<string[]>(getUnlockedAchievements);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);
  const newlyUnlockedTimer = useRef<ReturnType<typeof setTimeout>>();

  /* Easter egg: rubber band overlay when user tries to center */
  const [showRubberBand, setShowRubberBand] = useState(false);

  /* Easter egg: extra snippets unlocked at max chaos */
  const [extraUnlocked, setExtraUnlocked] = useState(false);

  const c = applied.length;
  const isMaxChaos = chaos >= 100;

  /* Check and unlock achievements whenever state changes */
  useEffect(() => {
    const newUnlocks: string[] = [];

    ACHIEVEMENTS.forEach((ach) => {
      if (!unlockedIds.includes(ach.id) && ach.condition(c, score, isMaxChaos)) {
        newUnlocks.push(ach.id);
      }
    });

    if (newUnlocks.length > 0) {
      const allUnlocked = [...unlockedIds, ...newUnlocks];
      setUnlockedIds(allUnlocked);
      saveAchievements(allUnlocked);

      /* Show toast for the first new unlock */
      setNewlyUnlocked(newUnlocks[0]);
      sounds.achievement();
      clearTimeout(newlyUnlockedTimer.current);
      newlyUnlockedTimer.current = setTimeout(() => setNewlyUnlocked(null), 3000);
    }
  }, [c, score, isMaxChaos, unlockedIds, sounds]);

  /* Persist high score */
  useEffect(() => {
    setHighScore(score);
  }, [score]);

  /* Fire confetti and victory sound at max chaos */
  useEffect(() => {
    if (isMaxChaos) {
      confetti.fireChaosConfetti();
      sounds.victory();
      setExtraUnlocked(true);
    }
  }, [isMaxChaos, confetti, sounds]);

  /* Apply a chaos snippet */
  const applyChaos = useCallback(
    (snippet: CSSSnippet, event: React.MouseEvent) => {
      if (applied.includes(snippet.label)) return;

      setApplied((prev) => [...prev, snippet.label]);
      setAppliedSnippets((prev) => [...prev, snippet]);
      setChaos((prev) => Math.min(100, prev + Math.ceil(100 / CSS_SNIPPETS.length)));
      setScore((prev) => prev + snippet.points);

      /* Increment global "layouts liberated" counter */
      setGlobalCounter(incrementGlobalCounter());

      /* Sound effects: crack + alarm scaled to chaos level */
      sounds.crack();
      sounds.alarm(chaos);

      /* Particle burst at click position */
      confetti.fireSnippetParticles(event.clientX, event.clientY);
    },
    [applied, chaos, sounds, confetti]
  );

  /* Apply extra snippet (post-unlock) */
  const applyExtraChaos = useCallback(
    (snippet: CSSSnippet, event: React.MouseEvent) => {
      if (applied.includes(snippet.label)) return;

      setApplied((prev) => [...prev, snippet.label]);
      setAppliedSnippets((prev) => [...prev, snippet]);
      setScore((prev) => prev + snippet.points);

      sounds.crack();
      confetti.fireSnippetParticles(event.clientX, event.clientY);
    },
    [applied, sounds, confetti]
  );

  /* Reset all chaos */
  function resetChaos() {
    setApplied([]);
    setAppliedSnippets([]);
    setChaos(0);
    setScore(0);
    setExtraUnlocked(false);
    sounds.resetVictory();
    confetti.reset();
  }

  /* Easter egg: user tries to center — rubber band snap back */
  const handleTryCenter = useCallback(() => {
    sounds.rubberBand();
    setShowRubberBand(true);
    setTimeout(() => setShowRubberBand(false), 1500);
  }, [sounds]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#00ffff",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scandown { 0%{top:-5%} 100%{top:105%} }
        @keyframes drift { 0%{transform:translateX(0)} 50%{transform:translateX(8px)} 100%{transform:translateX(0)} }
        @keyframes wobble { 0%,100%{transform:rotate(0deg)} 33%{transform:rotate(${c}deg)} 66%{transform:rotate(-${c}deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .snippet-btn:hover { background: #00ffff22 !important; }
      `}</style>

      <ScanlineOverlay />
      <RubberBandOverlay show={showRubberBand} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <Header title={titleGlitch} chaosCount={c} mode={mode} score={score} />

        <ModeSelector activeMode={mode} onModeChange={setMode} />

        <ScoreBoard score={score} highScore={highScore} globalCounter={globalCounter} />

        <ChaosMeter chaos={chaos} />

        <LivePreview
          chaosCount={c}
          appliedSnippets={appliedSnippets}
          mode={mode}
          onTryCenter={handleTryCenter}
        />

        <BeforeAfterSlider
          chaosCount={c}
          appliedSnippets={appliedSnippets}
          mode={mode}
        />

        <SnippetPanel
          snippets={CSS_SNIPPETS}
          applied={applied}
          onApply={applyChaos}
        />

        {/* Easter egg: extra snippets unlocked at max chaos */}
        <AnimatePresence>
          {extraUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SnippetPanel
                snippets={EXTRA_SNIPPETS}
                applied={applied}
                onApply={applyExtraChaos}
                title='EVEN MORE CHAOS — UNLOCKED'
              />
            </motion.div>
          )}
        </AnimatePresence>

        <CSSOutputPanel appliedSnippets={appliedSnippets} />

        {/* DevTools-style CSS inspection panel */}
        <DevToolsPanel appliedSnippets={appliedSnippets} mode={mode} chaos={chaos} />

        {/* Lighthouse-style centering compliance gauges */}
        <CenteringReport appliedSnippets={appliedSnippets} chaos={chaos} score={score} />

        {/* Fake changelog and Pro tier marketing */}
        <ChangelogProTier />

        <Achievements
          achievements={ACHIEVEMENTS}
          unlockedIds={unlockedIds}
          newlyUnlocked={newlyUnlocked}
        />

        <ShareCard score={score} chaosCount={c} mode={mode} />

        {/* Rotating pro tip ticker */}
        <div
          style={{
            marginBottom: "1.5rem",
            borderTop: "1px solid #00ffff22",
            borderBottom: "1px solid #00ffff22",
            padding: "0.5rem 0",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              color: "#00ffff66",
              letterSpacing: "2px",
              animation: "blink 3s infinite",
            }}
          >
            {tip}
          </div>
        </div>

        {/* Reset button */}
        {applied.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
          >
            <motion.button
              onClick={resetChaos}
              whileHover={{ scale: 1.05, borderColor: "#ff000088" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "transparent",
                border: "1px solid #ff000044",
                color: "#ff000066",
                fontFamily: "monospace",
                fontSize: "0.65rem",
                padding: "0.4rem 1rem",
                cursor: "pointer",
                letterSpacing: "2px",
              }}
            >
              RESTORE SANITY (undo all)
            </motion.button>
          </motion.div>
        )}

        <Footer chaosCount={c} mode={mode} />
      </div>
    </div>
  );
}
