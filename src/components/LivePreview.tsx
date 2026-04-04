import { motion, AnimatePresence } from "framer-motion";
import { type ChaosMode, type CSSSnippet, EASTER_EGG_MESSAGES } from "../constants";

/* ── Realistic website preview that gets destroyed by chaos ── */
interface LivePreviewProps {
  chaosCount: number;
  appliedSnippets: CSSSnippet[];
  mode: ChaosMode;
  onTryCenter: () => void;
}

/* Framer-motion-compatible transform values for animate prop */
interface ChaosValues {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  skewX: number;
}

/* Calculate cumulative chaos animation values for a preview element */
function getChaosValues(
  snippets: CSSSnippet[],
  mode: ChaosMode,
  elementIndex: number
): ChaosValues {
  if (snippets.length === 0) return { x: 0, y: 0, rotate: 0, scale: 1, skewX: 0 };

  let totalRotation = 0;
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let totalScale = 1;
  let totalSkewX = 0;

  /* Each snippet contributes partial chaos, weighted by element index for variety */
  snippets.forEach((snippet, i) => {
    const effects = snippet.modeEffects[mode];
    const weight = 0.3 + (((i + elementIndex) % 3) * 0.35);

    totalRotation += (effects.rotation || 0) * weight;
    totalOffsetX += (effects.offsetX || 0) * weight;
    totalOffsetY += (effects.offsetY || 0) * weight;
    totalScale *= 1 + ((effects.scale || 1) - 1) * weight * 0.3;
    totalSkewX += (effects.skewX || 0) * weight;
  });

  /* Clamp values so things stay somewhat visible */
  totalOffsetX = Math.max(-250, Math.min(250, totalOffsetX));
  totalOffsetY = Math.max(-150, Math.min(350, totalOffsetY));
  totalScale = Math.max(0.2, Math.min(2.5, totalScale));

  return {
    x: totalOffsetX,
    y: totalOffsetY,
    rotate: totalRotation,
    scale: totalScale,
    skewX: totalSkewX,
  };
}

/* Get font overrides from snippets for inline style */
function getChaosFonts(
  snippets: CSSSnippet[],
  mode: ChaosMode
): { fontFamily?: string; fontSize?: string } {
  let fontFamily: string | undefined;
  let fontSize: string | undefined;

  snippets.forEach((snippet) => {
    const effects = snippet.modeEffects[mode];
    if (effects.fontFamily) fontFamily = effects.fontFamily;
    if (effects.fontSize) fontSize = effects.fontSize;
  });

  return { fontFamily, fontSize };
}

