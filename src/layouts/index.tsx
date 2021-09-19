import './style.less'
import type { FC } from 'react'
import type { IRouteComponentProps } from 'umi'
import {
  title,
  version,
  sidebarTheme,
  headerTheme,
  colorTheme,
  isNoLaooutPath,
  isProduction,
  isStandAlone,
  envFile,
} from '@/default'
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import classNames from 'classnames/bind'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import { getLocale } from 'umi'
import { ConfigProvider } from 'antd'

import { useTitle, useExternal } from 'ahooks'

const LayoutPage: FC<IRouteComponentProps> = (props) => {
  const [sideOpen, setSideOpen] = useState(false)
  const { children, location } = props
  const containerClassNames = classNames(
    'sidebar-o',
    'side-scroll',
    'page-header-fixed',
    'page-footer-fixed',
    'main-content-boxed',
    'side-trans-enabled',
    {
      'sidebar-o-xs': sideOpen,
      'page-header-dark': headerTheme === 'dark',
      'page-sidebar-dark': sidebarTheme === 'dark',
    },
  )
  let themePath: string
  let envPath: string = ''
  if (isStandAlone) {
    themePath = `./theme/${colorTheme}.css`
  } else {
    themePath = `/theme/v2board/assets/theme/${colorTheme}.css`
  }

  if (isProduction && isStandAlone) {
    envPath = `./${envFile}`
  }

  useExternal(envPath, { async: false })
  useExternal(themePath, { async: false })
  useTitle(title)
  if (isNoLaooutPath(location.pathname)) {
    return <>{children}</>
  }

  const sideOpenHandler = () => {
    setSideOpen(true)
  }

  const sideCloseHandler = () => {
    setSideOpen(false)
  }

  return (
    <>
      <ConfigProvider locale={getLocale() === 'zh-CN' ? zhCN : enUS}>
        <div id="page-container" className={containerClassNames}>
          <div
            className="v2board-nav-mask"
            onClick={sideCloseHandler}
            style={{ display: sideOpen ? 'block' : 'none' }}
          ></div>
          <Sidebar onSideClose={sideCloseHandler}></Sidebar>

          <Header onSideOpen={sideOpenHandler}></Header>

          <main id="main-container">{children}</main>

          <Footer name={title} version={version}></Footer>
        </div>
      </ConfigProvider>
    </>
  )
}

export default LayoutPage
