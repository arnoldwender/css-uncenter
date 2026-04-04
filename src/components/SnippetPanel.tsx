import { CSS_SNIPPETS } from "../constants";

interface SnippetPanelProps {
  applied: string[];
  onApply: (snippet: (typeof CSS_SNIPPETS)[number]) => void;
}

export function SnippetPanel({ applied, onApply }: SnippetPanelProps) {
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
        APPLY CSS RULES — CLICK TO DESTROY
      </div>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        {CSS_SNIPPETS.map((s, i) => {
          const done = applied.includes(s.label);
          return (
            <div
              key={i}
              className={done ? "" : "snippet-btn"}
              onClick={() => onApply(s)}
              style={{
                border: `1px solid ${done ? "#00ffff44" : "#00ffff22"}`,
                background: done ? "#00ffff0f" : "transparent",
                padding: "0.6rem 0.9rem",
                cursor: done ? "default" : "pointer",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
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
                  {done ? "✓ APPLIED — " : "> "}
                  {s.label}
                </span>
                {!done && (
                  <span style={{ fontSize: "0.58rem", color: "#00ffff44" }}>
                    APPLY
                  </span>
                )}
              </div>
              {done && (
                <pre
                  style={{
                    margin: 0,
                    fontSize: "0.6rem",
                    color: "#00ffff44",
                    lineHeight: "1.6",
                  }}
                >
                  {s.css}
                </pre>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
