const currencyFormatter = new Intl.NumberFormat(undefined, {
   currency: "usd",
   style: "currency",
   minimumFractionDigits: 0
});

export function formatCurrency(currency: number) {
   return currencyFormatter.format(currency);
}

