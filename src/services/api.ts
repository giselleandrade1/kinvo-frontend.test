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
    return response.data || [];
  } catch (error) {
    console.error("Error fetching fixed income data:", error);
    throw error;
  }
};
