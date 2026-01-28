export interface FixedIncomeProduct {
  id: number;
  name: string;
  bondType: string;
  due_date: string;
  profitability: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
