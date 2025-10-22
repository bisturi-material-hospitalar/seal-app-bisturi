import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

type ButtonWhatsappProps = {
  phoneNumber: string
  whatsappModalText: string
  whatsappModalLogo: string
  isActive: boolean
}

const CSS_HANDLES = [
  'whatsappButtonContainer',
  'whatsappButton',
  'whatsappModal',
  'whatsappModalLogo',
  'whatsappModalText',
] as const

const ButtonWhatsapp: StorefrontFunctionComponent<ButtonWhatsappProps> = ({
  phoneNumber,
  whatsappModalText,
  isActive = true,
}: ButtonWhatsappProps) => {
  const handles = useCssHandles(CSS_HANDLES)
  const whatsappModalLogo =
    'https://arquivos.bisturi.com.br/imagens/site/icones/logo-whatsapp-modal.svg'

  const whatsappLink = `https://wa.me/${phoneNumber}`

  // Se não estiver ativo, não renderiza nada
  if (!isActive) {
    return null
  }

  return (
    <div className={`${handles.whatsappButtonContainer}`}>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`${handles.whatsappButton}`}
      >
        <img
          src={whatsappModalLogo}
          alt="Logo do Whatsapp"
          className={`${handles.whatsappModalLogo}`}
        />
      </a>
      <div className={`${handles.whatsappModal}`}>
        <p>{whatsappModalText}</p>
      </div>
    </div>
  )
}

ButtonWhatsapp.schema = {
  title: 'Botão Flutuante do Whatsapp',
  description: 'Botão Flutuante do Whatsapp',
  type: 'object',
  properties: {
    isActive: {
      title: 'Ativar Botão',
      description: 'Ativa ou desativa o botão do WhatsApp',
      type: 'boolean',
      default: true,
    },
    phoneNumber: {
      title: 'Número do Whatsapp',
      description: 'Número do Whatsapp',
      type: 'string',
      default: '+5521970286603',
    },
    whatsappModalText: {
      title: 'Texto do Botão',
      description: 'Texto do Botão',
      type: 'string',
      default: 'Compre pelo Whatsapp',
    },
    whatsappModalLogo: {
      title: 'Logo do Whatsapp',
      description: 'Logo do Whatsapp',
      type: 'string',
      default:
        'https://arquivos.bisturi.com.br/imagens/site/icones/logo-whatsapp-modal.svg',
    },
  },
}

export default ButtonWhatsapp
