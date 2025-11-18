import React from 'react'
import styled from 'styled-components'

const HeaderRoot = styled.header`
  display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;
`

const Title = styled.h1`
  font-size:20px;margin:0;font-weight:700;color:var(--text);
`

const Subtitle = styled.div`
  font-size:13px;color:var(--muted);
`

const Left = styled.div`
  display:flex;flex-direction:column;gap:4px;
`
export default function Header(){
  return (
    <HeaderRoot>
      <Left>
        <Title>Kinvo — Desafio Frontend</Title>
        <Subtitle>Lista de produtos de renda fixa</Subtitle>
      </Left>
      <div />
    </HeaderRoot>
  )
}
