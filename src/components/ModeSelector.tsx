import { m } from "framer-motion";
import { CHAOS_MODES, type ChaosMode } from "../constants";

/* ── Mode selector tabs for switching chaos style ── */
interface ModeSelectorProps {
  activeMode: ChaosMode;
  onModeChange: (mode: ChaosMode) => void;
}

export function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          fontSize: "0.62rem",
          letterSpacing: "4px",
          color: "#00ffff77",
          marginBottom: "0.75rem",
        }}
      >
        UN-CENTERING MODE
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem" }}>
        {CHAOS_MODES.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <m.button
              key={mode.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onModeChange(mode.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: isActive ? "#00ffff15" : "transparent",
                border: `1px solid ${isActive ? "#00ffff66" : "#00ffff22"}`,
                color: isActive ? "#00ffff" : "#00ffff77",
                fontFamily: "monospace",
                fontSize: "var(--text-body)",
                padding: "0.6rem 0.5rem",
                cursor: "pointer",
                textAlign: "left",
                letterSpacing: "1px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isActive && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "3px",
                    height: "100%",
                    background: "#00ffff",
                    boxShadow: "0 0 8px #00ffff",
                  }}
                />
              )}
              <div style={{ fontWeight: isActive ? "bold" : "normal", marginBottom: "0.2rem" }}>
                {isActive ? "> " : "  "}{mode.label}
              </div>
              <div style={{ fontSize: "var(--text-body)", color: "var(--color-text-readable)", lineHeight: "var(--line-body)" }}>
                {mode.description}
              </div>
            </m.button>
          );
        })}
      </div>
    </div>
  );
}
