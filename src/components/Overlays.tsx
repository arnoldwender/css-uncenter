import { motion, AnimatePresence } from "framer-motion";
import { EASTER_EGG_MESSAGES } from "../constants";

/* ── Scanline CRT overlay effect ── */
export function ScanlineOverlay() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.012) 2px,rgba(0,255,255,0.012) 4px)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(0,255,255,0.06)",
          animation: "scandown 7s linear infinite",
          zIndex: 9997,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ── Rubber band overlay — shown when user tries to center something ── */
interface RubberBandOverlayProps {
  show: boolean;
}

export function RubberBandOverlay({ show }: RubberBandOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 0, 0, 0.05)",
            pointerEvents: "none",
            zIndex: 9996,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{
              background: "#000",
              border: "2px solid #ff0000",
              padding: "1rem 2rem",
              fontFamily: "monospace",
              color: "#ff0000",
              fontSize: "0.9rem",
              letterSpacing: "3px",
              boxShadow: "0 0 30px rgba(255, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <div>{EASTER_EGG_MESSAGES.tryCenter}</div>
            <div style={{ fontSize: "0.55rem", color: "#ff000066", marginTop: "0.3rem", letterSpacing: "1px" }}>
              ALL ELEMENTS HAVE BEEN SNAPPED BACK OFF-CENTER
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
