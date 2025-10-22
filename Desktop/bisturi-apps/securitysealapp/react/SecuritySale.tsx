import React, { useEffect } from 'react'

// Função auxiliar para adicionar o script externo ao DOM
function addExternalScript(
  src: string,
  id: string,
  attributes: { [key: string]: string }
): HTMLScriptElement {
  const scriptElement = document.createElement('script')

  scriptElement.type = 'text/javascript'
  scriptElement.id = id
  scriptElement.src = src
  Object.entries(attributes).forEach(([key, value]) => {
    scriptElement.setAttribute(key, value)
  })
  document.body.appendChild(scriptElement)

  return scriptElement
}

const VerifiedSealComponent: StorefrontFunctionComponent = () => {
  useEffect(() => {
    const scriptAttributes = {
      'data-id': 'eVg4MERCeUR3al9tUDhySjpiaXN0dXJpLW1hdGVyaWFsLWhvc3BpdGFsYXI=',
      'data-target': 'ra-verified-seal',
      'data-model': '1',
    }

    const scriptSrc =
      'https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js'

    const scriptId = 'ra-embed-verified-seal'

    // Adiciona o script externo ao DOM
    const scriptElement = addExternalScript(
      scriptSrc,
      scriptId,
      scriptAttributes
    )

    // Função de limpeza para remover o script ao desmontar o componente
    return () => {
      document.body.removeChild(scriptElement)
    }
  }, [])

  return (
    <>
      <div id="ra-verified-seal"></div>
    </>
  )
}

export default VerifiedSealComponent
