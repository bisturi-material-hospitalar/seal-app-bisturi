import React, { useEffect, useState } from 'react'
import { StorefrontFunctionComponent } from 'vtex.render-runtime'
import { formatCurrency } from 'vtex.format-currency'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  labelText: string
}

const CSS_HANDLES = ['container', 'price', 'label'] as const

const DEFAULT_CURRENCY = 'BRL'

const PixPriceShelf: StorefrontFunctionComponent<Props> = ({
  labelText,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()
  const [basePrice, setBasePrice] = useState<number | null>(null)

  useEffect(() => {
    if (productContext && productContext.product) {
      setBasePrice(productContext.product.priceRange.sellingPrice.highPrice)
    }
  }, [productContext])

  if (basePrice === null) {
    return null
  }

  // Calcula o preço com 5% de desconto para PIX
  const pixPrice = Math.round(basePrice * 0.95)

  // Formata o preço para moeda brasileira
  const formattedPrice = (value: number) =>
    formatCurrency({ value, currencyISO: DEFAULT_CURRENCY })

  return (
    <div className={handles.container}>
      <span className={handles.price}>
        {`${formattedPrice(pixPrice)} `}
        <span className={handles.label}>{labelText}</span>
      </span>
    </div>
  )
}

// Schema para o Site Editor
PixPriceShelf.schema = {
  title: 'Preço com desconto no PIX',
  description: 'Exibe preço com 5% de desconto no PIX',
  type: 'object',
  properties: {
    labelText: {
      type: 'string',
      title: 'Texto do rótulo ao lado do preço',
      default: 'NO PIX',
    },
  },
}

export default PixPriceShelf
