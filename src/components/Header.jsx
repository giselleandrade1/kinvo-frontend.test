import React from 'react'
import styled from 'styled-components'

const HeaderRoot = styled.header`
  display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;
`

const Title = styled.h1`
  font-size:24px;margin:0;
`

export default function Header(){
  return (
    <HeaderRoot>
      <Title>Kinvo desafio frontend</Title>
      <div />
    </HeaderRoot>
  )
}
