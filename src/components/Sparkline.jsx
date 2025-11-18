import React from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

// Simple sparkline component. Accepts `data` as an array of numbers.
export default function Sparkline({ data = [] }){
  const points = data.map((v,i) => ({ x: i, y: Number(v) || 0 }))
  return (
    <div style={{width:120,height:40}} aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="y" stroke="#1e88e5" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
