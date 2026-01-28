import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FixedIncomeProduct } from "../types";
import { fetchFixedIncomeData } from "../services/api";
import { Header } from "../components/Header";
import { FilterControls } from "../components/FilterControls";
import { FixedIncomeTable } from "../components/FixedIncomeTable";
import { Pagination } from "../components/Pagination";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 14px;
    color: #999;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  p {
    font-size: 24px;
    font-weight: 700;
    color: #1976d2;
  }
`;

const ErrorBanner = styled.div`
  background: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 24px;
`;

export const Home: React.FC = () => {
  const [allProducts, setAllProducts] = useState<FixedIncomeProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    FixedIncomeProduct[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchFixedIncomeData();
        setAllProducts(data);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...allProducts];

    // Apply search filter
    if (searchValue.trim()) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          (product.asset_name &&
            product.asset_name
              .toLowerCase()
              .includes(searchValue.toLowerCase())),
      );
    }

    // Apply sorting
    switch (sortValue) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "due_date":
        result.sort(
          (a, b) =>
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
        );
        break;
      case "profitability":
        result.sort((a, b) => a.profitability - b.profitability);
        break;
      case "profitability-desc":
        result.sort((a, b) => b.profitability - a.profitability);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filtering
  }, [allProducts, searchValue, sortValue]);

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalProfitability = allProducts.reduce(
    (sum: number, product: FixedIncomeProduct) => sum + product.profitability,
    0,
  );
  const averageProfitability =
    allProducts.length > 0 ? totalProfitability / allProducts.length : 0;

  return (
    <Container>
      <Header />
      <ContentWrapper>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        {!loading && (
          <>
            <StatsContainer>
              <StatCard>
                <h3>Total de Produtos</h3>
                <p>{allProducts.length}</p>
              </StatCard>
              <StatCard>
                <h3>Rentabilidade Total</h3>
                <p>{totalProfitability.toFixed(2)}%</p>
              </StatCard>
              <StatCard>
                <h3>Rentabilidade Média</h3>
                <p>{averageProfitability.toFixed(2)}%</p>
              </StatCard>
              <StatCard>
                <h3>Produtos Encontrados</h3>
                <p>{filteredProducts.length}</p>
              </StatCard>
            </StatsContainer>

            <FilterControls
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              sortValue={sortValue}
              onSortChange={setSortValue}
            />
          </>
        )}

        <FixedIncomeTable
          products={paginatedProducts}
          loading={loading}
          error={error || undefined}
        />

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </ContentWrapper>
    </Container>
  );
};
