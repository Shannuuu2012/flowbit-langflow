"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface LangFlowAgentRunnerProps {
  agentId: string
}

export default function LangFlowAgentRunner({ agentId }: LangFlowAgentRunnerProps) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/langflow/run`, {
        method: "POST",
        body: JSON.stringify({ agentId, input }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.json()
      toast.success(`Agent "${agentId}" responded`, { description: data.output })
    } catch (err) {
      toast.error("Failed to run agent")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Enter input for ${agentId}`}
        disabled={loading}
      />
      <Button onClick={handleRun} disabled={loading || !input}>
        {loading ? "Running..." : "Run Agent"}
      </Button>
    </div>
  )
}
