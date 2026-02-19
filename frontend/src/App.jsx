import { useChat } from "./hooks/useChat"
import { useSettings } from "./hooks/useSettings"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import MessageList from "./components/MessageList"
import InputBar from "./components/InputBar"
import SettingsPanel from "./components/SettingsPanel"

export default function App() {
  const {
    conversations, activeId, messages,
    input, setInput, loading, indexing, status,
    sendMessage, indexCodebase, newChat, selectChat, bottomRef
  } = useChat()

  const { settings, open, setOpen, updateSetting } = useSettings()

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#0a0a0f",
      color: "#fff",
      fontFamily: "'Courier New', monospace",
      position: "relative"
    }}>
      <Sidebar
        conversations={conversations}
        onNew={newChat}
        onSelect={selectChat}
        activeId={activeId}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          onIndex={indexCodebase}
          indexing={indexing}
          status={status}
          onSettings={() => setOpen(!open)}
        />
        <MessageList messages={messages} loading={loading} bottomRef={bottomRef} />
        <InputBar input={input} setInput={setInput} onSend={sendMessage} loading={loading} />
      </div>

      {open && (
        <SettingsPanel
          settings={settings}
          onUpdate={updateSetting}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}