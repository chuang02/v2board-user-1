declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}

import type { HTMLAttributes } from 'react'

declare module 'react' {
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean
  }
}

declare global {
  interface Window {
    settings?: {
      title?: string
      description?: string
      version?: string
      crisp_id?: string
      background_url?: string
      host?: string
      theme?: {
        sidebar: 'light' | 'dark'
        header: 'dark' | 'dark'
        color: 'default' | 'black' | 'darkblue'
      }
    }
  }
}
