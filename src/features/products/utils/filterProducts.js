export function getUniqueBrands(products) {
  return [...new Set(products.map((product) => product.brand).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second));
}

export function filterProducts(products, { minPrice, maxPrice, brands }) {
  const minimum = minPrice === "" ? null : Number(minPrice);
  const maximum = maxPrice === "" ? null : Number(maxPrice);
  const selectedBrands = new Set(brands);

  return products.filter((product) => {
    const aboveMinimum = minimum === null || product.price >= minimum;
    const belowMaximum = maximum === null || product.price <= maximum;
    const matchesBrand = selectedBrands.size === 0 || selectedBrands.has(product.brand);

    return aboveMinimum && belowMaximum && matchesBrand;
  });
}
