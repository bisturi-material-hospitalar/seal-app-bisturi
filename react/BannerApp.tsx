import React, { useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'fixedContainer',
  'fixedXDiv',
  'fixedMainDiv',
  'fixedLogo',
  'fixedTitle',
  'fixedButton',
  'fixedImage',
] as const

interface Props {
  measurementId: string
  apiSecret: string
  appLink?: string
}

interface AnalyticsEvent {
  name: string
  params: Array<{
    source: string
    browser: string
    link: string
    action?: string
  }>
}

interface AnalyticsParams {
  client_id: string
  events: AnalyticsEvent[]
}

const calculateHashCode = (input: string): number => {
  let hash = 0

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)

    hash = (hash << 5) - hash + char
    hash |= 0
  }

  return hash
}

const DEFAULT_APP_LINK = 'https://bisturi.page.link/app'

const AppBanner: StorefrontFunctionComponent<Props> = ({
  measurementId,
  apiSecret,
  appLink,
}: Props & {
  children?: React.ReactNode
  measurementId: string
  apiSecret: string
  appLink?: string
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  const clientId = calculateHashCode(ua).toString()
  const browser =
    /(chrome|chromium|crios|firefox|fxios|safari|opr|edg)/i
      .exec(ua)?.[0]
      ?.toLowerCase() ?? 'other'

  const device = /android/i.test(ua)
    ? 'android'
    : /iPhone|iPad|iPod/i.test(ua)
      ? 'ios'
      : 'web'

  const resolvedAppLink = appLink && appLink.trim() !== '' ? appLink : DEFAULT_APP_LINK

  const sendEvent = React.useCallback(
    (eventName: string, action?: string) => {
      const body: AnalyticsParams = {
        client_id: clientId,
        events: [
          {
            name: eventName,
            params: [
              {
                source: device,
                browser,
                link: window.location.hostname,
                ...(action && { action }),
              },
            ],
          },
        ],
      }

      try {
        // tenta enviar com keepalive quando disponível (melhora a chance do evento chegar antes da navegação)
        if (navigator && 'sendBeacon' in navigator) {
          const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`
          const payload = JSON.stringify(body)
          // sendBeacon precisa de FormData ou ArrayBufferView; usar blob
          const blob = new Blob([payload], { type: 'application/json' })
            ; (navigator as any).sendBeacon(url, blob)
        } else {
          fetch(
            `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
            {
              method: 'POST',
              body: JSON.stringify(body),
              keepalive: true,
            }
          )
        }
      } catch (err) {
        // se falhar, não bloqueia a navegação
        console.warn('Analytics send failed', err)
      }
    },
    [clientId, device, browser, measurementId, apiSecret]
  )

  useEffect(() => {
    if (sessionStorage.getItem('banner_closed')) return
    if (device === 'android' || device === 'ios') {
      sendEvent('web_plugin_view')
    }
  }, [
    device,
    measurementId,
    apiSecret,
    clientId,
    browser,
    appLink,
    ua,
    sendEvent,
  ])

  const close = () => {
    sessionStorage.setItem('banner_closed', 'true')
    document.getElementById('bannerFixedContainer')?.classList.add('dn')
    sendEvent('web_plugin_dismiss')
  }

  const open = (targetLink = resolvedAppLink) => {
    sessionStorage.setItem('banner_closed', 'true')
    sendEvent('web_plugin_open', 'instalar agora')
    // navega explicitamente (fallback caso o <a> não execute por algum motivo)
    window.location.href = targetLink
  }

  if (device !== 'android' && device !== 'ios') {
    return null
  }

  return (
    <div className={handles.fixedContainer} id="bannerFixedContainer">
      <div
        className={handles.fixedXDiv}
        role="button"
        tabIndex={0}
        onClick={close}
        onKeyDown={(e) => ['Enter', ' '].includes(e.key) && close()}
        aria-label="Fechar banner"
        title="Fechar banner"
      >
        {/* SVG… */}
      </div>
      <div className={handles.fixedMainDiv}>
        <div className={handles.fixedLogo}>
          <img
            src="https://arquivos.bisturi.com.br/imagens/icon/mascote-100x100-banner.png"
            alt="Mascote Bisturi"
            className={handles.fixedImage}
          />
        </div>
        <div className={handles.fixedTitle}>
          Baixe nosso APP e aproveite as ofertas.
        </div>

        <button
          type="button"
          className={handles.fixedButton}
          onClick={(e) => {
            e.preventDefault()
            open(resolvedAppLink)
          }}
        >
          Baixar agora
        </button>
      </div>
    </div>
  )
}

export default AppBanner
