"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeContent: "center",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h2 style={{ margin: 0 }}>Something went wrong</h2>
      <p style={{ margin: 0, opacity: 0.7 }}>{error.message}</p>
      <button type="button" onClick={reset} style={{ justifySelf: "center" }}>
        Try again
      </button>
    </div>
  );
}
