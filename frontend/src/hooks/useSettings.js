import { useState } from "react"

export function useSettings() {
  const [settings, setSettings] = useState({
    model: "mistral-nemo",
    projectRoot: "/home/anish/agentcraft",
    maxResults: 3
  })
  const [open, setOpen] = useState(false)

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return { settings, open, setOpen, updateSetting }
}