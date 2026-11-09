import {
  PRODUCT_CURRENCY_CODE,
  PRODUCT_CURRENCY_LOCALE,
} from "../../../constants/products";

const currencyFormatter = new Intl.NumberFormat(PRODUCT_CURRENCY_LOCALE, {
  style: "currency",
  currency: PRODUCT_CURRENCY_CODE,
  maximumFractionDigits: 2,
});

export default function formatCurrency(amount) {
  const numericAmount = Number(amount);
  return Number.isFinite(numericAmount) ? currencyFormatter.format(numericAmount) : "—";
}
