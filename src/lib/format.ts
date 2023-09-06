// Format price to GBP
export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
  });
}
