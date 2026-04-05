import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type CSSSnippet, type ChaosMode } from "../constants";

/* ── Export as Technical Debt — generates a downloadable CSS file of horrors ── */

interface TechnicalDebtExportProps {
  appliedSnippets: CSSSnippet[];
  mode: ChaosMode;
  chaos: number;
  score: number;
}

/* Generate the terrible-but-valid CSS file content */
function generateTechnicalDebtCSS(
  snippets: CSSSnippet[],
  mode: ChaosMode,
  chaos: number,
  score: number
): string {
  const timestamp = new Date().toISOString();

  const header = `/**
 * ============================================
 *   CSS Un-Center Pro v4.2.0
 *   Enterprise Layout Destruction Edition
 * ============================================
 *
 * Generated: ${timestamp}
 * Chaos Level: ${chaos}%
 * Destruction Score: ${score}
 * Mode: ${mode.toUpperCase()}
 *
 * WARNING: This file contains enterprise-grade
 * technical debt. DO NOT attempt to refactor.
 * The last developer who tried is now a farmer.
 *
 * Licensed under the WTFPL (Do What The F*** You
 * Want To Public License). No warranty expressed
 * or implied. No CSS properties were harmed in
 * the making of this file. (That's a lie.)
 *
 * ============================================
 */

/* DO NOT TOUCH — seriously */
/* I'm sorry */
/* If you're reading this, it's too late */

`;

  /* Global reset that un-centers everything */
  const globalReset = `/* === GLOBAL UN-CENTER RESET === */
/* Removes all traces of centering from the document */
*, *::before, *::after {
  text-align: left !important; /* DO NOT TOUCH */
  margin-left: 0 !important;
  margin-right: 0 !important;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  place-items: unset !important;
  /* I'm sorry */
}

html {
  /* Magic number — changing this breaks everything */
  --chaos-offset: ${chaos > 50 ? "73.6%" : "47px"};
  --why-is-this-here: 42;
  --please-dont-delete: "I need this";
  --todo-fix-later: 9999; /* added 2024-01-15 — still here */
}

`;

  /* Mode-specific global overrides */
  const modeOverrides = mode === "corporate"
    ? `/* === CORPORATE APPROVED OVERRIDES === */
body {
  font-family: 'Comic Sans MS', 'Papyrus', 'Times New Roman', cursive !important;
  background: #f0f0f0 !important; /* Management approved this color */
  color: #333333 !important;
  /* Approved by: Steve from Marketing */
  /* Ticket: JIRA-4892 — "make it pop" */
}

`
    : mode === "anarchy"
    ? `/* === ANARCHY MODE — NO RULES === */
body {
  transform: rotate(${Math.min(chaos * 0.1, 5)}deg) !important; /* DO NOT TOUCH */
  overflow: visible !important; /* Let it flow */
  perspective: 500px !important;
}

`
    : mode === "physics"
    ? `/* === PHYSICS ENGINE OVERRIDE === */
@keyframes gravity-fall {
  0% { transform: translateY(0); }
  100% { transform: translateY(${chaos * 3}px); }
}

body > * {
  animation: gravity-fall 2s ease-in forwards !important;
  /* Isaac Newton approved this */
}

`
    : `/* === SUBTLE DESTRUCTION MODE === */
/* "Nobody will notice" — Famous last words */

`;

  /* Individual snippet rules with maximum !important abuse */
  const snippetRules = snippets.map((snippet, i) => {
    const selector = `.un-centered-${snippet.label.toLowerCase().replace(/\s+/g, "-").replace(/^the-/, "")}`;
    const properties = snippet.css.split("\n").map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      /* Add !important to everything */
      if (trimmed.endsWith(";")) {
        return `  ${trimmed.slice(0, -1)} !important;`;
      }
      return `  ${trimmed} !important;`;
    }).filter(Boolean).join("\n");

    const magicNumbers = [
      `  /* Magic number #${i + 1} — don't ask */`,
      `  z-index: ${9999 - i * 111} !important;`,
      `  opacity: ${Math.max(0.1, 1 - i * 0.08).toFixed(2)} !important;`,
    ].join("\n");

    return `${snippet.funnyComment}
/* Specificity: ${"#id".repeat(Math.min(i + 1, 4))} (just to be safe) */
${selector} {
${properties}
${magicNumbers}
}`;
  }).join("\n\n");

  /* Absurd utility classes */
  const utilityClasses = `
/* === UTILITY CLASSES === */
/* Because utility-first CSS wasn't chaotic enough */

.uncenter-hard {
  margin: -${chaos}px ${chaos * 2}px 0 ${chaos * 3}px !important;
  /* I know what I'm doing */
}

.uncenter-harder {
  position: absolute !important;
  top: -9999px !important;
  left: 73% !important;
  /* the design system is a suggestion */
}

.uncenter-hardest {
  display: table-cell !important;
  vertical-align: bottom !important;
  float: left !important; /* yes, both */
  clear: right !important; /* yes, really */
  /* works on my machine */
}

.help-me {
  /* This class was added at 3am */
  transform: skewX(12deg) rotate(${Math.min(chaos * 0.5, 45)}deg) !important;
  animation: drift 0.5s linear infinite !important;
  /* TODO: remove before production */
  /* UPDATE: this IS production */
}

/* Negative margins for character building */
.margin-negative-everything {
  margin: -${chaos}px !important;
  /* "Negative margins build character" — Ancient CSS Proverb */
}

`;

  /* Responsive breakpoints that make things worse */
  const mediaQueries = `/* === RESPONSIVE UN-CENTERING === */
/* Making sure chaos works on all devices */

@media (max-width: 768px) {
  /* Mobile: even MORE un-centered */
  * {
    margin-left: ${chaos > 50 ? "200px" : "50px"} !important;
    /* WHO NEEDS RESPONSIVE DESIGN */
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet: the forgotten middle child */
  * {
    transform: skewX(${Math.min(chaos * 0.2, 15)}deg) !important;
    /* tablets don't deserve centering either */
  }
}

@media print {
  /* Even printed pages shouldn't be centered */
  * {
    text-align: right !important;
    margin-left: 3in !important;
    /* good luck printing this */
  }
}

`;

  /* Footer comments */
  const footer = `
/* ============================================ */
/* SUMMARY                                       */
/* ============================================ */
/* Total !important declarations: ${(snippets.length * 4 + 20).toString()} */
/* Magic numbers used: ${snippets.length + 7}                    */
/* Developers who will cry: all of them          */
/* CSS specificity wars started: ${snippets.length}               */
/* Lines of code that should be deleted: all     */
/* Therapy sessions recommended: 12+             */
/* ============================================ */

/* END OF FILE — MAY GOD HAVE MERCY ON YOUR LAYOUTS */
`;

  return header + globalReset + modeOverrides + snippetRules + "\n" + utilityClasses + mediaQueries + footer;
}

