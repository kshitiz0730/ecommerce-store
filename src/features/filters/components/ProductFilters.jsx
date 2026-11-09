import { useState } from "react";

export default function ProductFilters({
  categories,
  category,
  minPrice,
  maxPrice,
  brands,
  selectedBrands,
  categoriesLoading,
  categoriesError,
  onRetryCategories,
  brandsLoading,
  brandsError,
  onRetryBrands,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onBrandChange,
  onClear,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const invalidPriceRange =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice);
  const activeFilterCount =
    Number(category !== "") +
    Number(minPrice !== "") +
    Number(maxPrice !== "") +
    selectedBrands.length;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <aside className="h-fit w-full min-w-0 rounded-md border border-neutral-200 p-3 lg:w-64 lg:shrink-0 sm:p-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3 lg:mb-5">
        <h2 className="m-0 text-lg font-bold sm:text-xl">Filters</h2>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              className="text-sm font-semibold text-blue-700 underline-offset-2 hover:underline"
              type="button"
              onClick={onClear}
            >
              Clear all
            </button>
          )}
          <button
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 lg:hidden"
            type="button"
            aria-controls="product-filter-controls"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((isOpen) => !isOpen)}
          >
            <span>{filtersOpen ? "Hide" : "Show"}</span>
            {hasActiveFilters && (
              <span className="grid size-5 place-items-center rounded-full bg-blue-700 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
            <svg
              className={`size-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="product-filter-controls"
        className={`${filtersOpen ? "block" : "hidden"} mt-5 space-y-6 lg:mt-0 lg:block`}
      >
        <fieldset className="border-0 p-0">
          <legend className="mb-3 text-base font-bold">Categories</legend>
          {categoriesLoading ? (
            <p className="text-sm text-neutral-500">Loading categories…</p>
          ) : categoriesError ? (
            <div className="space-y-2 text-sm text-red-800">
              <p>{categoriesError}</p>
              <button className="font-semibold underline" type="button" onClick={onRetryCategories}>
                Try again
              </button>
            </div>
          ) : (
            <div className="max-h-56 space-y-2 overflow-y-auto sm:max-h-64">
              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  className="mt-0.5 size-4 shrink-0 accent-blue-700"
                  type="radio"
                  name="category"
                  checked={category === ""}
                  onChange={() => onCategoryChange("")}
                />
                <span>All categories</span>
              </label>
              {categories.map((item) => (
                <label className="flex cursor-pointer items-start gap-2 text-sm" key={item.slug}>
                  <input
                    className="mt-0.5 size-4 shrink-0 accent-blue-700"
                    type="radio"
                    name="category"
                    checked={category === item.slug}
                    onChange={() => onCategoryChange(item.slug)}
                  />
                  <span className="break-words">{item.name}</span>
                </label>
              ))}
            </div>
          )}
        </fieldset>

        <fieldset className="border-0 p-0">
          <legend className="mb-3 text-base font-bold">Price range</legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="min-w-0">
              <span className="sr-only">Minimum price</span>
              <input
                className="min-h-10 w-full min-w-0 rounded border border-neutral-300 px-2 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:px-2.5"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="Min"
                value={minPrice}
                onChange={(event) => onMinPriceChange(event.target.value)}
              />
            </label>
            <label className="min-w-0">
              <span className="sr-only">Maximum price</span>
              <input
                className="min-h-10 w-full min-w-0 rounded border border-neutral-300 px-2 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:px-2.5"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="Max"
                value={maxPrice}
                onChange={(event) => onMaxPriceChange(event.target.value)}
              />
            </label>
          </div>
          {invalidPriceRange && (
            <p className="mt-2 text-sm text-amber-700" role="status">
              Minimum price is above maximum price.
            </p>
          )}
        </fieldset>

        <fieldset className="border-0 p-0">
          <legend className="mb-3 text-base font-bold">Brands</legend>
          {brandsError ? (
            <div className="space-y-2 text-sm text-red-800">
              <p>{brandsError}</p>
              <button className="font-semibold underline" type="button" onClick={onRetryBrands}>
                Try again
              </button>
            </div>
          ) : brandsLoading ? (
            <p className="text-sm text-neutral-500">Loading brands…</p>
          ) : brands.length === 0 ? (
            <p className="text-sm text-neutral-500">No brand options for these products.</p>
          ) : (
            <div className="max-h-56 space-y-2 overflow-y-auto sm:max-h-64">
              {brands.map((brand) => (
                <label className="flex cursor-pointer items-start gap-2 text-sm" key={brand}>
                  <input
                    className="mt-0.5 size-4 shrink-0 accent-blue-700"
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrandChange(brand)}
                  />
                  <span className="break-words">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </fieldset>
      </div>
    </aside>
  );
}
