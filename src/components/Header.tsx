import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Minhas Rendas Fixas</Title>
      <Subtitle>Gerenciador de produtos de renda fixa</Subtitle>
    </HeaderContainer>
  );
};
