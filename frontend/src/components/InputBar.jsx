export default function InputBar({ input, setInput, onSend, loading }) {
  return (
    <div style={{
      padding: "16px 24px",
      borderTop: "1px solid var(--border)",
      background: "var(--surface)",
      display: "flex",
      gap: "10px",
      alignItems: "flex-end"
    }}>
      <div style={{ flex: 1, position: "relative" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && onSend()}
          placeholder="Describe a task for your agents..."
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 18px",
            background: "var(--elevated)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-input)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-ui)",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.15s",
            boxSizing: "border-box"
          }}
          onFocus={e => e.target.style.borderColor = "#2563EB"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>
      <button
        onClick={onSend}
        disabled={loading}
        style={{
          padding: "14px 22px",
          background: loading
            ? "var(--elevated)"
            : "linear-gradient(135deg, #2563EB, #1d4ed8)",
          border: "none",
          borderRadius: "var(--radius-btn)",
          color: loading ? "var(--text-muted)" : "#fff",
          cursor: loading ? "default" : "pointer",
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          fontSize: "14px",
          transition: "all 0.15s",
          flexShrink: 0,
          boxShadow: loading ? "none" : "0 4px 12px rgba(37,99,235,0.3)"
        }}
      >
        {loading ? "Working..." : "Run"}
      </button>
    </div>
  )
}