import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type CSSSnippet, type ChaosMode } from "../constants";

/* ── Chrome DevTools-style side panel showing CSS property modifications ── */

interface DevToolsPanelProps {
  appliedSnippets: CSSSnippet[];
  mode: ChaosMode;
  chaos: number;
}

/* Properties that get "destroyed" — shown with strikethrough */
const CENTERED_PROPERTIES = [
  { prop: "justify-content", oldVal: "center", newVal: "flex-start" },
  { prop: "align-items", oldVal: "center", newVal: "flex-end" },
  { prop: "text-align", oldVal: "center", newVal: "right" },
  { prop: "margin", oldVal: "0 auto", newVal: "-47px 73.6% 0 -200px" },
  { prop: "display", oldVal: "flex", newVal: "table-cell" },
  { prop: "place-items", oldVal: "center", newVal: "unset" },
  { prop: "align-self", oldVal: "center", newVal: "flex-end" },
  { prop: "transform", oldVal: "translateX(-50%)", newVal: "skewX(12deg) rotate(7deg)" },
];

/* Computed box model values that get increasingly absurd */
const getBoxModelValues = (chaos: number) => ({
  marginTop: chaos > 50 ? "-847px" : chaos > 25 ? "-47px" : "0",
  marginRight: chaos > 75 ? "73.6%" : chaos > 25 ? "-150px" : "0",
  marginBottom: chaos > 50 ? "9999px" : "0",
  marginLeft: chaos > 25 ? `${Math.floor(chaos * 8.47)}px` : "0",
  paddingTop: chaos > 75 ? "0" : "16px",
  paddingRight: chaos > 50 ? "847px" : "16px",
  paddingBottom: chaos > 75 ? "0" : "16px",
  paddingLeft: chaos > 50 ? "0" : "16px",
  width: chaos > 50 ? "9999px" : "auto",
  height: chaos > 75 ? "-40px" : "auto",
});

