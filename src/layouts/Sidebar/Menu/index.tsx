import type { FC } from 'react'
import { useEffect } from 'react'
import MenuItem from './menuItem'
import { useModel, history, useIntl } from 'umi'

const Menu: FC = () => {
  const { menus, menuIndex, setMenuIndex } = useModel('useMenuModel')
  const intl = useIntl()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const topPath = `/${history.location.pathname.split('/')[1]}`
    if (topPath === '') {
      return
    }
    const curMenuIndex = menus.getIndex(topPath)
    if (curMenuIndex === undefined) {
      return
    }
    if (curMenuIndex !== menuIndex) {
      setMenuIndex(curMenuIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname])

  return (
    <>
      <div className="content-side content-side-full">
        <ul className="nav-main">
          <MenuItem
            url={menus.getPath('0')}
            name={menus.getName('0')}
            index="0"
            icon={menus.getIcon('0')}
          />
          <MenuItem
            url={menus.getPath('1')}
            name={menus.getName('1')}
            index="1"
            icon={menus.getIcon('1')}
          />
          <li className="nav-main-heading">
            {intl.formatMessage({ id: 'module.group.subscription' })}
          </li>
          <MenuItem
            url={menus.getPath('2')}
            name={menus.getName('2')}
            index="2"
            icon={menus.getIcon('2')}
          />
          <MenuItem
            url={menus.getPath('3')}
            name={menus.getName('3')}
            index="3"
            icon={menus.getIcon('4')}
          />
          <li className="nav-main-heading">{intl.formatMessage({ id: 'module.group.billing' })}</li>
          <MenuItem
            url={menus.getPath('4')}
            name={menus.getName('4')}
            index="4"
            icon={menus.getIcon('4')}
          />
          <MenuItem
            url={menus.getPath('5')}
            name={menus.getName('5')}
            index="5"
            icon={menus.getIcon('5')}
          />
          <li className="nav-main-heading">{intl.formatMessage({ id: 'module.group.account' })}</li>
          <MenuItem
            url={menus.getPath('6')}
            name={menus.getName('6')}
            index="6"
            icon={menus.getIcon('6')}
          />
          <MenuItem
            url={menus.getPath('7')}
            name={menus.getName('7')}
            index="7"
            icon={menus.getIcon('7')}
          />
          <MenuItem
            url={menus.getPath('8')}
            name={menus.getName('8')}
            index="8"
            icon={menus.getIcon('8')}
          />
        </ul>
      </div>
    </>
  )
}
export default Menu
