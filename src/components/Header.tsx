interface HeaderProps {
  title: string;
  chaosCount: number;
}

export function Header({ title, chaosCount: c }: HeaderProps) {
  return (
    <div
      style={{
        marginBottom: "2rem",
        borderBottom: "1px solid #00ffff33",
        paddingBottom: "1.5rem",
        marginLeft: c >= 1 ? `${c * 8}px` : "0",
        transition: "margin 0.5s",
      }}
    >
      <div
        style={{
          fontSize: "0.65rem",
          letterSpacing: "6px",
          color: "#00ffff55",
          marginBottom: "0.5rem",
        }}
      >
        WENDER MEDIA LAYOUT DESTRUCTION SUITE
      </div>
      <h1
        style={{
          fontSize: "clamp(1.4rem,5vw,2.5rem)",
          fontWeight: "normal",
          margin: "0 0 0.3rem",
          letterSpacing: "4px",
          textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff",
          textAlign: c >= 2 ? "right" : "left",
          transition: "text-align 0.3s",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          fontSize: "0.7rem",
          color: "#00ffff88",
          letterSpacing: "2px",
        }}
      >
        v6.6.6 — MAKING DIVS SUFFER SINCE 2026
      </div>
      <div
        style={{
          marginTop: "0.75rem",
          display: "flex",
          justifyContent: c >= 3 ? "flex-end" : "flex-start",
          gap: "1.5rem",
          fontSize: "0.6rem",
          color: "#00ffff44",
          flexWrap: "wrap",
          transition: "justify-content 0.5s",
        }}
      >
        <span>FLEXBOX FREE</span>
        <span>GRID HATER</span>
        <span>FLOAT GANG</span>
        <span>!IMPORTANT EVERYWHERE</span>
      </div>
    </div>
  );
}
