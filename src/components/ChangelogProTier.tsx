import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Fake Changelog + Pro Tier marketing panel ── */

interface ChangelogEntry {
  version: string;
  date: string;
  type: "feature" | "fix" | "breaking";
  title: string;
  description: string;
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v4.2.0",
    date: "2026-04-01",
    type: "feature",
    title: "Added 'Corporate Approved' mode",
    description:
      "Everything is now left-aligned in Comic Sans. Management signed off on this. HR has been notified.",
  },
  {
    version: "v4.1.3",
    date: "2026-03-28",
    type: "fix",
    title: "Fixed: elements occasionally re-centered themselves out of self-respect",
    description:
      "Some DOM elements were overriding our chaos with their own display: flex. Added 47 additional !important declarations to prevent CSS self-healing.",
  },
  {
    version: "v4.1.2",
    date: "2026-03-15",
    type: "feature",
    title: "Negative margin personality profiles",
    description:
      "Each element now receives a personalized negative margin based on its tag name, class count, and position in the DOM. Results may vary. Results WILL vary.",
  },
  {
    version: "v4.1.1",
    date: "2026-03-08",
    type: "fix",
    title: "Fixed: z-index: 9999 was not high enough",
    description:
      "Increased maximum z-index to 2147483647. Some elements were escaping to higher stacking contexts. They have been contained.",
  },
  {
    version: "v4.1.0",
    date: "2026-02-28",
    type: "feature",
    title: "Added Physics Mode",
    description:
      "Elements now obey gravity (but not CSS specifications). Isaac Newton would be proud. Tim Berners-Lee would not.",
  },
  {
    version: "v4.0.0",
    date: "2026-02-14",
    type: "breaking",
    title: "BREAKING: Removed all centering support entirely",
    description:
      "After careful consideration, we've decided that centering was a mistake. All center-related CSS properties now resolve to 'unset'. This affects 100% of users. We're not sorry.",
  },
  {
    version: "v3.9.9",
    date: "2026-01-31",
    type: "fix",
    title: "Fixed: margin: auto was auto-correcting our chaos",
    description:
      "Browser vendors have been contacted about this clearly unintended behavior. In the meantime, we've monkey-patched the CSS parser.",
  },
  {
    version: "v3.9.0",
    date: "2026-01-15",
    type: "feature",
    title: "Enterprise SSO integration for Layout Destruction",
    description:
      "Your team can now share a single chaos configuration across all projects. Syncs with Jira, Confluence, and your manager's disappointment.",
  },
];

/* Pro tier feature cards */
const PRO_FEATURES = [
  {
    tier: "PRO",
    price: "$9.99/mo",
    features: [
      "Unlimited !important declarations",
      "Custom negative margin presets",
      "Priority chaos rendering",
      "Export to SCSS (with extra nesting)",
      "Slack integration for chaos alerts",
    ],
  },
  {
    tier: "ENTERPRISE",
    price: "$99.99/mo",
    features: [
      "Everything in Pro",
      "Design system destruction API",
      "CI/CD pipeline chaos injection",
      "SOC 2 compliant un-centering",
      "Dedicated chaos engineer support",
      "Custom Comic Sans licensing",
      "99.9% chaos uptime SLA",
    ],
  },
  {
    tier: "CHAOS UNLIMITED",
    price: "$999/mo",
    features: [
      "Everything in Enterprise",
      "We come to your office and un-center your monitors",
      "Complimentary therapy sessions",
      "Legal defense fund for CSS crimes",
      "Personal apology letter from your browser",
      "Annual retreat to the Island of Misaligned Divs",
    ],
  },
];

