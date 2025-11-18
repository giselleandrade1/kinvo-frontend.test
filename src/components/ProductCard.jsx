import React, { useMemo } from 'react'
import styled from 'styled-components'
import Sparkline from './Sparkline'

const Card = styled.div`
  background:#fff;border-radius:10px;box-shadow:0 6px 14px rgba(16,24,40,0.06);padding:14px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;
`

const Meta = styled.div`
  display:flex;flex-direction:column;gap:6px;
`
const Name = styled.div`
  font-weight:700;font-size:15px;color:var(--text);
`
const Small = styled.div`
  font-size:13px;color:var(--muted);
`
export default function ProductCard({ item }){
  // Build a small synthetic series for sparkline when real timeseries is not available
  const series = useMemo(()=>{
    if (item.history && Array.isArray(item.history) && item.history.length) return item.history
    // fallback: build series based on yield to show a small curve
    const base = Number(item.yield) || (Math.random()*5 + 1)
    return Array.from({length:8}, (_,i) => (base + Math.sin(i/2 + base) * 0.5).toFixed(2))
  }, [item])
  return (
    <Card>
      <Meta>
        <Name>{item.name}</Name>
        <Small>{item.institution} • {item.type}</Small>
      </Meta>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <Sparkline data={series} />
        <div>
          <div style={{textAlign:'right'}}>
            <div style={{fontWeight:800,fontSize:16}}>{item.yield || '—'}%</div>
            <Small>Vencimento {item.maturityDate || '—'}</Small>
          </div>
        </div>
      </div>
    </Card>
  )
}
