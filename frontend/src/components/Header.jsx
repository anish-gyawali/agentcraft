export default function Header({ onIndex, indexing, status }) {
  return (
    <div style={{
      padding: "16px 24px",
      borderBottom: "1px solid #1a1a2e",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#0d0d1a"
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: "18px", color: "#4fc3f7" }}>AgentCraft</h1>
        <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
          local multi-agent AI copilot
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {status && <span style={{ fontSize: "11px", color: "#81c784" }}>{status}</span>}
        <button
          onClick={onIndex}
          disabled={indexing}
          style={{
            padding: "8px 14px",
            background: indexing ? "#1a1a2e" : "#0d2137",
            border: "1px solid #4fc3f7",
            borderRadius: "4px",
            color: "#4fc3f7",
            cursor: "pointer",
            fontSize: "12px",
            fontFamily: "monospace"
          }}
        >
          {indexing ? "indexing..." : "index codebase"}
        </button>
      </div>
    </div>
  )
}