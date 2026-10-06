import { m } from "framer-motion";
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
        {snippets.map((s) => {
          const done = applied.includes(s.label);
          return (
            <m.div
              key={s.label}
              className="snippet-card"
              data-applied={done}
            >
              <m.button
                className="snippet-trigger"
                type="button"
                disabled={done}
                aria-label={`${done ? "Applied" : "Apply"} ${s.label}`}
                onClick={(event) => onApply(s, event)}
                whileHover={done ? {} : { scale: 1.01 }}
                whileTap={done ? {} : { scale: 0.99 }}
              >
                <span>
                  {done ? "\u2713 APPLIED \u2014 " : "> "}
                  {s.label}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                  {!done && (
                    <span>
                      +{s.points} PTS
                    </span>
                  )}
                  {!done && (
                    <span>
                      APPLY
                    </span>
                  )}
                </span>
              </m.button>
              {done && (
                <m.pre
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="snippet-code"
                >
                  {s.funnyComment}{"\n"}{s.css}
                </m.pre>
              )}
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
