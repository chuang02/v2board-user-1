import './style.less'
import type { FC } from 'react'
import DropDownUser from './DropDownUser'
import DropDownLang from '@/components/DropDownLang'
import { useModel } from 'umi'

export interface slideOpenProps {
  onSideOpen: () => void
}

const Header: FC<slideOpenProps> = (props) => {
  const { menuIndex, menuName } = useModel('useMenuModel')
  const { menus } = useModel('useMenuModel')
  const { onSideOpen } = props

  return (
    <header id="page-header">
      <div className="content-header">
        <div className="sidebar-toggle">
          <button
            type="button"
            className="btn btn-primary mr-1 d-lg-none"
            data-toggle="layout"
            data-action="sidebar_toggle"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              onSideOpen()
            }}
          >
            <i className="fa fa-fw fa-bars" />
          </button>
        </div>
        <div className="v2board-header-title">
          {menuName !== '' ? menuName : menuIndex && menus.getName(menuIndex)}
        </div>
        <DropDownLang placement="bottomRight"></DropDownLang>
        <DropDownUser></DropDownUser>
      </div>
    </header>
  )
}
export default Header
