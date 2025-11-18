import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background:#fff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);padding:16px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;
`

const Meta = styled.div`
  display:flex;flex-direction:column;
`

const Name = styled.div`
  font-weight:600;
`

const Small = styled.div`
  font-size:13px;color:#666;
`
export default function ProductCard({ item }){
  return (
    <Card>
      <Meta>
        <Name>{item.name}</Name>
        <Small>{item.institution} • {item.type}</Small>
      </Meta>
      <div>
        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:700}}>{item.yield || '—'}%</div>
          <Small>Vencimento {item.maturityDate || '—'}</Small>
        </div>
      </div>
    </Card>
  )
}
