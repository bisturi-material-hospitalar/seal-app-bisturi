// react/typings/vtex.d.ts
declare module 'vtex.product-summary-context' {
  import { ProductSummaryContext } from '@vtex/gatsby-theme-store'
  export function useProductSummary(): {
    summary: { price: number }
    product: { categoryTree: Array<{ id: number }> }
  }
}

declare module 'vtex.format-currency' {
  export function formatCurrency(opts: {
    value: number
    currencyISO: string
  }): string
}
