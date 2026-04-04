import { useState } from "react";
import { CSS_SNIPPETS } from "./constants";
import { useGlitchTitle } from "./hooks/useGlitchTitle";
import { useRotatingTip } from "./hooks/useRotatingTip";
import { ScanlineOverlay } from "./components/Overlays";
import { Header } from "./components/Header";
import { ChaosMeter } from "./components/ChaosMeter";
import { LivePreview } from "./components/LivePreview";
import { SnippetPanel } from "./components/SnippetPanel";
import { Footer } from "./components/Footer";

export default function App() {
  const titleGlitch = useGlitchTitle();
  const tip = useRotatingTip();
  const [chaos, setChaos] = useState(0);
  const [applied, setApplied] = useState<string[]>([]);

  const c = applied.length;

  function applyChaos(snippet: (typeof CSS_SNIPPETS)[number]) {
    if (applied.includes(snippet.label)) return;
    setApplied((prev) => [...prev, snippet.label]);
    setChaos((prev) => Math.min(100, prev + 25));
  }

  function resetChaos() {
    setApplied([]);
    setChaos(0);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#00ffff",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scandown { 0%{top:-5%} 100%{top:105%} }
        @keyframes drift { 0%{transform:translateX(0)} 50%{transform:translateX(8px)} 100%{transform:translateX(0)} }
        @keyframes wobble { 0%,100%{transform:rotate(0deg)} 33%{transform:rotate(${c}deg)} 66%{transform:rotate(-${c}deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .snippet-btn:hover { background: #00ffff22 !important; }
      `}</style>

      <ScanlineOverlay />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <Header title={titleGlitch} chaosCount={c} />
        <ChaosMeter chaos={chaos} />
        <LivePreview chaosCount={c} />
        <SnippetPanel applied={applied} onApply={applyChaos} />

        <div
          style={{
            marginBottom: "1.5rem",
            borderTop: "1px solid #00ffff22",
            borderBottom: "1px solid #00ffff22",
            padding: "0.5rem 0",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              color: "#00ffff66",
              letterSpacing: "2px",
              animation: "blink 3s infinite",
            }}
          >
            {tip}
          </div>
        </div>

        {applied.length > 0 && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <button
              onClick={resetChaos}
              style={{
                background: "transparent",
                border: "1px solid #ff000044",
                color: "#ff000066",
                fontFamily: "monospace",
                fontSize: "0.65rem",
                padding: "0.4rem 1rem",
                cursor: "pointer",
                letterSpacing: "2px",
              }}
            >
              RESTORE SANITY (undo all)
            </button>
          </div>
        )}

        <Footer chaosCount={c} />
      </div>
    </div>
  );
}
