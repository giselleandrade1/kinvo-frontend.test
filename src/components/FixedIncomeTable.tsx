import React from "react";
import styled from "styled-components";
import { FixedIncomeProduct } from "../types";

interface FixedIncomeTableProps {
  products: FixedIncomeProduct[];
  loading: boolean;
  error?: string;
}

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  thead {
    background: #f5f7fa;
    border-bottom: 2px solid #e0e6ed;
  }

  th {
    padding: 16px;
    text-align: left;
    font-weight: 600;
    color: #333;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #e0e6ed;
    color: #666;
    font-size: 14px;
  }

  tbody tr:hover {
    background: #f9fafb;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled(LoadingMessage)`
  color: #d32f2f;
`;

const EmptyMessage = styled(LoadingMessage)`
  color: #999;
`;

const ProfitabilityBadge = styled.span<{ positive: boolean }>`
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 600;
  color: ${(props) => (props.positive ? "#2e7d32" : "#d32f2f")};
  background: ${(props) => (props.positive ? "#e8f5e9" : "#ffebee")};
`;

export const FixedIncomeTable: React.FC<FixedIncomeTableProps> = ({
  products,
  loading,
  error,
}) => {
  if (loading) {
    return <LoadingMessage>Carregando produtos...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Erro ao carregar: {error}</ErrorMessage>;
  }

  if (products.length === 0) {
    return <EmptyMessage>Nenhum produto encontrado</EmptyMessage>;
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>Nome do Ativo</th>
            <th>Classe</th>
            <th>Data de Vencimento</th>
            <th>Rentabilidade</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.class_name || product.asset_name || "-"}</td>
              <td>{new Date(product.due_date).toLocaleDateString("pt-BR")}</td>
              <td>
                <ProfitabilityBadge positive={product.profitability >= 0}>
                  {product.profitability >= 0 ? "+" : ""}
                  {product.profitability.toFixed(2)}%
                </ProfitabilityBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};
