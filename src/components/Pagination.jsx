import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display:flex;gap:8px;justify-content:center;margin-top:20px;
`

const Btn = styled.button`
  padding:8px 12px;border-radius:6px;border:1px solid #ddd;background:${p=>p.active?'#222':'#fff'};color:${p=>p.active?'#fff':'#222'};cursor:pointer;
`
export default function Pagination({ total, pageSize, currentPage, onChange }){
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const arr = Array.from({ length: pages }, (_, i) => i + 1)
  if (pages === 0) return null
  return (
    <Wrapper>
      {arr.map(p => (
        <Btn key={p} active={p===currentPage} onClick={()=>onChange(p)}>{p}</Btn>
      ))}
    </Wrapper>
  )
}
