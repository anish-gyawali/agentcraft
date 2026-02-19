import { useChat } from "./hooks/useChat"
import Header from "./components/Header"
import MessageList from "./components/MessageList"
import InputBar from "./components/InputBar"

export default function App() {
  const {
    messages, input, setInput,
    loading, indexing, status,
    sendMessage, indexCodebase, bottomRef
  } = useChat()

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#0a0a0f",
      color: "#fff",
      fontFamily: "'Courier New', monospace"
    }}>
      <Header onIndex={indexCodebase} indexing={indexing} status={status} />
      <MessageList messages={messages} loading={loading} bottomRef={bottomRef} />
      <InputBar input={input} setInput={setInput} onSend={sendMessage} loading={loading} />
    </div>
  )
}