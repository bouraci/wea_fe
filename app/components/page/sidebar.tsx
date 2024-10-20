"use client"

import {useFilter} from "@contexts/FilterContext";
import {ChangeEvent} from "react";
import {UserChip} from "@components/user/user-chip";
import {useUser} from "@hooks/useUser";

export function Sidebar() {
    const { tempFilters, setTempFilters, applyFilters } = useFilter();
    const { user } = useUser();

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTempFilters({ [name]: value });
    };

    return (
        <div className="h-screen bg-zinc-800 w-1/6 p-4 flex flex-col">
            <>
            <div className="filter-group">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    value={tempFilters.title}
                    placeholder="Enter title"
                    onChange={handleFilterChange}
                />

                <label htmlFor="author">Author</label>
                <input
                    id="author"
                    name="author"
                    value={tempFilters.author}
                    placeholder="Enter author"
                    onChange={handleFilterChange}
                />

                <label htmlFor="genre">Genre</label>
                <input
                    id="genre"
                    name="genre"
                    value={tempFilters.genre}
                    placeholder="Enter genre"
                    onChange={handleFilterChange}
                />

                <label htmlFor="publicationYear">Publication Year</label>
                <input
                    id="publicationYear"
                    type="number"
                    name="publicationYear"
                    value={tempFilters.publicationYear ?? ''}
                    placeholder="Year"
                    min="0"
                    onChange={handleFilterChange}
                />

                <label htmlFor="minRating">Min Rating</label>
                <input
                    id="minRating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="minRating"
                    value={tempFilters.minRating ?? ''}
                    placeholder="0 - 5"
                    onChange={handleFilterChange}
                />

                <label htmlFor="maxRating">Max Rating</label>
                <input
                    id="maxRating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="maxRating"
                    value={tempFilters.maxRating ?? ''}
                    placeholder="0 - 5"
                    onChange={handleFilterChange}
                />
            </div>

            <div className="mt-4">
                <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 transition-all duration-200" onClick={applyFilters}>
                    Filter
                </button>
            </div>
            </>

            <div className="mt-auto">
                <UserChip user={user} />
            </div>
        </div>
    )
}