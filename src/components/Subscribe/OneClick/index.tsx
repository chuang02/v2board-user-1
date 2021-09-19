import type { FC } from 'react'
import React from 'react'
import { Menu, Dropdown, message } from 'antd'
import { Link, useIntl } from 'umi'
import clipboardy from '@umijs/deps/reexported/clipboardy'
import { PlatformDetection } from '@ephox/sand'

export interface oneClickProps {
  subscribeUrl: string
  clashUrl: string
  surgeUrl: string
  shadowrocketUrl: string
  quantumultXUrl: string
}

const OneClick: FC<oneClickProps> = (props) => {
  const { subscribeUrl, clashUrl, surgeUrl, shadowrocketUrl, quantumultXUrl } = props
  const detect = PlatformDetection.detect()
  const intl = useIntl()

  const clickCopyHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    /* Select the text field */
    clipboardy.write(subscribeUrl as string).then(() => {
      message.success(intl.formatMessage({ id: 'common.message.copy_success' }))
    })
  }

  const windowsOsxMenu = (
    <>
      <Menu>
        <Menu.Item key="0">
          <Link
            to=""
            onClick={(e) => {
              clickCopyHandler(e)
            }}
          >
            <i className="fa fa-copy mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.copy_url' })}
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <a href={clashUrl}>
            <i className="fa fa-share mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.export' }, { name: 'Clashx' })}
          </a>
        </Menu.Item>
      </Menu>
    </>
  )

  const iosMenu = (
    <>
      <Menu>
        <Menu.Item key="0">
          <Link
            to=""
            onClick={(e) => {
              clickCopyHandler(e)
            }}
          >
            <i className="fa fa-copy mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.copy_url' })}
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <a href={shadowrocketUrl}>
            <i className="fa fa-share mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.export' }, { name: 'Shadowrocket' })}
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href={quantumultXUrl}>
            <i className="fa fa-share mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.export' }, { name: 'QuantumultX' })}
          </a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href={surgeUrl}>
            <i className="fa fa-share mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.export' }, { name: 'Surge' })}
          </a>
        </Menu.Item>
      </Menu>
    </>
  )

  const androidMenu = (
    <>
      <Menu>
        <Menu.Item key="0">
          <Link
            to=""
            onClick={(e) => {
              clickCopyHandler(e)
            }}
          >
            <i className="fa fa-copy mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.copy_url' })}
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <a href={clashUrl}>
            <i className="fa fa-share mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.export' }, { name: 'Clash For Android' })}
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href={surgeUrl}>
            <i className="fa fa-share mr-2"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.export' }, { name: 'Surfboard' })}
          </a>
        </Menu.Item>
      </Menu>
    </>
  )

  const selectMenu = () => {
    if (detect.os.isOSX() || detect.os.isWindows()) {
      return windowsOsxMenu
    }
    if (detect.os.isiOS()) {
      return iosMenu
    }

    if (detect.os.isAndroid()) {
      return androidMenu
    }
    return <></>
  }

  return (
    <>
      {detect.os.isFreeBSD() ||
      detect.os.isLinux() ||
      detect.os.isSolaris() ||
      detect.os.isChromeOS() ? (
        <Link
          className="btn btn-sm btn-primary btn-rounded px-3 mr-1 my-1"
          to=""
          onClick={(e) => {
            clickCopyHandler(e)
          }}
        >
          <i className="fa fa-copy mr-1"></i>
          {intl.formatMessage({ id: 'subscribe.oneclick.copy_btn' })}
        </Link>
      ) : (
        <Dropdown overlay={selectMenu()} placement="bottomLeft" trigger={['click']}>
          <Link
            className="btn btn-sm btn-primary btn-rounded px-3 mr-1 my-1"
            to=""
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <i className="fa fa-rss mr-1"></i>
            {intl.formatMessage({ id: 'subscribe.oneclick.btn' })}
          </Link>
        </Dropdown>
      )}
    </>
  )
}

export default OneClick
