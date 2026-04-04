import { motion } from "framer-motion";

/* ── Chaos meter with smooth animated fill and color transitions ── */
interface ChaosMeterProps {
  chaos: number;
}

export function ChaosMeter({ chaos }: ChaosMeterProps) {
  const barColor =
    chaos >= 100 ? "#ff00ff" : chaos > 75 ? "#ff0000" : chaos > 50 ? "#ff9900" : "#00ffff";

  const label =
    chaos >= 100
      ? "MAXIMUM CHAOS"
      : chaos > 75
      ? "CRITICAL"
      : chaos > 50
      ? "ESCALATING"
      : chaos > 25
      ? "WARMING UP"
      : chaos > 0
      ? "MILD DISCOMFORT"
      : "PRISTINE";

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.62rem",
          color: "#00ffff77",
          marginBottom: "0.4rem",
          letterSpacing: "2px",
        }}
      >
        <span>CHAOS LEVEL — {label}</span>
        <motion.span
          key={chaos}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          style={{ color: barColor }}
        >
          {chaos}%
        </motion.span>
      </div>
      <div style={{ height: "6px", background: "#00ffff11", position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{
            width: `${chaos}%`,
            backgroundColor: barColor,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            height: "100%",
            boxShadow: `0 0 10px ${barColor}, 0 0 20px ${barColor}44`,
            position: "relative",
          }}
        />
        {/* Animated glow pulse at the end of the bar */}
        {chaos > 0 && chaos < 100 && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              position: "absolute",
              top: 0,
              left: `${chaos}%`,
              width: "4px",
              height: "100%",
              background: barColor,
              boxShadow: `0 0 8px ${barColor}`,
              transform: "translateX(-50%)",
            }}
          />
        )}
      </div>
      {/* Tick marks */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.2rem" }}>
        {[0, 25, 50, 75, 100].map((tick) => (
          <div
            key={tick}
            style={{
              fontSize: "0.45rem",
              color: chaos >= tick ? barColor : "#00ffff22",
              transition: "color 0.3s",
            }}
          >
            {tick}
          </div>
        ))}
      </div>
    </div>
  );
}
