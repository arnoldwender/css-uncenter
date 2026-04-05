import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type CSSSnippet } from "../constants";

/* ── Lighthouse-style Centering Compliance Report ── */

interface LighthouseReportProps {
  appliedSnippets: CSSSnippet[];
  chaos: number;
  score: number;
}

/* SVG circular gauge component mimicking Lighthouse performance circles */
function LighthouseGauge({
  value,
  label,
  sublabel,
  delay = 0,
}: {
  value: number;
  label: string;
  sublabel: string;
  delay?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  /* Determine color based on value — Lighthouse style */
  const color =
    animatedValue >= 90
      ? "#0cce6b"
      : animatedValue >= 50
      ? "#ffa400"
      : "#ff4e42";

  /* Animate the gauge value down from 100 */
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <div style={{ position: "relative", width: "100px", height: "100px", margin: "0 auto" }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#1e1e1e"
            strokeWidth="6"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              filter: `drop-shadow(0 0 6px ${color}66)`,
            }}
          />
        </svg>
        {/* Center value */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay / 1000 + 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color,
              fontFamily: "'Menlo', monospace",
            }}
          >
            {animatedValue}
          </span>
        </motion.div>
      </div>
      <div
        style={{
          marginTop: "8px",
          fontSize: "10px",
          color: "#e8eaed",
          letterSpacing: "1px",
          fontFamily: "'Menlo', monospace",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "9px",
          color,
          letterSpacing: "0.5px",
          marginTop: "2px",
          fontFamily: "'Menlo', monospace",
        }}
      >
        {sublabel}
      </div>
    </div>
  );
}

