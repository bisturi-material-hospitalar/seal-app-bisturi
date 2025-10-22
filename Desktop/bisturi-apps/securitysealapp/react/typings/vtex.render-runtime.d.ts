/* Typings for `render-runtime` */
declare module 'vtex.render-runtime' {
  import type { ComponentType, ReactElement, ReactType } from 'react'
  import { Component } from 'react'

  export interface NavigationOptions {
    page: string
    params?: any
  }

  export interface RenderContextProps {
    runtime: {
      navigate: (options: NavigationOptions) => void
    }
  }

  interface ExtensionPointProps {
    id: string
    [key: string]: any
  }

  export const ExtensionPoint: ComponentType<ExtensionPointProps>

  interface ChildBlockProps {
    id: string
  }

    export type StorefrontFunctionComponent<P = Record<string, unknown>> =
    ComponentType<P> & {
      schema?: Record<string, unknown>
      getSchema?(props?: P): Record<string, unknown>
    }

  export const ChildBlock: ComponentType<ChildBlockProps>
  export const useChildBlock = function ({ id: string }): object { }
  export function useRuntime(): RenderContextProps['runtime']
  export const Helmet: ReactElement
  export const Link: ReactType
  export const NoSSR: ReactElement
  export const RenderContextConsumer: ReactElement
  export const canUseDOM: boolean
  export const withRuntimeContext: <TOriginalProps extends {}>(
    Component: ComponentType<TOriginalProps & RenderContextProps>
  ) => ComponentType<TOriginalProps>

  export interface NavigationOptions {
    page: string
    params?: Record<string, unknown>
    to?: string
  }

  // Propriedades do contexto de renderização
  export interface RenderContextProps {
    runtime: {
      navigate(options: NavigationOptions): void
      account?: string
      workspace?: string
      route?: {
        path: string
        params: Record<string, string>
      }
      [key: string]: unknown
    }
  }
}
