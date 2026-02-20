import { useChat } from "./hooks/useChat"
import { useSettings } from "./hooks/useSettings"
import TopBar from "./components/TopBar"
import Sidebar from "./components/Sidebar"
import Timeline from "./components/Timeline"
import InputBar from "./components/InputBar"
import AgentPanel from "./components/AgentPanel"

export default function App() {
  const {
    conversations, activeId, messages,
    input, setInput, loading, indexing,
    status, mode, setMode, agentStates,
    sendMessage, indexPDF, indexCodebase, newChat, selectChat, bottomRef
  } = useChat()

  const { settings } = useSettings()

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "var(--bg)",
      color: "var(--text-primary)"
    }}>
      <TopBar
        status={status}
        model={settings.model}
        indexing={indexing}
        onIndex={indexCodebase}
        onIndexPDF={indexPDF}
      />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Sidebar
          conversations={conversations}
          onNew={newChat}
          onSelect={selectChat}
          activeId={activeId}
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Timeline
            messages={messages}
            loading={loading}
            bottomRef={bottomRef}
            onSuggestion={(suggestion) => {
              setInput(suggestion)
              setTimeout(() => sendMessage(), 50)
            }}
          />
          <InputBar
            input={input}
            setInput={setInput}
            onSend={sendMessage}
            loading={loading}
          />
        </div>

        <AgentPanel
          agentStates={agentStates}
          mode={mode}
          onModeChange={setMode}
        />
      </div>
    </div>
  )
}