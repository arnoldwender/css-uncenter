import { motion } from "framer-motion";
import { type ChaosMode } from "../constants";

/* ── Footer with chaos-reactive transforms ── */
interface FooterProps {
  chaosCount: number;
  mode: ChaosMode;
}

export function Footer({ chaosCount: c, mode }: FooterProps) {
  return (
    <motion.div
      animate={{
        textAlign: c >= 3 ? "right" : "center",
        rotate: c >= 4 ? 1 : 0,
        x: mode === "anarchy" && c >= 2 ? c * 5 : 0,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{
        borderTop: "1px solid #00ffff22",
        paddingTop: "1.5rem",
        fontSize: "0.58rem",
        color: "#00ffff33",
        letterSpacing: "2px",
        lineHeight: "2.2",
        fontFamily: mode === "corporate" ? "'Papyrus', fantasy" : "monospace",
      }}
    >
      <div>
        CSS UN-CENTER PRO — BECAUSE CENTERED LAYOUTS ARE TOO MAINSTREAM
      </div>
      <div>
        BUILT BY WENDER MEDIA — WE KNOW HOW TO CENTER DIVS. WE JUST CHOSE NOT
        TO.
      </div>
      <div style={{ color: "#ff000022", marginTop: "0.3rem" }}>
        HTTP 418 — EVEN THIS FOOTER IS MISALIGNED
      </div>
    </motion.div>
  );
}
