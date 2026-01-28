import axios from "axios";
import { FixedIncomeProduct } from "../types";

const API_URL =
  "https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const fetchFixedIncomeData = async (): Promise<FixedIncomeProduct[]> => {
  try {
    const response = await apiClient.get("/");
    const rawData = response.data?.data?.snapshotByProduct || [];

    // Transformar dados da API para o formato esperado
    return rawData.map((item: any, index: number) => ({
      id: item.fixedIncome?.portfolioProductId || index,
      name: item.fixedIncome?.name || "Produto sem nome",
      bondType: item.fixedIncome?.bondType || "N/A",
      due_date: item.due?.date || "N/A",
      profitability: item.position?.profitability || 0,
    }));
  } catch (error) {
    console.error("Error fetching fixed income data:", error);
    throw error;
  }
};
