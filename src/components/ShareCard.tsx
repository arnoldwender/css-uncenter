import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";

/* ── Shareable before/after comparison image card ── */
interface ShareCardProps {
  score: number;
  chaosCount: number;
  mode: string;
}

export function ShareCard({ score, chaosCount, mode }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [showCard, setShowCard] = useState(false);

  /* Generate and download the share image */
  const generateImage = useCallback(async () => {
    if (!cardRef.current || generating) return;
    setGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#000000",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `css-uncenter-score-${score}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      /* html2canvas failed */
    } finally {
      setGenerating(false);
    }
  }, [score, generating]);

  if (chaosCount === 0) return null;

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <button
        onClick={() => setShowCard(!showCard)}
        style={{
          background: "transparent",
          border: "1px solid #00ffff22",
          color: "#00ffff77",
          fontFamily: "monospace",
          fontSize: "0.62rem",
          padding: "0.5rem 0.9rem",
          cursor: "pointer",
          letterSpacing: "2px",
          width: "100%",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>SHARE YOUR DESTRUCTION</span>
        <span style={{ fontSize: "0.7rem" }}>{showCard ? "[-]" : "[+]"}</span>
      </button>

      {showCard && (
        <div style={{ marginTop: "0.5rem" }}>
          {/* The card that will be captured as an image */}
          <div
            ref={cardRef}
            style={{
              background: "#000",
              border: "1px solid #00ffff33",
              padding: "1.5rem",
              textAlign: "center",
              fontFamily: "monospace",
            }}
          >
            <div style={{ fontSize: "0.55rem", color: "#00ffff55", letterSpacing: "4px", marginBottom: "0.5rem" }}>
              WENDER MEDIA LAYOUT DESTRUCTION SUITE
            </div>
            <div style={{ fontSize: "1.4rem", color: "#00ffff", letterSpacing: "3px", textShadow: "0 0 20px #00ffff", marginBottom: "0.5rem" }}>
              CSS UN-CENTER PRO
            </div>
            <div style={{ fontSize: "0.6rem", color: "#00ffff66", marginBottom: "1rem", letterSpacing: "1px" }}>
              v6.6.6 — MAKING DIVS SUFFER SINCE 2026
            </div>

            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1rem" }}>
              <div>
                <div style={{ fontSize: "1.5rem", color: "#00ffff", fontWeight: "bold" }}>{score}</div>
                <div style={{ fontSize: "0.5rem", color: "#00ffff55", letterSpacing: "2px" }}>POINTS</div>
              </div>
              <div>
                <div style={{ fontSize: "1.5rem", color: "#ff0000", fontWeight: "bold" }}>{chaosCount}</div>
                <div style={{ fontSize: "0.5rem", color: "#ff000088", letterSpacing: "2px" }}>SNIPPETS</div>
              </div>
              <div>
                <div style={{ fontSize: "1.5rem", color: "#ff00ff", fontWeight: "bold" }}>{mode.toUpperCase()}</div>
                <div style={{ fontSize: "0.5rem", color: "#ff00ff88", letterSpacing: "2px" }}>MODE</div>
              </div>
            </div>

            {/* Before/After mini comparison */}
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem" }}>
              <div style={{ border: "1px solid #00ffff22", padding: "0.6rem 1rem", flex: 1, maxWidth: "160px" }}>
                <div style={{ fontSize: "0.5rem", color: "#00ffff44", marginBottom: "0.3rem", letterSpacing: "2px" }}>BEFORE</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
                  <div style={{ width: "80%", height: "4px", background: "#00ffff33" }} />
                  <div style={{ width: "60%", height: "3px", background: "#00ffff22" }} />
                  <div style={{ width: "40%", height: "3px", background: "#00ffff11" }} />
                </div>
              </div>
              <div style={{ border: "1px solid #ff000033", padding: "0.6rem 1rem", flex: 1, maxWidth: "160px" }}>
                <div style={{ fontSize: "0.5rem", color: "#ff000066", marginBottom: "0.3rem", letterSpacing: "2px" }}>AFTER</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  <div style={{ width: "80%", height: "4px", background: "#ff000033", marginLeft: "30%", transform: "rotate(5deg)" }} />
                  <div style={{ width: "60%", height: "3px", background: "#ff000022", marginLeft: "-10%", transform: "skewX(12deg)" }} />
                  <div style={{ width: "40%", height: "3px", background: "#ff000011", marginLeft: "60%", transform: "rotate(-8deg)" }} />
                </div>
              </div>
            </div>

            <div style={{ fontSize: "0.5rem", color: "#00ffff33", letterSpacing: "2px" }}>
              cssuncenter.dev — BECAUSE CENTERED LAYOUTS ARE TOO MAINSTREAM
            </div>
          </div>

          {/* Download button */}
          <button
            onClick={generateImage}
            disabled={generating}
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "1px solid #00ffff33",
              color: generating ? "#00ffff44" : "#00ffff88",
              fontFamily: "monospace",
              fontSize: "0.6rem",
              padding: "0.4rem 1rem",
              cursor: generating ? "wait" : "pointer",
              letterSpacing: "2px",
              width: "100%",
            }}
          >
            {generating ? "GENERATING..." : "DOWNLOAD SHARE IMAGE"}
          </button>
        </div>
      )}
    </div>
  );
}