/* Recommendation items that can be expanded */
function Recommendation({
  title,
  description,
  severity,
  index,
}: {
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const colors = {
    critical: "#ff4e42",
    warning: "#ffa400",
    info: "#00bcd4",
  };
  const icons = {
    critical: "\u2716",
    warning: "\u26A0",
    info: "\u2139",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        borderBottom: "1px solid #3c3c3c",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textAlign: "left",
          fontFamily: "'Menlo', monospace",
        }}
      >
        <span style={{ color: colors[severity], fontSize: "12px", flexShrink: 0 }}>
          {icons[severity]}
        </span>
        <span style={{ color: "#e8eaed", fontSize: "11px", flex: 1 }}>
          {title}
        </span>
        <span style={{ color: "#5f6368", fontSize: "10px" }}>
          {expanded ? "\u25B2" : "\u25BC"}
        </span>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "4px 12px 10px 32px",
                fontSize: "10px",
                color: "#9aa0a6",
                lineHeight: "1.6",
              }}
            >
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LighthouseReport({ appliedSnippets, chaos, score: _score }: LighthouseReportProps) {
  const [isOpen, setIsOpen] = useState(false);

  /* Calculate gauge values — lower is "worse" for centering compliance */
  const snippetCount = appliedSnippets.length;
  const horizontalScore = Math.max(0, 100 - chaos);
  const verticalScore = Math.max(0, Math.min(100, 100 - snippetCount * 14));
  const flexboxScore = snippetCount >= 3 ? 0 : Math.max(0, 100 - snippetCount * 40);

  /* Build recommendations based on what's been destroyed */
  const recommendations = [
    ...(snippetCount >= 1
      ? [
          {
            title: "Consider using margin: auto \u2014 just kidding, we removed it",
            description:
              "The margin: auto property was found providing alignment to 3 elements. It has been replaced with margin: -47px 73.6% 0 -200px for maximum layout liberation. Estimated savings: 0 bytes (we added more CSS).",
            severity: "critical" as const,
          },
        ]
      : []),
    ...(snippetCount >= 2
      ? [
          {
            title: "Flexbox justify-content: center detected and neutralized",
            description:
              "Found 7 instances of justify-content: center. All have been converted to justify-content: space-around with negative margins. The flex container no longer recognizes its children.",
            severity: "critical" as const,
          },
        ]
      : []),
    ...(snippetCount >= 3
      ? [
          {
            title: "text-align: center is a crutch \u2014 removed for accessibility",
            description:
              "Studies show* that left-aligned text is 47% easier to read. That's why we replaced all centered text with text-align: right and a -3px letter-spacing. *Studies conducted by the CSS Un-Center Research Institute.",
            severity: "warning" as const,
          },
        ]
      : []),
    ...(snippetCount >= 4
      ? [
          {
            title: "Grid place-items: center eliminated",
            description:
              "CSS Grid was using place-items: center to achieve effortless centering. This level of convenience is unacceptable. Replaced with 17 lines of float-based positioning.",
            severity: "critical" as const,
          },
        ]
      : []),
    ...(snippetCount >= 5
      ? [
          {
            title: "position: absolute recommended for all elements",
            description:
              "By setting every element to position: absolute, we ensure that no element can rely on the document flow for centering. Each element must find its own way in this world.",
            severity: "warning" as const,
          },
        ]
      : []),
    ...(chaos >= 75
      ? [
          {
            title: "Design system integrity: COMPROMISED (as intended)",
            description:
              "Your design tokens have been overridden with !important declarations. The spacing scale now uses prime numbers instead of multiples of 8. Border radius values are negative.",
            severity: "info" as const,
          },
        ]
      : []),
  ];

  /* Opportunities — potential centering still to destroy */
  const opportunities = [
    { element: "<main>", property: "margin: 0 auto", potential: "+15 pts" },
    { element: "<nav>", property: "display: flex; justify-content: center", potential: "+20 pts" },
    { element: "<footer>", property: "text-align: center", potential: "+10 pts" },
    { element: "<img>", property: "display: block; margin: auto", potential: "+12 pts" },
    { element: "<h1>", property: "text-align: center", potential: "+8 pts" },
  ];

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        style={{
          width: "100%",
          background: "#1e1e1e",
          border: "1px solid #3c3c3c",
          borderBottom: isOpen ? "none" : "1px solid #3c3c3c",
          color: "#e8eaed",
          fontFamily: "'Menlo', 'Monaco', 'Consolas', monospace",
          fontSize: "11px",
          padding: "6px 10px",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#ffa400", fontSize: "14px" }}>{"\u25CF"}</span>
          <span>Centering Compliance Report</span>
          {snippetCount > 0 && (
            <span style={{ color: "#ff4e42", fontSize: "9px" }}>
              {snippetCount} violation{snippetCount !== 1 ? "s" : ""}
            </span>
          )}
        </span>
        <span style={{ color: "#5f6368", fontSize: "10px" }}>
          {isOpen ? "[-]" : "[+]"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                background: "#1e1e1e",
                border: "1px solid #3c3c3c",
                borderTop: "none",
                fontFamily: "'Menlo', 'Monaco', 'Consolas', monospace",
              }}
            >
              {/* Gauges row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "24px 16px",
                  borderBottom: "1px solid #3c3c3c",
                }}
              >
                <LighthouseGauge
                  value={horizontalScore}
                  label="Horizontal"
                  sublabel={horizontalScore === 0 ? "DESTROYED" : horizontalScore < 50 ? "COMPROMISED" : "AT RISK"}
                  delay={0}
                />
                <LighthouseGauge
                  value={verticalScore}
                  label="Vertical"
                  sublabel={verticalScore <= 3 ? "COMPROMISED" : verticalScore < 50 ? "DEGRADED" : "VULNERABLE"}
                  delay={200}
                />
                <LighthouseGauge
                  value={flexboxScore}
                  label="Flexbox"
                  sublabel={flexboxScore === 0 ? "VIOLATED" : flexboxScore < 50 ? "WEAKENED" : "INTACT"}
                  delay={400}
                />
              </div>

              {/* Diagnostics section */}
              {recommendations.length > 0 && (
                <div>
                  <div
                    style={{
                      padding: "10px 12px",
                      fontSize: "11px",
                      color: "#e8eaed",
                      borderBottom: "1px solid #3c3c3c",
                      background: "#252526",
                    }}
                  >
                    Diagnostics ({recommendations.length})
                  </div>
                  {recommendations.map((rec, i) => (
                    <Recommendation
                      key={i}
                      title={rec.title}
                      description={rec.description}
                      severity={rec.severity}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {/* Opportunities section */}
              <div>
                <div
                  style={{
                    padding: "10px 12px",
                    fontSize: "11px",
                    color: "#e8eaed",
                    borderBottom: "1px solid #3c3c3c",
                    background: "#252526",
                  }}
                >
                  Opportunities \u2014 Centering to Destroy
                </div>
                {opportunities.slice(0, Math.max(1, 5 - snippetCount)).map((opp, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "6px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #3c3c3c22",
                      fontSize: "10px",
                    }}
                  >
                    <div>
                      <span style={{ color: "#9cdcfe" }}>{opp.element}</span>
                      <span style={{ color: "#5f6368" }}>{" \u2192 "}</span>
                      <span style={{ color: "#ce9148" }}>{opp.property}</span>
                    </div>
                    <span style={{ color: "#0cce6b", fontSize: "9px" }}>{opp.potential}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: "8px 12px",
                  fontSize: "9px",
                  color: "#5f6368",
                  textAlign: "center",
                }}
              >
                Generated by CSS Un-Center Lighthouse v6.6.6 \u2014 Not affiliated with Google (obviously)
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
