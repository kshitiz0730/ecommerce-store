const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}
