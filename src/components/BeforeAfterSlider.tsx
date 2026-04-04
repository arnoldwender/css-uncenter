import { useState, useRef, useCallback } from "react";
import { type ChaosMode, type CSSSnippet } from "../constants";

/* ── Before/After drag comparison slider ── */
interface BeforeAfterSliderProps {
  chaosCount: number;
  appliedSnippets: CSSSnippet[];
  mode: ChaosMode;
}

export function BeforeAfterSlider({ chaosCount, appliedSnippets, mode }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = useCallback(() => { isDragging.current = true; }, []);
  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => handleMove(e.touches[0].clientX), [handleMove]);

  if (chaosCount === 0) return null;

  /* Get corporate mode font override */
  const corporateFont = mode === "corporate" ? "'Comic Sans MS', cursive" : undefined;

  /* Compute chaos rotation for "after" side elements */
  const chaosRotation = appliedSnippets.length * 3;
  const chaosOffset = appliedSnippets.length * 12;

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
        BEFORE / AFTER — DRAG TO COMPARE
      </div>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        style={{
          position: "relative",
          height: "200px",
          border: "1px solid #00ffff22",
          overflow: "hidden",
          cursor: "col-resize",
          userSelect: "none",
        }}
      >
        {/* "Before" side — clean centered layout */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#0a0a0a",
            padding: "1.2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#00ffff", letterSpacing: "2px", textAlign: "center" }}>
            Perfectly Centered
          </div>
          <div style={{ fontSize: "0.6rem", color: "#00ffff66", textAlign: "center", maxWidth: "250px", lineHeight: "1.5" }}>
            A beautiful, harmonious layout where everything is in its right place.
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["Home", "About", "Contact"].map((t) => (
              <span key={t} style={{ fontSize: "0.55rem", color: "#00ffff44", padding: "0.3rem 0.5rem", border: "1px solid #00ffff22" }}>
                {t}
              </span>
            ))}
          </div>
          <button
            style={{
              background: "transparent",
              border: "1px solid #00ffff44",
              color: "#00ffff88",
              fontFamily: "monospace",
              fontSize: "0.6rem",
              padding: "0.3rem 0.8rem",
              cursor: "default",
            }}
          >
            BUY NOW
          </button>
          {/* Label */}
          <div style={{ position: "absolute", top: "8px", left: "8px", fontSize: "0.5rem", color: "#00ffff33", letterSpacing: "2px" }}>
            BEFORE
          </div>
        </div>

        {/* "After" side — chaotic un-centered layout */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: mode === "corporate" ? "#f0f0f0" : "#0a0a0a",
            padding: "1.2rem",
            clipPath: `inset(0 0 0 ${sliderPos}%)`,
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: mode === "corporate" ? "#333" : "#00ffff",
              letterSpacing: chaosCount >= 3 ? "8px" : "2px",
              textAlign: "right",
              marginLeft: `${chaosOffset}px`,
              transform: `rotate(${chaosRotation}deg)`,
              transition: "all 0.3s",
              fontFamily: corporateFont || "monospace",
            }}
          >
            {mode === "corporate" ? "ENTERPRISE SYNERGY" : "Un-Centered Chaos"}
          </div>
          <div
            style={{
              fontSize: "0.6rem",
              color: mode === "corporate" ? "#666" : "#00ffff66",
              marginLeft: `-${chaosOffset * 0.5}px`,
              marginTop: `${chaosCount * 5}px`,
              transform: `rotate(-${chaosRotation * 0.5}deg) skewX(${chaosCount * 2}deg)`,
              transition: "all 0.3s",
              lineHeight: "1.5",
              fontFamily: corporateFont,
            }}
          >
            Layout has been liberated from the tyranny of centering.
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem", transform: `translateX(${chaosOffset}px) rotate(${chaosCount}deg)` }}>
            {["Home", "???", "Help"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.55rem",
                  color: mode === "corporate" ? "#999" : "#ff000066",
                  padding: "0.3rem 0.5rem",
                  border: `1px solid ${mode === "corporate" ? "#ccc" : "#ff000033"}`,
                  fontFamily: corporateFont,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <button
            style={{
              background: "transparent",
              border: `1px solid ${chaosCount >= 5 ? "#ff0000" : "#00ffff44"}`,
              color: chaosCount >= 5 ? "#ff0000" : "#00ffff88",
              fontFamily: corporateFont || "monospace",
              fontSize: chaosCount >= 5 ? "0.4rem" : "0.6rem",
              padding: "0.3rem 0.8rem",
              cursor: "default",
              marginTop: "0.8rem",
              transform: `skewX(${chaosCount * 4}deg) translateX(${chaosOffset * 0.8}px)`,
              transition: "all 0.3s",
            }}
          >
            {chaosCount >= 5 ? "HELP ME" : "BUY NOW (maybe)"}
          </button>
          {/* Label */}
          <div style={{ position: "absolute", top: "8px", right: "8px", fontSize: "0.5rem", color: mode === "corporate" ? "#999" : "#ff000066", letterSpacing: "2px" }}>
            AFTER
          </div>
        </div>

        {/* Slider handle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            width: "2px",
            background: "#00ffff",
            boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff44",
            zIndex: 10,
            transform: "translateX(-50%)",
          }}
        >
          {/* Drag handle circle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#000",
              border: "2px solid #00ffff",
              boxShadow: "0 0 10px #00ffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6rem",
              color: "#00ffff",
            }}
          >
            {"<>"}
          </div>
        </div>
      </div>
    </div>
  );
}
