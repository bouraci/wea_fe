"use client"

import { createContext, useState, ReactNode, useContext } from "react";
import {BookFilterType} from "@/app/types/BookFilterType";

type FilterContextType = {
    tempFilters: BookFilterType;
    appliedFilters: BookFilterType;
    setTempFilters: (filters: Partial<FilterContextType["tempFilters"]>) => void;
    applyFilters: () => void;
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
    const [tempFilters, setTempFiltersState] = useState<FilterContextType["tempFilters"]>({
        title: "",
        author: "",
        genre: "",
        publicationYear: "",
        minRating: "",
        maxRating: "",
    });

    const [appliedFilters, setAppliedFilters] = useState<FilterContextType["appliedFilters"]>({
        ...tempFilters,
    });

    const setTempFilters = (newFilters: Partial<FilterContextType["tempFilters"]>) => {
        setTempFiltersState((prev) => ({ ...prev, ...newFilters }));
    };

    const applyFilters = () => {
        setAppliedFilters({ ...tempFilters });
    };

    return (
        <FilterContext.Provider value={{ tempFilters, appliedFilters, setTempFilters, applyFilters }}>
            {children}
        </FilterContext.Provider>
    );
}
