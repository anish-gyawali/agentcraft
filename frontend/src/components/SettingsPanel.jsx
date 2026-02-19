export default function SettingsPanel({ settings, onUpdate, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: "60px",
      right: "24px",
      width: "300px",
      background: "#0d0d1a",
      border: "1px solid #1a1a2e",
      borderRadius: "8px",
      padding: "20px",
      zIndex: 100
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h3 style={{ margin: 0, fontSize: "14px", color: "#4fc3f7" }}>Settings</h3>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}
        >
          close
        </button>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "4px" }}>
          Model
        </label>
        <select
          value={settings.model}
          onChange={e => onUpdate("model", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            background: "#0a0a0f",
            border: "1px solid #1a1a2e",
            borderRadius: "4px",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "12px"
          }}
        >
          <option value="mistral-nemo">mistral-nemo</option>
          <option value="mistral">mistral</option>
          <option value="codellama">codellama</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "4px" }}>
          Project Root
        </label>
        <input
          value={settings.projectRoot}
          onChange={e => onUpdate("projectRoot", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            background: "#0a0a0f",
            border: "1px solid #1a1a2e",
            borderRadius: "4px",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "12px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: "11px", color: "#555", display: "block", marginBottom: "4px" }}>
          Max Search Results: {settings.maxResults}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={settings.maxResults}
          onChange={e => onUpdate("maxResults", parseInt(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}