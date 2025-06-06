// app/agents/[agentId]/page.tsx
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'



export default function AgentRunner() {
  const { agentId } = useParams()
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    setLoading(true)
    const res = await fetch('/api/run-agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent: agentId, input }),
    })
    const data = await res.json()
    setResult(data.output || 'No response')
    setLoading(false)
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold capitalize">{agentId} Agent</h2>
      <textarea
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter input here..."
      />
      <button
        onClick={handleRun}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Agent'}
      </button>
      {result && (
        <div className="p-4 mt-4 bg-gray-100 border rounded">
          <strong>Output:</strong>
          <pre className="mt-2 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}