export function DevToolsPanel({ appliedSnippets, mode, chaos }: DevToolsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"styles" | "computed">("styles");

  /* How many properties are "destroyed" based on applied snippets */
  const destroyedCount = Math.min(appliedSnippets.length, CENTERED_PROPERTIES.length);
  const boxModel = getBoxModelValues(chaos);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      {/* Panel toggle styled like DevTools tab bar */}
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
          <span style={{ color: "#9aa0a6", fontSize: "10px" }}>{">"}</span>
          <span style={{ color: "#00ffff" }}>Elements</span>
          <span style={{ color: "#5f6368" }}>|</span>
          <span style={{ color: "#9aa0a6" }}>Styles</span>
          <span style={{ color: "#5f6368" }}>|</span>
          <span style={{ color: "#9aa0a6" }}>Computed</span>
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
                fontSize: "11px",
              }}
            >
              {/* Tab bar mimicking DevTools sub-tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  borderBottom: "1px solid #3c3c3c",
                  background: "#252526",
                }}
              >
                {(["styles", "computed"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? "#1e1e1e" : "transparent",
                      border: "none",
                      borderBottom: activeTab === tab ? "2px solid #00bcd4" : "2px solid transparent",
                      color: activeTab === tab ? "#e8eaed" : "#9aa0a6",
                      fontFamily: "'Menlo', 'Monaco', 'Consolas', monospace",
                      fontSize: "11px",
                      padding: "6px 16px",
                      cursor: "pointer",
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Styles tab — shows CSS properties being modified */}
              {activeTab === "styles" && (
                <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                  {/* Element selector header */}
                  <div
                    style={{
                      padding: "8px 12px",
                      borderBottom: "1px solid #3c3c3c",
                      color: "#9aa0a6",
                      fontSize: "10px",
                    }}
                  >
                    <span style={{ color: "#9cdcfe" }}>element.style</span>
                    <span style={{ color: "#5f6368" }}> {`{`}</span>
                  </div>

                  {/* Properties list */}
                  <div style={{ padding: "4px 0" }}>
                    {CENTERED_PROPERTIES.map((item, i) => {
                      const isDestroyed = i < destroyedCount;
                      const snippet = appliedSnippets[i];

                      return (
                        <div
                          key={i}
                          style={{
                            padding: "2px 12px 2px 24px",
                            lineHeight: "18px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {/* Checkbox */}
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              border: `1px solid ${isDestroyed ? "#ff6b6b44" : "#5f6368"}`,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "8px",
                              color: isDestroyed ? "#ff6b6b" : "#5f6368",
                              flexShrink: 0,
                            }}
                          >
                            {isDestroyed ? "" : "\u2713"}
                          </span>

                          <div style={{ flex: 1 }}>
                            {/* Original property — struck through if destroyed */}
                            {isDestroyed && (
                              <div
                                style={{
                                  textDecoration: "line-through",
                                  color: "#9aa0a666",
                                  marginBottom: "1px",
                                }}
                              >
                                <span style={{ color: "#9cdcfe66" }}>{item.prop}</span>
                                <span style={{ color: "#5f636866" }}>: </span>
                                <span style={{ color: "#ce914866" }}>{item.oldVal}</span>
                                <span style={{ color: "#5f636866" }}>;</span>
                              </div>
                            )}

                            {/* New or original property */}
                            <div>
                              <span style={{ color: isDestroyed ? "#9cdcfe" : "#9cdcfe" }}>
                                {item.prop}
                              </span>
                              <span style={{ color: "#d4d4d4" }}>: </span>
                              <span
                                style={{
                                  color: isDestroyed ? "#e9950c" : "#ce9148",
                                  background: isDestroyed ? "#e9950c11" : "transparent",
                                  padding: isDestroyed ? "0 3px" : 0,
                                }}
                              >
                                {isDestroyed ? item.newVal : item.oldVal}
                              </span>
                              {isDestroyed && (
                                <span
                                  style={{
                                    color: "#f44336",
                                    fontSize: "9px",
                                    marginLeft: "4px",
                                  }}
                                >
                                  !important
                                </span>
                              )}
                              <span style={{ color: "#5f6368" }}>;</span>
                            </div>

                            {/* Inherited from chaos.css */}
                            {isDestroyed && snippet && (
                              <div
                                style={{
                                  fontSize: "9px",
                                  color: "#5f6368",
                                  marginTop: "2px",
                                }}
                              >
                                Inherited from:{" "}
                                <span style={{ color: "#00bcd4" }}>chaos.css</span>
                                <span style={{ color: "#5f6368" }}> — {snippet.funnyComment}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Closing brace */}
                  <div
                    style={{
                      padding: "2px 12px 8px",
                      color: "#5f6368",
                    }}
                  >
                    {`}`}
                  </div>

                  {/* Source file reference */}
                  <div
                    style={{
                      padding: "6px 12px",
                      borderTop: "1px solid #3c3c3c",
                      color: "#5f6368",
                      fontSize: "10px",
                    }}
                  >
                    chaos.css:1{" "}
                    <span style={{ color: "#9aa0a6" }}>
                      ({mode === "corporate" ? "corporate-approved-destruction" : "layout-liberation"}.min.css)
                    </span>
                  </div>
                </div>
              )}

              {/* Computed tab — shows box model with absurd values */}
              {activeTab === "computed" && (
                <div style={{ padding: "16px" }}>
                  {/* Box model visualization */}
                  <div
                    style={{
                      maxWidth: "320px",
                      margin: "0 auto",
                    }}
                  >
                    {/* Margin box */}
                    <div
                      style={{
                        background: "#c8965322",
                        border: "1px dashed #c8965366",
                        padding: "8px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "9px",
                          color: "#c89653",
                          position: "absolute",
                          top: "2px",
                          left: "4px",
                        }}
                      >
                        margin
                      </div>

                      {/* Margin values */}
                      <div style={{ textAlign: "center", color: "#c89653", fontSize: "10px", marginBottom: "4px" }}>
                        {boxModel.marginTop}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#c89653", fontSize: "10px" }}>{boxModel.marginLeft}</span>

                        {/* Padding box */}
                        <div
                          style={{
                            background: "#6b9f3722",
                            border: "1px dashed #6b9f3766",
                            padding: "8px",
                            flex: 1,
                            margin: "0 8px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "9px",
                              color: "#6b9f37",
                              position: "absolute",
                              top: "2px",
                              left: "4px",
                            }}
                          >
                            padding
                          </div>
                          <div style={{ textAlign: "center", color: "#6b9f37", fontSize: "10px", marginBottom: "4px" }}>
                            {boxModel.paddingTop}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ color: "#6b9f37", fontSize: "10px" }}>{boxModel.paddingLeft}</span>

                            {/* Content box */}
                            <div
                              style={{
                                background: "#5a9bc622",
                                border: "1px dashed #5a9bc666",
                                padding: "8px 16px",
                                textAlign: "center",
                              }}
                            >
                              <div style={{ color: "#5a9bc6", fontSize: "10px" }}>
                                {boxModel.width} x {boxModel.height}
                              </div>
                            </div>

                            <span style={{ color: "#6b9f37", fontSize: "10px" }}>{boxModel.paddingRight}</span>
                          </div>
                          <div style={{ textAlign: "center", color: "#6b9f37", fontSize: "10px", marginTop: "4px" }}>
                            {boxModel.paddingBottom}
                          </div>
                        </div>

                        <span style={{ color: "#c89653", fontSize: "10px" }}>{boxModel.marginRight}</span>
                      </div>
                      <div style={{ textAlign: "center", color: "#c89653", fontSize: "10px", marginTop: "4px" }}>
                        {boxModel.marginBottom}
                      </div>
                    </div>
                  </div>

                  {/* Warning message */}
                  {chaos > 0 && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "6px 10px",
                        background: "#f4433611",
                        border: "1px solid #f4433633",
                        color: "#f44336",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ fontSize: "12px" }}>!</span>
                      <span>
                        {chaos >= 75
                          ? "Box model has achieved sentience. Margins are now self-aware."
                          : chaos >= 50
                          ? "Computed values may cause existential dread in layout engines."
                          : "Warning: These values void your CSS warranty."}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
