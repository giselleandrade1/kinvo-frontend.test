import React from "react";
import styled from "styled-components";

interface FilterControlsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
}

const ControlsContainer = styled.fieldset`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Legend = styled.legend`
  display: none;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 250px;
`;

const SelectWrapper = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
`;

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}) => {
  return (
    <ControlsContainer>
      <Legend>Filtros de Busca e Ordenação</Legend>
      <InputWrapper>
        <Label htmlFor="search">Buscar</Label>
        <Input
          id="search"
          type="text"
          name="search"
          placeholder="Buscar por nome do ativo..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar produtos por nome ou classe"
        />
      </InputWrapper>

      <SelectWrapper>
        <Label htmlFor="sort">Ordenar por</Label>
        <Select
          id="sort"
          name="sort"
          title="Selecione a forma de ordenação dos produtos"
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Ordenar produtos por"
        >
          <option value="name">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="due_date">Data de Vencimento</option>
          <option value="profitability">Rentabilidade (Menor)</option>
          <option value="profitability-desc">Rentabilidade (Maior)</option>
        </Select>
      </SelectWrapper>
    </ControlsContainer>
  );
};
