import { motion } from "framer-motion";
import { type ChaosMode } from "../constants";

/* ── App header with glitch title and mode-aware styling ── */
interface HeaderProps {
  title: string;
  chaosCount: number;
  mode: ChaosMode;
  score: number;
}

export function Header({ title, chaosCount: c, mode, score }: HeaderProps) {
  return (
    <motion.div
      animate={{
        marginLeft: c >= 1 ? `${c * 8}px` : "0px",
        rotate: mode === "anarchy" && c >= 3 ? c * 0.5 : 0,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      style={{
        marginBottom: "2rem",
        borderBottom: "1px solid #00ffff33",
        paddingBottom: "1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "0.65rem",
          letterSpacing: "6px",
          color: "#00ffff55",
          marginBottom: "0.5rem",
        }}
      >
        ARNOLD WENDER LAYOUT DESTRUCTION SUITE
      </div>
      <motion.h1
        animate={{
          textAlign: c >= 2 ? "right" : "left",
        }}
        style={{
          fontSize: "clamp(1.4rem,5vw,2.5rem)",
          fontWeight: "normal",
          margin: "0 0 0.3rem",
          letterSpacing: "4px",
          textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
          fontFamily: mode === "corporate" ? "'Comic Sans MS', cursive" : "monospace",
        }}
      >
        {title}
      </motion.h1>
      <div
        style={{
          fontSize: "0.7rem",
          color: "#00ffff88",
          letterSpacing: "2px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>v6.6.6 — MAKING DIVS SUFFER SINCE 2026</span>
        {score > 0 && (
          <motion.span
            key={score}
            initial={{ scale: 1.5, color: "#00ff88" }}
            animate={{ scale: 1, color: "#00ffff88" }}
            style={{ fontSize: "0.65rem", letterSpacing: "1px" }}
          >
            {score} PTS
          </motion.span>
        )}
      </div>
      <motion.div
        animate={{
          justifyContent: c >= 3 ? "flex-end" : "flex-start",
        }}
        style={{
          marginTop: "0.75rem",
          display: "flex",
          gap: "1.5rem",
          fontSize: "0.6rem",
          color: "#00ffff44",
          flexWrap: "wrap",
        }}
      >
        <span>FLEXBOX FREE</span>
        <span>GRID HATER</span>
        <span>FLOAT GANG</span>
        <span>!IMPORTANT EVERYWHERE</span>
      </motion.div>
    </motion.div>
  );
}
