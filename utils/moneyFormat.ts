const formatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export function formatMoney(input: number) {
  return formatter.format(input / 100);
}
