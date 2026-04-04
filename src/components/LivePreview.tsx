interface LivePreviewProps {
  chaosCount: number;
}

export function LivePreview({ chaosCount: c }: LivePreviewProps) {
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
        LIVE PREVIEW
      </div>
      <div
        style={{
          border: "1px solid #00ffff22",
          background: "#00ffff08",
          padding: "1.5rem",
          minHeight: "200px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: c >= 2 ? "0.5rem" : "1rem",
            color: "#00ffff",
            marginBottom: "0.5rem",
            textAlign: c >= 2 ? "right" : "left",
            marginLeft: c >= 1 ? "37%" : "0",
            animation: c >= 3 ? "wobble 2s infinite" : "none",
            transition: "all 0.5s",
            letterSpacing: c >= 4 ? "8px" : "normal",
          }}
        >
          Welcome to Our Website&trade;
        </div>

        <div
          style={{
            fontSize: "0.7rem",
            color: "#00ffff88",
            lineHeight: "1.6",
            textAlign: c >= 3 ? "right" : "left",
            marginLeft: c >= 2 ? "-20px" : "0",
            marginRight: c >= 4 ? "-40px" : "0",
            transform: c >= 3 ? `rotate(${c * 1.5}deg)` : "none",
            transition: "all 0.5s",
          }}
        >
          This is our compelling value proposition that will convince you to buy
          our product.
          {c >= 2 && " Please ignore the layout. It's intentional."}
          {c >= 4 && " SEND HELP."}
        </div>

        <div
          style={{
            marginTop: c >= 3 ? "-20px" : "1rem",
            marginLeft: c >= 1 ? `${c * 15}%` : "0",
            display: "inline-block",
            transition: "all 0.5s",
            animation: c >= 4 ? "drift 1s infinite" : "none",
          }}
        >
          <button
            style={{
              background: "transparent",
              border: `1px solid ${c >= 3 ? "#ff0000" : "#00ffff"}`,
              color: c >= 3 ? "#ff0000" : "#00ffff",
              fontFamily: "monospace",
              fontSize: c >= 4 ? "0.4rem" : "0.75rem",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
              transform: c >= 2 ? `skewX(${c * 4}deg)` : "none",
              transition: "all 0.5s",
              letterSpacing: "2px",
            }}
          >
            {c >= 3 ? "HELP" : "BUY NOW"}
          </button>
        </div>

        {c >= 2 && (
          <div
            style={{
              position: "absolute",
              bottom: c >= 3 ? "-10px" : "10px",
              left: c >= 4 ? "unset" : "0",
              right: c >= 4 ? "-30px" : "unset",
              display: "flex",
              gap: "0.75rem",
              fontSize: "0.58rem",
              color: "#00ffff55",
              transition: "all 0.5s",
              transform: c >= 3 ? "rotate(-5deg)" : "none",
            }}
          >
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
            <span>????</span>
          </div>
        )}

        {c >= 3 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%) rotate(-30deg)",
              fontSize: "3rem",
              color: "#ff000011",
              pointerEvents: "none",
              fontFamily: "monospace",
              letterSpacing: "4px",
              animation: "pulse 2s infinite",
            }}
          >
            HELP
          </div>
        )}
      </div>
    </div>
  );
}
