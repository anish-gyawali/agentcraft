export default function Sidebar({ conversations, onNew, onSelect, activeId }) {
  return (
    <div style={{
      width: "220px",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0
    }}>
      <div style={{ padding: "16px" }}>
        <button
          onClick={onNew}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "var(--elevated)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-btn)",
            color: "var(--text-primary)",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: "var(--font-ui)",
            fontWeight: 500,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.15s"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#2563EB"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
          New Task
        </button>
      </div>

      <div style={{
        padding: "0 16px 8px",
        fontSize: "10px",
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      }}>
        Recent Tasks
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
        {conversations.length === 0 && (
          <p style={{
            padding: "8px",
            fontSize: "12px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-ui)"
          }}>
            No tasks yet
          </p>
        )}
        {conversations.map(convo => (
          <div
            key={convo.id}
            onClick={() => onSelect(convo.id)}
            style={{
              padding: "10px 12px",
              borderRadius: "var(--radius-item)",
              cursor: "pointer",
              background: activeId === convo.id ? "var(--elevated)" : "transparent",
              borderLeft: activeId === convo.id ? "2px solid #2563EB" : "2px solid transparent",
              fontSize: "12px",
              color: activeId === convo.id ? "var(--text-primary)" : "var(--text-secondary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: "2px",
              transition: "all 0.15s",
              fontFamily: "var(--font-ui)"
            }}
            onMouseEnter={e => {
              if (activeId !== convo.id) e.currentTarget.style.background = "var(--elevated)"
            }}
            onMouseLeave={e => {
              if (activeId !== convo.id) e.currentTarget.style.background = "transparent"
            }}
          >
            {convo.title}
          </div>
        ))}
      </div>

      <div style={{
        padding: "16px",
        borderTop: "1px solid var(--border-subtle)",
        fontSize: "10px",
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        lineHeight: 1.8
      }}>
        <div>RTX 5070 · 12GB</div>
        <div>Local · No API</div>
      </div>
    </div>
  )
}