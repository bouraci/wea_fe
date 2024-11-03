"use client"

import {useFilter} from "@contexts/FilterContext";
import {ChangeEvent} from "react";
import {UserChip} from "@components/user/user-chip";
import {useFetch} from "@hooks/useFetch";
import {getAllGenres} from "@api/genreFetchers";

export function Sidebar() {
    const {tempFilters, setTempFilters, applyFilters} = useFilter();

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setTempFilters({[name]: value});
    };

    const {data} = useFetch<string[]>(
        `/api/books/genres`,
        () => getAllGenres()
    );

    return (
        <div className="h-screen max-w-sm w-max bg-zinc-800 p-4 flex flex-col">
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

                    {data && (
                        <>
                            <label htmlFor="genre">Genre</label>
                            <select
                                id="genre"
                                name="genre"
                                value={tempFilters.genre}
                                onChange={handleFilterChange}
                            >
                                <option value=""></option>
                                {data.map((genre, index) => (
                                    <option key={index} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

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
                    <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-800 transition-all duration-200"
                            onClick={applyFilters}>
                        Filter
                    </button>
                </div>
            </>

            <div className="mt-auto">
                <UserChip/>
            </div>
        </div>
    )
}