"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { BookFilterType } from "@/app/types/BookFilterType";

type FilterContextType = {
  tempFilters: BookFilterType;
  appliedFilters: BookFilterType;
  page: number;
  setTempFilters: (filters: Partial<BookFilterType>) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const initialFilters: BookFilterType = {
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    minRating: "",
    maxRating: "",
  };

  const [tempFilters, setTempFiltersState] =
    useState<BookFilterType>(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<BookFilterType>(initialFilters);
  const [page, setPage] = useState(1);

  const setTempFilters = (newFilters: Partial<BookFilterType>) => {
    setTempFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setPage(1);
  };

  const clearFilters = () => {
    setTempFiltersState(initialFilters);
    setAppliedFilters(initialFilters);
    setPage(1);
  };

  return (
    <FilterContext.Provider
      value={{
        tempFilters,
        appliedFilters,
        page,
        setTempFilters,
        applyFilters,
        clearFilters,
        setPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