export function LivePreview({ chaosCount, appliedSnippets, mode, onTryCenter }: LivePreviewProps) {
  const c = chaosCount;
  const isMaxChaos = c >= 8;

  /* Corporate mode fonts */
  const corporateFont = mode === "corporate" ? "'Comic Sans MS', 'Papyrus', cursive" : undefined;
  const corporateHeadingFont = mode === "corporate" ? "'Times New Roman', serif" : undefined;
  const fontOverrides = getChaosFonts(appliedSnippets, mode);

  /* Physics mode adds extra vertical offset */
  const physicsGravity = mode === "physics" ? c * 8 : 0;

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <div
          style={{
            fontSize: "0.62rem",
            letterSpacing: "4px",
            color: "#00ffff77",
          }}
        >
          LIVE PREVIEW
        </div>
        {c > 0 && (
          <motion.button
            onClick={onTryCenter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "transparent",
              border: "1px solid #00ffff22",
              color: "#00ffff44",
              fontFamily: "monospace",
              fontSize: "0.55rem",
              padding: "0.2rem 0.6rem",
              cursor: "pointer",
              letterSpacing: "1px",
            }}
          >
            TRY TO CENTER
          </motion.button>
        )}
      </div>

      <div
        style={{
          border: "1px solid #00ffff22",
          background: mode === "corporate" ? "#f0f0f0" : "#00ffff08",
          padding: "0",
          minHeight: "320px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fake website header/nav bar */}
        <motion.div
          animate={{ ...getChaosValues(appliedSnippets, mode, 0), y: getChaosValues(appliedSnippets, mode, 0).y + physicsGravity * 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          style={{
            background: mode === "corporate" ? "#003366" : "#00ffff0a",
            borderBottom: `1px solid ${mode === "corporate" ? "#ccc" : "#00ffff15"}`,
            padding: "0.6rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: fontOverrides.fontFamily || corporateFont,
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              color: mode === "corporate" ? "#ffffff" : "#00ffff",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            {mode === "corporate" ? "ACME CORP" : "GENERIC STARTUP"}
          </div>
          <div style={{ display: "flex", gap: "1rem", fontSize: "0.58rem", color: mode === "corporate" ? "#aaccff" : "#00ffff66" }}>
            <span>Home</span>
            <span>About</span>
            <span>Products</span>
            <span>Contact</span>
          </div>
        </motion.div>

        {/* Hero section */}
        <motion.div
          animate={{ ...getChaosValues(appliedSnippets, mode, 1), y: getChaosValues(appliedSnippets, mode, 1).y + physicsGravity * 0.5 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          style={{
            padding: "1.5rem 1rem",
            textAlign: "center",
            fontFamily: fontOverrides.fontFamily || corporateHeadingFont,
          }}
        >
          <div
            style={{
              fontSize: fontOverrides.fontSize || (c >= 4 ? "0.5rem" : "1.1rem"),
              color: mode === "corporate" ? "#333" : "#00ffff",
              marginBottom: "0.5rem",
              letterSpacing: c >= 4 ? "8px" : "1px",
              transition: "all 0.3s",
              fontFamily: fontOverrides.fontFamily || corporateHeadingFont,
            }}
          >
            {mode === "corporate" ? "Welcome to Our Enterprise Solution" : "Welcome to Our Website\u2122"}
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              color: mode === "corporate" ? "#666" : "#00ffff88",
              lineHeight: "1.6",
              maxWidth: "400px",
              margin: "0 auto",
              fontFamily: fontOverrides.fontFamily || corporateFont,
            }}
          >
            {c >= 6
              ? "SEND HELP. THE CSS IS FIGHTING BACK."
              : c >= 3
              ? "Please ignore the layout. It's intentional. (It's not.)"
              : "This is our compelling value proposition that will convince you to buy our product."}
          </div>
        </motion.div>

        {/* Cards row */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            padding: "0 1rem",
            justifyContent: "center",
          }}
        >
          {["Fast", "Reliable", "Affordable"].map((label, i) => {
            const vals = getChaosValues(appliedSnippets, mode, i + 2);
            return (
              <motion.div
                key={label}
                animate={{ ...vals, y: vals.y + physicsGravity * (0.6 + i * 0.15) }}
                transition={{ type: "spring", stiffness: 80 + i * 20, damping: 10 + i * 3 }}
                style={{
                  border: `1px solid ${mode === "corporate" ? "#ccc" : "#00ffff22"}`,
                  background: mode === "corporate" ? "#fff" : "#00ffff05",
                  padding: "0.8rem 0.6rem",
                  flex: 1,
                  maxWidth: "130px",
                  textAlign: "center",
                  fontFamily: fontOverrides.fontFamily || corporateFont,
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: mode === "corporate" ? "#333" : "#00ffff",
                    marginBottom: "0.3rem",
                    fontWeight: "bold",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "0.55rem", color: mode === "corporate" ? "#999" : "#00ffff55", lineHeight: "1.4" }}>
                  {c >= 5 ? "????" : "Lorem ipsum dolor sit amet."}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA button */}
        <motion.div
          animate={{ ...getChaosValues(appliedSnippets, mode, 5), y: getChaosValues(appliedSnippets, mode, 5).y + physicsGravity * 0.8 }}
          transition={{ type: "spring", stiffness: 90, damping: 12 }}
          style={{
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <motion.button
            whileHover={{ scale: c < 3 ? 1.05 : 0.95 }}
            style={{
              background: mode === "corporate" ? "#003366" : "transparent",
              border: `1px solid ${c >= 5 ? "#ff0000" : mode === "corporate" ? "#003366" : "#00ffff"}`,
              color: c >= 5 ? "#ff0000" : mode === "corporate" ? "#fff" : "#00ffff",
              fontFamily: fontOverrides.fontFamily || corporateFont || "monospace",
              fontSize: c >= 6 ? "0.4rem" : "0.72rem",
              padding: "0.5rem 1.2rem",
              cursor: "pointer",
              letterSpacing: "2px",
              transition: "all 0.3s",
            }}
          >
            {c >= 5 ? "HELP" : c >= 3 ? "PLEASE STOP" : "BUY NOW"}
          </motion.button>
        </motion.div>

        {/* Footer bar in preview */}
        <motion.div
          animate={{ ...getChaosValues(appliedSnippets, mode, 6), y: getChaosValues(appliedSnippets, mode, 6).y + physicsGravity }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          style={{
            borderTop: `1px solid ${mode === "corporate" ? "#ccc" : "#00ffff11"}`,
            padding: "0.5rem 1rem",
            fontSize: "0.5rem",
            color: mode === "corporate" ? "#999" : "#00ffff33",
            textAlign: "center",
            fontFamily: fontOverrides.fontFamily || corporateFont,
          }}
        >
          {mode === "corporate" ? "Copyright 2003 ACME Corp. All Rights Reserved. Best viewed in IE6." : "2026 Generic Startup Inc. No divs were centered."}
        </motion.div>

        {/* Max chaos watermark */}
        <AnimatePresence>
          {isMaxChaos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: -30 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) rotate(-30deg)",
                fontSize: "1.5rem",
                color: "#ff000033",
                pointerEvents: "none",
                fontFamily: "monospace",
                letterSpacing: "4px",
                textAlign: "center",
                lineHeight: "1.8",
              }}
            >
              <div>MAXIMUM</div>
              <div>CHAOS</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Easter egg: max chaos message */}
        <AnimatePresence>
          {isMaxChaos && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: "absolute",
                bottom: "40px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "0.6rem",
                color: "#ff00ff",
                fontFamily: "monospace",
                letterSpacing: "1px",
                textShadow: "0 0 10px #ff00ff",
                whiteSpace: "nowrap",
              }}
            >
              {EASTER_EGG_MESSAGES.maxChaos}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
