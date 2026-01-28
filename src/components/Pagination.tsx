import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const Button = styled.button<{ active?: boolean; disabled?: boolean }>`
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: ${(props) => (props.active ? "#1976d2" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    border-color: #1976d2;
    background: ${(props) => (props.active ? "#1565c0" : "#f5f5f5")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Info = styled.span`
  color: #666;
  font-size: 14px;
  margin: 0 16px;
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page buttons (max 5 visible)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <Button onClick={handlePrevious} disabled={currentPage === 1}>
        ← Anterior
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return <span key={`dots-${index}`}>...</span>;
        }

        return (
          <Button
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        );
      })}

      <Button onClick={handleNext} disabled={currentPage === totalPages}>
        Próximo →
      </Button>

      <Info>
        Página {currentPage} de {totalPages}
      </Info>
    </PaginationContainer>
  );
};
