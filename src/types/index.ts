export interface FixedIncomeProduct {
  id: string;
  name: string;
  description?: string;
  due_date: string;
  asset_name: string;
  profitability: number;
  asset_icon?: string;
  class_name?: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
