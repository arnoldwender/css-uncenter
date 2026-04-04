export function ScanlineOverlay() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.012) 2px,rgba(0,255,255,0.012) 4px)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(0,255,255,0.06)",
          animation: "scandown 7s linear infinite",
          zIndex: 9997,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