export function TechnicalDebtExport({ appliedSnippets, mode, chaos, score }: TechnicalDebtExportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  /* Generate the CSS content */
  const cssContent = useMemo(
    () => generateTechnicalDebtCSS(appliedSnippets, mode, chaos, score),
    [appliedSnippets, mode, chaos, score]
  );

  /* Count stats for the preview */
  const importantCount = (cssContent.match(/!important/g) || []).length;
  const magicNumberCount = (cssContent.match(/Magic number/g) || []).length + 7;

  /* Download the CSS file */
  function handleDownload() {
    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "technical-debt-enterprise.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }

  /* Copy to clipboard */
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cssContent);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        style={{
          width: "100%",
          background: "transparent",
          border: "1px solid #ff000033",
          color: "#ff6b6b",
          fontFamily: "monospace",
          fontSize: "0.62rem",
          padding: "0.6rem 0.9rem",
          cursor: "pointer",
          letterSpacing: "2px",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>EXPORT AS TECHNICAL DEBT</span>
          {appliedSnippets.length > 0 && (
            <span style={{ fontSize: "0.5rem", color: "#ff6b6b88" }}>
              ({importantCount} !important declarations ready)
            </span>
          )}
        </span>
        <span style={{ fontSize: "0.7rem" }}>{isOpen ? "[-]" : "[+]"}</span>
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
                border: "1px solid #ff000033",
                borderTop: "none",
                background: "#0a0000",
              }}
            >
              {/* Stats bar */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "8px 12px",
                  borderBottom: "1px solid #ff000022",
                  fontSize: "10px",
                  fontFamily: "monospace",
                }}
              >
                <span style={{ color: "#ff6b6b" }}>
                  !important: <strong>{importantCount}</strong>
                </span>
                <span style={{ color: "#ffa400" }}>
                  Magic #s: <strong>{magicNumberCount}</strong>
                </span>
                <span style={{ color: "#ff00ff" }}>
                  z-index wars: <strong>{appliedSnippets.length}</strong>
                </span>
                <span style={{ color: "#00ffff" }}>
                  Regrets: <strong>{"\u221E"}</strong>
                </span>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  padding: "8px 12px",
                  borderBottom: "1px solid #ff000022",
                }}
              >
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.02, borderColor: "#ff6b6b" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: downloaded ? "#ff6b6b11" : "transparent",
                    border: "1px solid #ff6b6b44",
                    color: downloaded ? "#0cce6b" : "#ff6b6b",
                    fontFamily: "monospace",
                    fontSize: "0.58rem",
                    padding: "0.3rem 0.8rem",
                    cursor: "pointer",
                    letterSpacing: "1px",
                  }}
                >
                  {downloaded ? "DOWNLOADED!" : "DOWNLOAD .CSS"}
                </motion.button>
                <button
                  onClick={handleCopy}
                  style={{
                    background: "transparent",
                    border: "1px solid #ff6b6b33",
                    color: "#ff6b6b88",
                    fontFamily: "monospace",
                    fontSize: "0.58rem",
                    padding: "0.3rem 0.8rem",
                    cursor: "pointer",
                    letterSpacing: "1px",
                  }}
                >
                  COPY TO CLIPBOARD
                </button>
              </div>

              {/* CSS preview */}
              <pre
                style={{
                  margin: 0,
                  padding: "12px",
                  fontSize: "10px",
                  color: "#ff6b6b88",
                  lineHeight: "1.6",
                  overflowX: "auto",
                  maxHeight: "280px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  fontFamily: "'Menlo', 'Monaco', 'Consolas', monospace",
                }}
              >
                {cssContent}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
