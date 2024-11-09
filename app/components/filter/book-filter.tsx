import { useTranslations } from "next-intl";
import { useFilter } from "@contexts/FilterContext";
import { ChangeEvent } from "react";
import { useFetch } from "@hooks/useFetch";
import { getAllGenres } from "@api/genreFetchers";
import { usePathname } from "next/navigation";
import { LabeledInput, LabeledSelect } from "@components/input";
import { Button } from "@components/button";

export function BookFilter() {
  const t = useTranslations("common");
  const { tempFilters, setTempFilters, applyFilters, clearFilters } =
    useFilter();
  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTempFilters({ [name]: value });
  };
  const { data } = useFetch<string[]>(`/api/books/genres`, () =>
    getAllGenres(),
  );
  const isRoot = usePathname() === "/";

  return (
    <>
      <div className="flex flex-col gap-4">
        <LabeledInput
          label={t("title")}
          id="title"
          name="title"
          value={tempFilters.title}
          placeholder={t("hintTitle")}
          onChange={handleFilterChange}
          disabled={!isRoot}
        />

        <LabeledInput
          label={t("author")}
          id="author"
          name="author"
          value={tempFilters.author}
          placeholder={t("hintAuthor")}
          onChange={handleFilterChange}
          disabled={!isRoot}
        />

        {data && (
          <LabeledSelect
            label={t("genre")}
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
          </LabeledSelect>
        )}

        <LabeledInput
          label={t("publicationYear")}
          id="publicationYear"
          type="number"
          name="publicationYear"
          value={tempFilters.publicationYear ?? ""}
          placeholder={t("year")}
          min="0"
          onChange={handleFilterChange}
          disabled={!isRoot}
        />

        <LabeledInput
          label={t("minRating")}
          id="minRating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="minRating"
          value={tempFilters.minRating ?? ""}
          placeholder="0 - 5"
          onChange={handleFilterChange}
          disabled={!isRoot}
        />

        <LabeledInput
          label={t("maxRating")}
          id="maxRating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="maxRating"
          value={tempFilters.maxRating ?? ""}
          placeholder="0 - 5"
          onChange={handleFilterChange}
          disabled={!isRoot}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          label={t("applyFilter")}
          onClick={applyFilters}
          disabled={!isRoot}
        />
        <Button
          label={t("resetFilter")}
          onClick={clearFilters}
          disabled={!isRoot}
          variant="bad"
        />
      </div>
    </>
  );
}
