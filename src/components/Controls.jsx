import React from 'react'
import styled from 'styled-components'

const ControlsRoot = styled.div`
  display:flex;gap:12px;align-items:center;
`

const Input = styled.input`
  padding:10px 14px;border-radius:10px;border:1px solid #e6e9ef;min-width:260px;background:#fff;box-shadow:0 1px 0 rgba(16,24,40,0.02);
`

const Select = styled.select`
  padding:10px 14px;border-radius:10px;border:1px solid #e6e9ef;background:#fff;
`
const Icon = styled.span`
  display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;background:transparent;color:var(--muted);
`
export default function Controls({ query, onQueryChange, sort, onSortChange }){
  return (
    <ControlsRoot>
      <Input placeholder="Pesquisar produtos" value={query} onChange={e=>onQueryChange(e.target.value)} />
      <Select value={sort} onChange={e=>onSortChange(e.target.value)}>
        <option value="name_asc">Nome crescente</option>
        <option value="name_desc">Nome decrescente</option>
        <option value="yield_desc">Maior rentabilidade</option>
        <option value="yield_asc">Menor rentabilidade</option>
      </Select>
    </ControlsRoot>
  )
}
