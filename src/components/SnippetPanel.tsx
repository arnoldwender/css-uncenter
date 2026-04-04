import { motion } from "framer-motion";
import { type CSSSnippet } from "../constants";

/* ── Snippet panel — click to apply chaos rules to the preview ── */
interface SnippetPanelProps {
  snippets: CSSSnippet[];
  applied: string[];
  onApply: (snippet: CSSSnippet, event: React.MouseEvent) => void;
  title?: string;
}

export function SnippetPanel({ snippets, applied, onApply, title }: SnippetPanelProps) {
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
        {title || "APPLY CSS RULES — CLICK TO DESTROY"}
      </div>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        {snippets.map((s, i) => {
          const done = applied.includes(s.label);
          return (
            <motion.div
              key={i}
              whileHover={done ? {} : { scale: 1.01, borderColor: "#00ffff44" }}
              whileTap={done ? {} : { scale: 0.99 }}
              onClick={(e) => onApply(s, e)}
              style={{
                border: `1px solid ${done ? "#00ffff44" : "#00ffff22"}`,
                background: done ? "#00ffff0f" : "transparent",
                padding: "0.6rem 0.9rem",
                cursor: done ? "default" : "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: done ? "0.4rem" : "0",
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: done ? "#00ffff66" : "#00ffff",
                    letterSpacing: "2px",
                  }}
                >
                  {done ? "\u2713 APPLIED \u2014 " : "> "}
                  {s.label}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {!done && (
                    <span style={{ fontSize: "0.5rem", color: "#00ff8866", letterSpacing: "1px" }}>
                      +{s.points} PTS
                    </span>
                  )}
                  {!done && (
                    <span style={{ fontSize: "0.58rem", color: "#00ffff44" }}>
                      APPLY
                    </span>
                  )}
                </div>
              </div>
              {done && (
                <motion.pre
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    margin: 0,
                    fontSize: "0.6rem",
                    color: "#00ffff44",
                    lineHeight: "1.6",
                  }}
                >
                  {s.funnyComment}{"\n"}{s.css}
                </motion.pre>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