export function ChangelogProTier() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"changelog" | "pro">("changelog");

  const typeColors = {
    feature: "#0cce6b",
    fix: "#ffa400",
    breaking: "#ff4e42",
  };

  const typeLabels = {
    feature: "NEW",
    fix: "FIX",
    breaking: "BREAKING",
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        style={{
          width: "100%",
          background: "transparent",
          border: "1px solid #00ffff22",
          color: "#00ffff77",
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
          <span>CHANGELOG + PRO TIER</span>
          <span
            style={{
              fontSize: "0.45rem",
              background: "#ff00ff22",
              color: "#ff00ff",
              padding: "1px 6px",
              letterSpacing: "1px",
            }}
          >
            NEW
          </span>
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
                border: "1px solid #00ffff22",
                borderTop: "none",
                background: "#00ffff03",
              }}
            >
              {/* Section tabs */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid #00ffff11",
                }}
              >
                {(["changelog", "pro"] as const).map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    style={{
                      flex: 1,
                      background: activeSection === section ? "#00ffff0a" : "transparent",
                      border: "none",
                      borderBottom: activeSection === section ? "2px solid #00ffff" : "2px solid transparent",
                      color: activeSection === section ? "#00ffff" : "#00ffff55",
                      fontFamily: "monospace",
                      fontSize: "0.58rem",
                      padding: "8px",
                      cursor: "pointer",
                      letterSpacing: "2px",
                    }}
                  >
                    {section === "changelog" ? "CHANGELOG" : "UPGRADE TO PRO"}
                  </button>
                ))}
              </div>

              {/* Changelog section */}
              {activeSection === "changelog" && (
                <div
                  style={{
                    maxHeight: "380px",
                    overflowY: "auto",
                    padding: "8px 0",
                  }}
                >
                  {CHANGELOG.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        padding: "8px 12px",
                        borderBottom: "1px solid #00ffff08",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "9px",
                            color: typeColors[entry.type],
                            border: `1px solid ${typeColors[entry.type]}44`,
                            padding: "1px 5px",
                            letterSpacing: "1px",
                          }}
                        >
                          {typeLabels[entry.type]}
                        </span>
                        <span style={{ fontSize: "10px", color: "#00ffff88", fontFamily: "monospace" }}>
                          {entry.version}
                        </span>
                        <span style={{ fontSize: "9px", color: "#00ffff33" }}>
                          {entry.date}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#e8eaed", fontFamily: "monospace", marginBottom: "2px" }}>
                        {entry.title}
                      </div>
                      <div style={{ fontSize: "10px", color: "#9aa0a6", lineHeight: "1.5", fontFamily: "monospace" }}>
                        {entry.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pro tier section */}
              {activeSection === "pro" && (
                <div style={{ padding: "16px 12px" }}>
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "16px",
                      fontFamily: "monospace",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#00ffff", letterSpacing: "3px", marginBottom: "4px" }}>
                      UPGRADE YOUR DESTRUCTION
                    </div>
                    <div style={{ fontSize: "10px", color: "#00ffff55" }}>
                      Enterprise Layout Destruction — integrates with your design system to systematically break it
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {PRO_FEATURES.map((tier, i) => (
                      <motion.div
                        key={tier.tier}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                          border: `1px solid ${i === 2 ? "#ff00ff44" : "#00ffff22"}`,
                          background: i === 2 ? "#ff00ff08" : "#00ffff05",
                          padding: "12px 8px",
                          textAlign: "center",
                          fontFamily: "monospace",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {i === 2 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "4px",
                              right: "-20px",
                              background: "#ff00ff",
                              color: "#000",
                              fontSize: "7px",
                              padding: "2px 24px",
                              transform: "rotate(35deg)",
                              letterSpacing: "1px",
                              fontWeight: "bold",
                            }}
                          >
                            POPULAR
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: "11px",
                            color: i === 2 ? "#ff00ff" : "#00ffff",
                            letterSpacing: "2px",
                            marginBottom: "4px",
                          }}
                        >
                          {tier.tier}
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            color: "#e8eaed",
                            marginBottom: "8px",
                          }}
                        >
                          {tier.price}
                        </div>
                        <div style={{ textAlign: "left" }}>
                          {tier.features.map((feat, j) => (
                            <div
                              key={j}
                              style={{
                                fontSize: "9px",
                                color: "#9aa0a6",
                                padding: "2px 0",
                                borderBottom: "1px solid #ffffff08",
                                lineHeight: "1.5",
                              }}
                            >
                              <span style={{ color: "#0cce6b", marginRight: "4px" }}>{"\u2713"}</span>
                              {feat}
                            </div>
                          ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            marginTop: "10px",
                            width: "100%",
                            background: i === 2 ? "#ff00ff22" : "transparent",
                            border: `1px solid ${i === 2 ? "#ff00ff66" : "#00ffff33"}`,
                            color: i === 2 ? "#ff00ff" : "#00ffff88",
                            fontFamily: "monospace",
                            fontSize: "9px",
                            padding: "5px",
                            cursor: "pointer",
                            letterSpacing: "1px",
                          }}
                          onClick={() => alert("Just kidding. This is free. Chaos can't be monetized.")}
                        >
                          {i === 2 ? "EMBRACE CHAOS" : "SELECT PLAN"}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Fine print */}
                  <div
                    style={{
                      marginTop: "12px",
                      fontSize: "8px",
                      color: "#5f636866",
                      textAlign: "center",
                      lineHeight: "1.6",
                      fontFamily: "monospace",
                    }}
                  >
                    * All plans include unlimited regret. Prices in Chaos Coins (1 CC = whatever we feel like today).
                    <br />
                    No refunds. No support. No centering. Enterprise SLA covers chaos uptime only.
                    <br />
                    "Popular" badge was self-assigned by the CSS Un-Center marketing department (1 person).
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
