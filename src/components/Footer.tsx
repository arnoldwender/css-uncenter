interface FooterProps {
  chaosCount: number;
}

export function Footer({ chaosCount: c }: FooterProps) {
  return (
    <div
      style={{
        borderTop: "1px solid #00ffff22",
        paddingTop: "1.5rem",
        textAlign: c >= 3 ? "right" : "center",
        fontSize: "0.58rem",
        color: "#00ffff33",
        letterSpacing: "2px",
        lineHeight: "2.2",
        transform: c >= 4 ? "rotate(1deg)" : "none",
        transition: "all 0.5s",
      }}
    >
      <div>
        CSS UN-CENTER PRO — BECAUSE CENTERED LAYOUTS ARE TOO MAINSTREAM
      </div>
      <div>
        BUILT BY WENDER MEDIA — WE KNOW HOW TO CENTER DIVS. WE JUST CHOSE NOT
        TO.
      </div>
      <div style={{ color: "#ff000022", marginTop: "0.3rem" }}>
        HTTP 418 — EVEN THIS FOOTER IS MISALIGNED
      </div>
    </div>
  );
}
