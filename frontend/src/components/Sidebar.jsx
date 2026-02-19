export default function Sidebar({ conversations, onNew, onSelect, activeId }) {
  return (
    <div style={{
      width: "240px",
      background: "#0d0d1a",
      borderRight: "1px solid #1a1a2e",
      display: "flex",
      flexDirection: "column",
      padding: "16px 0"
    }}>
      <div style={{ padding: "0 16px 16px", borderBottom: "1px solid #1a1a2e" }}>
        <button
          onClick={onNew}
          style={{
            width: "100%",
            padding: "10px",
            background: "#0d2137",
            border: "1px solid #4fc3f7",
            borderRadius: "6px",
            color: "#4fc3f7",
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: "12px"
          }}
        >
          + new chat
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        <p style={{ padding: "8px 16px", fontSize: "10px", color: "#333", textTransform: "uppercase" }}>
          recent chats
        </p>
        {conversations.length === 0 && (
          <p style={{ padding: "8px 16px", fontSize: "12px", color: "#444" }}>
            no chats yet
          </p>
        )}
        {conversations.map(convo => (
          <div
            key={convo.id}
            onClick={() => onSelect(convo.id)}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
              background: activeId === convo.id ? "#1a1a2e" : "transparent",
              borderLeft: activeId === convo.id ? "2px solid #4fc3f7" : "2px solid transparent",
              fontSize: "12px",
              color: activeId === convo.id ? "#fff" : "#555",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {convo.title}
          </div>
        ))}
      </div>

      <div style={{ padding: "16px", borderTop: "1px solid #1a1a2e" }}>
        <p style={{ fontSize: "10px", color: "#333" }}>
          running on RTX 5070
        </p>
        <p style={{ fontSize: "10px", color: "#333" }}>
          mistral-nemo — local
        </p>
      </div>
    </div>
  )
}