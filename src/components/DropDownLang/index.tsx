import type { FC } from 'react'
import { Dropdown, Menu } from 'antd'
import { setLocale, Link, getLocale } from 'umi'
import { useState } from 'react'

// expeot dropDown
export interface DropDownLangProps {
  placement: 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter'
}

const DropDownLang: FC<DropDownLangProps> = (props) => {
  const { placement } = props
  const [visible, setVisible] = useState(false)

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag)
  }

  const setLocalHandler = ({ key }: { key: string }) => {
    if (getLocale() !== key) {
      setLocale(key, false)
    }
    setVisible(false)
  }

  const menu = () => (
    <>
      <Menu
        style={{
          boxShadow: '0 .25rem 2rem rgba(0,0,0,.08)',
          borderColor: '#ebebeb',
        }}
        onClick={setLocalHandler}
      >
        <Menu.Item key="zh-CN">
          <Link to="#" style={{ fontSize: '1rem' }}>
            中文
          </Link>
        </Menu.Item>
        <Menu.Item key="en-US">
          <Link to="#" style={{ fontSize: '1rem' }}>
            English
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )

  return (
    <>
      <Dropdown
        overlay={menu}
        placement={placement}
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        <button type="button" className="btn btn-black mr-1">
          <i className="far fa fa-language"> </i>
        </button>
      </Dropdown>
    </>
  )
}

export default DropDownLang
