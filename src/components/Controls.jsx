import React from 'react'
import styled from 'styled-components'

const ControlsRoot = styled.div`
  display:flex;gap:12px;align-items:center;
`

const Input = styled.input`
  padding:8px 12px;border-radius:8px;border:1px solid #ddd;min-width:240px;
`

const Select = styled.select`
  padding:8px 12px;border-radius:8px;border:1px solid #ddd;
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
