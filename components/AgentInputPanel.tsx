'use client'
import { useState } from 'react'

const agents = ['classifier', 'email', 'json', 'pdf'] as const
type AgentType = typeof agents[number]

export default function AgentInputPanel() {
  const [inputs, setInputs] = useState<Record<AgentType, string>>({
    classifier: '',
    email: '',
    json: '',
    pdf: '',
  })

  const [outputs, setOutputs] = useState<Record<AgentType, string>>({
    classifier: '',
    email: '',
    json: '',
    pdf: '',
  })

  const runAgent = async (agent: AgentType) => {
    const res = await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent, input: inputs[agent] }),
    })

    const result = await res.json()
    setOutputs((prev) => ({ ...prev, [agent]: JSON.stringify(result) }))
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      {agents.map((agent) => (
        <div key={agent}>
          <input
            className="border px-2 py-1 rounded w-full"
            placeholder={`Enter input for ${agent}`}
            value={inputs[agent]}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, [agent]: e.target.value }))
            }
          />
          <button
            className="mt-2 bg-purple-600 text-white px-4 py-1 rounded"
            onClick={() => runAgent(agent)}
          >
            Run Agent
          </button>
          {outputs[agent] && (
            <pre className="mt-2 bg-gray-100 p-2 rounded">{outputs[agent]}</pre>
          )}
        </div>
      ))}
    </div>
  )
}
