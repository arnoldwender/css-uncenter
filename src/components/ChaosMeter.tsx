interface ChaosMeterProps {
  chaos: number;
}

export function ChaosMeter({ chaos }: ChaosMeterProps) {
  const barColor =
    chaos > 75 ? "#ff0000" : chaos > 50 ? "#ff9900" : "#00ffff";

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.62rem",
          color: "#00ffff77",
          marginBottom: "0.4rem",
          letterSpacing: "2px",
        }}
      >
        <span>CHAOS LEVEL</span>
        <span>{chaos}%</span>
      </div>
      <div style={{ height: "6px", background: "#00ffff11" }}>
        <div
          style={{
            height: "100%",
            width: `${chaos}%`,
            background: barColor,
            boxShadow: "0 0 10px currentColor",
            transition: "width 0.5s, background 0.5s",
          }}
        />
      </div>
    </div>
  );
}
