"use client"

import {useFilter} from "@contexts/FilterContext";
import {ChangeEvent} from "react";
import {UserChip} from "@components/user/user-chip";
import {useFetch} from "@hooks/useFetch";
import {getAllGenres} from "@api/genreFetchers";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {LocaleSwitcher} from "@components/locale";
import {useTranslations} from "next-intl";

export function Sidebar() {
    const t = useTranslations('common');
    const {tempFilters, setTempFilters, applyFilters} = useFilter();
    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setTempFilters({[name]: value});
    };
    const {data} = useFetch<string[]>(
        `/api/books/genres`,
        () => getAllGenres()
    );
    const isRoot = usePathname() === "/";


    return (
        <div className="h-screen max-w-sm w-max bg-zinc-800 p-4 flex flex-col">
            <>
                <div className="filter-group">
                    <label htmlFor="title">{t('title')}</label>
                    <input
                        id="title"
                        name="title"
                        value={tempFilters.title}
                        placeholder={t('hintTitle')}
                        onChange={handleFilterChange}
                        disabled={!isRoot}
                    />

                    <label htmlFor="author">{t('author')}</label>
                    <input
                        id="author"
                        name="author"
                        value={tempFilters.author}
                        placeholder={t('hintAuthor')}
                        onChange={handleFilterChange}
                        disabled={!isRoot}
                    />

                    {data && (
                        <>
                            <label htmlFor="genre">{t('genre')}</label>
                            <select
                                id="genre"
                                name="genre"
                                value={tempFilters.genre}
                                onChange={handleFilterChange}
                                disabled={!isRoot}
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

                    <label htmlFor="publicationYear">{t('publicationYear')}</label>
                    <input
                        id="publicationYear"
                        type="number"
                        name="publicationYear"
                        value={tempFilters.publicationYear ?? ''}
                        placeholder={t('year')}
                        min="0"
                        onChange={handleFilterChange}
                        disabled={!isRoot}
                    />

                    <label htmlFor="minRating">{t('minRating')}</label>
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
                        disabled={!isRoot}
                    />

                    <label htmlFor="maxRating">{t('maxRating')}</label>
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
                        disabled={!isRoot}
                    />
                </div>

                <div className="mt-4">
                    <button
                        disabled={!isRoot}
                        className={
                        clsx("px-4 py-2 rounded-lg bg-blue-500/50 border border-blue-500 transition-all duration-200", !isRoot ? "cursor-not-allowed" : "hover:bg-blue-500")}
                        onClick={applyFilters}
                    >
                        {t('applyFilter')}
                    </button>
                </div>
            </>

            <div className="mt-auto flex flex-col gap-6">
                <LocaleSwitcher/>
                <UserChip/>
            </div>
        </div>
    )
}