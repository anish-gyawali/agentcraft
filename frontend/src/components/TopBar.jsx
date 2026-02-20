export default function TopBar({ status, model = "mistral-nemo", indexing, onIndex, onIndexPDF }) {
    return (
        <div style={{
            height: "52px",
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            flexShrink: 0
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                    width: "28px", height: "28px",
                    background: "linear-gradient(135deg, #2563EB, #10B981)",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px"
                }}>
                    A
                </div>
                <span style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "16px",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.3px"
                }}>
                    AgentCraft
                </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <TopBarTag label="Environment" value="Development" />
                <TopBarTag label="Model" value={model} />
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{
                        width: "6px", height: "6px",
                        borderRadius: "50%",
                        background: "#10B981",
                        boxShadow: "0 0 6px #10B981"
                    }} />
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                        Running
                    </span>
                </div>
                <button
                    onClick={onIndex}
                    disabled={indexing}
                    style={{
                        padding: "6px 14px",
                        background: "transparent",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-btn)",
                        color: indexing ? "var(--text-muted)" : "var(--text-secondary)",
                        cursor: indexing ? "default" : "pointer",
                        fontSize: "12px",
                        fontFamily: "var(--font-ui)",
                        transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { if (!indexing) e.target.style.borderColor = "#2563EB" }}
                    onMouseLeave={e => { e.target.style.borderColor = "var(--border)" }}
                >
                    {indexing ? "Indexing..." : "Index Codebase"}
                </button>
                <button
                    onClick={onIndexPDF}
                    style={{
                        padding: "6px 14px",
                        background: "transparent",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-btn)",
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontFamily: "var(--font-ui)",
                        transition: "all 0.15s"
                    }}
                    onMouseEnter={e => e.target.style.borderColor = "#F59E0B"}
                    onMouseLeave={e => e.target.style.borderColor = "var(--border)"}
                >
                    Index PDF
                </button>
            </div>
        </div>
    )
}

function TopBarTag({ label, value }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {label}:
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                {value}
            </span>
        </div>
    )
}