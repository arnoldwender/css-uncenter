import { motion } from "framer-motion";

/* ── Score display showing current points, high score, and global counter ── */
interface ScoreBoardProps {
  score: number;
  highScore: number;
  globalCounter: number;
}

export function ScoreBoard({ score, highScore, globalCounter }: ScoreBoardProps) {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.5rem",
      }}
    >
      {/* Current score */}
      <div
        style={{
          border: "1px solid #00ffff22",
          padding: "0.6rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "0.5rem", color: "#00ffff55", letterSpacing: "2px", marginBottom: "0.3rem" }}>
          SCORE
        </div>
        <motion.div
          key={score}
          initial={{ scale: 1.3, color: "#00ff88" }}
          animate={{ scale: 1, color: "#00ffff" }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "1.2rem",
            fontFamily: "monospace",
            fontWeight: "bold",
            textShadow: "0 0 10px #00ffff44",
          }}
        >
          {score}
        </motion.div>
      </div>

      {/* High score */}
      <div
        style={{
          border: "1px solid #00ffff22",
          padding: "0.6rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "0.5rem", color: "#00ffff55", letterSpacing: "2px", marginBottom: "0.3rem" }}>
          HIGH SCORE
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            fontFamily: "monospace",
            color: score >= highScore && score > 0 ? "#ffff00" : "#00ffff88",
            fontWeight: "bold",
          }}
        >
          {Math.max(score, highScore)}
        </div>
      </div>

      {/* Global counter */}
      <div
        style={{
          border: "1px solid #00ffff22",
          padding: "0.6rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "0.5rem", color: "#00ffff55", letterSpacing: "2px", marginBottom: "0.3rem" }}>
          LIBERATED
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            fontFamily: "monospace",
            color: "#00ffff88",
            fontWeight: "bold",
          }}
        >
          {globalCounter}
        </div>
      </div>
    </div>
  );
}
