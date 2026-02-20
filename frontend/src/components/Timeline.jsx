import { useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
function UserBlock({ content }) {
    return (
        <div className="fade-in" style={{
            marginBottom: "24px",
            padding: "16px 20px",
            background: "var(--elevated)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-card)"
        }}>
            <div style={{
                fontSize: "10px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px"
            }}>
                User Request
            </div>
            <div style={{
                fontSize: "13px",
                color: "var(--text-primary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-ui)"
            }}>
                <ReactMarkdown
                    components={{
                        p: ({ node, ...props }) => <p style={{ marginBottom: "8px" }} {...props} />,
                        strong: ({ node, ...props }) => <strong style={{ color: "var(--text-primary)", fontWeight: 600 }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: "20px", marginBottom: "8px" }} {...props} />,
                        ol: ({ node, ...props }) => <ol style={{ paddingLeft: "20px", marginBottom: "8px" }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ marginBottom: "4px" }} {...props} />,
                        code: ({ node, inline, ...props }) => inline
                            ? <code style={{
                                fontFamily: "var(--font-mono)",
                                background: "var(--elevated)",
                                padding: "1px 6px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                color: "var(--coder)"
                            }} {...props} />
                            : <pre style={{
                                fontFamily: "var(--font-mono)",
                                background: "var(--elevated)",
                                padding: "12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                overflowX: "auto",
                                marginBottom: "8px",
                                color: "var(--coder)"
                            }}><code {...props} /></pre>
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

function AgentBlock({ agent, content, steps }) {
    const configs = {
        planner: { label: "Planner Output", color: "var(--planner)", glow: "var(--planner-glow)", icon: "🧠" },
        coder: { label: "Coder Output", color: "var(--coder)", glow: "var(--coder-glow)", icon: "👨‍💻" },
        critic: { label: "Critic Review", color: "var(--critic)", glow: "var(--critic-glow)", icon: "🔍" },
        agent: { label: "AgentCraft", color: "var(--planner)", glow: "var(--planner-glow)", icon: "⚡" }
    }
    const config = configs[agent] || configs.agent

    // Parse content into structured sections
    const lines = content.split("\n").filter(l => l.trim())

    return (
        <div className="fade-in" style={{
            marginBottom: "16px",
            padding: "16px 20px",
            background: "var(--surface)",
            border: `1px solid var(--border)`,
            borderLeft: `3px solid ${config.color}`,
            borderRadius: "var(--radius-card)",
            boxShadow: `0 0 20px ${config.glow}`
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px"
            }}>
                <span style={{ fontSize: "14px" }}>{config.icon}</span>
                <span style={{
                    fontSize: "10px",
                    color: config.color,
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 500
                }}>
                    {config.label}
                </span>
            </div>

            <div style={{
                fontSize: "13px",
                color: "var(--text-primary)",
                lineHeight: 1.7,
                fontFamily: "var(--font-ui)"
            }}>
                <ReactMarkdown
                    components={{
                        p: ({ node, ...props }) => <p style={{ marginBottom: "8px" }} {...props} />,
                        strong: ({ node, ...props }) => <strong style={{ color: "var(--text-primary)", fontWeight: 600 }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: "20px", marginBottom: "8px" }} {...props} />,
                        ol: ({ node, ...props }) => <ol style={{ paddingLeft: "20px", marginBottom: "8px" }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ marginBottom: "4px" }} {...props} />,
                        code: ({ node, inline, ...props }) => inline
                            ? <code style={{
                                fontFamily: "var(--font-mono)",
                                background: "var(--elevated)",
                                padding: "1px 6px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                color: "var(--coder)"
                            }} {...props} />
                            : <pre style={{
                                fontFamily: "var(--font-mono)",
                                background: "var(--elevated)",
                                padding: "12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                overflowX: "auto",
                                marginBottom: "8px",
                                color: "var(--coder)"
                            }}><code {...props} /></pre>
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {steps && steps.length > 0 && (
                <div style={{ marginTop: "12px", borderTop: "1px solid var(--border-subtle)", paddingTop: "12px" }}>
                    <div style={{
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em"
                    }}>
                        Tool Calls ({steps.length})
                    </div>
                    {steps.slice(0, 2).map((step, i) => (
                        <pre key={i} style={{
                            fontSize: "11px",
                            color: config.color,
                            fontFamily: "var(--font-mono)",
                            background: "var(--elevated)",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            marginBottom: "6px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}>
                            {typeof step === "string" ? step.slice(0, 120) : step.content?.slice(0, 120)}
                        </pre>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function Timeline({ messages, loading, bottomRef, onSuggestion }) {
    return (
        <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column"
        }}>
            {messages.length === 0 && (
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px"
                }}>
                    <div style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "28px",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.5px"
                    }}>
                        Multi-Agent Orchestration
                    </div>
                    <p style={{
                        fontSize: "14px",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-ui)",
                        textAlign: "center",
                        maxWidth: "400px",
                        lineHeight: 1.6
                    }}>
                        Describe a task. Planner, Coder, and Critic agents will collaborate to complete it.
                    </p>
                    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                        {["Explain this codebase", "Suggest improvements", "Find potential bugs"].map(s => (
                            <div
                                key={s}
                                onClick={() => onSuggestion(s)}
                                style={{
                                    padding: "8px 14px",
                                    background: "var(--elevated)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius-btn)",
                                    fontSize: "12px",
                                    color: "var(--text-secondary)",
                                    fontFamily: "var(--font-ui)",
                                    cursor: "pointer",
                                    transition: "all 0.15s"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = "#2563EB"
                                    e.currentTarget.style.color = "var(--text-primary)"
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = "var(--border)"
                                    e.currentTarget.style.color = "var(--text-secondary)"
                                }}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {messages.map((msg, i) => {
                if (msg.role === "user") {
                    return <UserBlock key={i} content={msg.content} />
                }
                if (msg.agents && msg.agents.length > 0) {
                    return (
                        <div key={i}>
                            {msg.agents.map((a, j) => (
                                <AgentBlock key={j} agent={a.agent} content={a.output} steps={a.steps} />
                            ))}
                        </div>
                    )
                }
                return <AgentBlock key={i} agent="agent" content={msg.content} steps={msg.steps} />
            })}

            {loading && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px",
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)"
                }}>
                    <div style={{
                        width: "6px", height: "6px",
                        borderRadius: "50%",
                        background: "#2563EB",
                        animation: "pulse-ring 1s ease-out infinite"
                    }} />
                    Agents working...
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    )
}