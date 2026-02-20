import { useState } from "react"

const AGENT_CONFIG = {
    planner: {
        label: "Planner",
        icon: "🧠",
        color: "var(--planner)",
        glow: "var(--planner-glow)",
        description: "Breaks task into steps"
    },
    coder: {
        label: "Coder",
        icon: "👨‍💻",
        color: "var(--coder)",
        glow: "var(--coder-glow)",
        description: "Executes using tools"
    },
    critic: {
        label: "Critic",
        icon: "🔍",
        color: "var(--critic)",
        glow: "var(--critic-glow)",
        description: "Reviews and improves"
    }
}

function AgentCard({ name, state }) {
    const [expanded, setExpanded] = useState(false)
    const config = AGENT_CONFIG[name]
    const status = state?.status || "idle"
    const isActive = status === "thinking" || status === "working"
    const isComplete = status === "complete"

    return (
        <div style={{
            borderRadius: "var(--radius-card)",
            border: `1px solid ${isActive || isComplete ? config.color + "44" : "var(--border)"}`,
            background: isActive ? config.glow : "var(--elevated)",
            padding: "14px",
            marginBottom: "10px",
            transition: "all 0.2s",
            boxShadow: isActive ? `0 0 20px ${config.glow}` : "none"
        }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{
                            width: "8px", height: "8px",
                            borderRadius: "50%",
                            background: isComplete ? config.color : isActive ? config.color : "var(--text-muted)",
                            boxShadow: isActive ? `0 0 8px ${config.color}` : "none",
                            transition: "all 0.2s"
                        }} />
                        {isActive && (
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "50%",
                                background: config.color,
                                animation: "pulse-ring 1s ease-out infinite"
                            }} />
                        )}
                    </div>
                    <div>
                        <div style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: isComplete || isActive ? "var(--text-primary)" : "var(--text-secondary)",
                            fontFamily: "var(--font-ui)",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}>
                            <span>{config.icon}</span>
                            {config.label}
                        </div>
                        <div style={{
                            fontSize: "10px",
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                            marginTop: "2px"
                        }}>
                            {config.description}
                        </div>
                    </div>
                </div>
                <span style={{
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    color: isComplete ? config.color : "var(--text-muted)",
                    padding: "2px 8px",
                    border: `1px solid ${isComplete ? config.color + "44" : "var(--border)"}`,
                    borderRadius: "6px"
                }}>
                    {status}
                </span>
            </div>

            {isComplete && (
                <div style={{ marginTop: "10px" }}>
                    <div style={{
                        height: "2px",
                        background: "var(--border)",
                        borderRadius: "1px",
                        marginBottom: "10px"
                    }}>
                        <div style={{
                            height: "100%",
                            width: "100%",
                            background: `linear-gradient(90deg, ${config.color}, ${config.color}88)`,
                            borderRadius: "1px",
                            animation: "progress-fill 0.5s ease forwards"
                        }} />
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        style={{
                            background: "none",
                            border: "none",
                            color: config.color,
                            cursor: "pointer",
                            fontSize: "11px",
                            fontFamily: "var(--font-mono)",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                        }}
                    >
                        <span style={{ fontSize: "8px" }}>{expanded ? "▼" : "▶"}</span>
                        {expanded ? "Hide" : "View"} Details
                    </button>
                    {expanded && state.output && (
                        <div style={{
                            marginTop: "8px",
                            padding: "10px",
                            background: "var(--surface)",
                            borderRadius: "8px",
                            fontSize: "11px",
                            color: "var(--text-secondary)",
                            fontFamily: "var(--font-ui)",
                            lineHeight: 1.5,
                            maxHeight: "160px",
                            overflowY: "auto",
                            whiteSpace: "pre-wrap"
                        }}>
                            {state.output}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function AgentPanel({ agentStates, mode, onModeChange }) {
    return (
        <div style={{
            width: "260px",
            background: "var(--surface)",
            borderLeft: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0
        }}>
            <div style={{
                padding: "16px",
                borderBottom: "1px solid var(--border)"
            }}>
                <div style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "10px"
                }}>
                    Agent Engine
                </div>
                <div style={{
                    display: "flex",
                    background: "var(--elevated)",
                    borderRadius: "10px",
                    padding: "3px",
                    gap: "2px"
                }}>
                    {[
                        { value: "simple", label: "Simple" },
                        { value: "multi_agent", label: "Multi-Agent" }
                    ].map(m => (
                        <button
                            key={m.value}
                            onClick={() => onModeChange(m.value)}
                            style={{
                                flex: 1,
                                padding: "6px 8px",
                                background: mode === m.value ? "var(--surface)" : "transparent",
                                border: "none",
                                borderRadius: "8px",
                                color: mode === m.value ? "var(--text-primary)" : "var(--text-muted)",
                                cursor: "pointer",
                                fontSize: "11px",
                                fontFamily: "var(--font-ui)",
                                fontWeight: mode === m.value ? 500 : 400,
                                transition: "all 0.15s",
                                boxShadow: mode === m.value ? "0 1px 3px rgba(0,0,0,0.3)" : "none"
                            }}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                {Object.entries(AGENT_CONFIG).map(([name]) => (
                    <AgentCard key={name} name={name} state={agentStates[name]} />
                ))}

                {!agentStates.planner && !agentStates.coder && !agentStates.critic && (
                    <p style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        textAlign: "center",
                        marginTop: "12px",
                        fontFamily: "var(--font-ui)",
                        lineHeight: 1.6
                    }}>
                        Send a message to activate the agent pipeline
                    </p>
                )}
            </div>

            <div style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                gap: "8px"
            }}>
                {[
                    { label: "Planner", color: "var(--planner)" },
                    { label: "Coder", color: "var(--coder)" },
                    { label: "Critic", color: "var(--critic)" }
                ].map(a => (
                    <div key={a.label} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)"
                    }}>
                        <div style={{
                            width: "5px", height: "5px",
                            borderRadius: "50%",
                            background: a.color
                        }} />
                        {a.label}
                    </div>
                ))}
            </div>
        </div>
    )
}