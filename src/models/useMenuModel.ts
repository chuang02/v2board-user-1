import { useState } from 'react'
import { getIntl } from 'umi'

export interface MenuValue {
  name: string
  path: string
  icon: string
}

export type Menus = {
  data: Record<string, MenuValue>
  getPath: (index: string) => string
  getIcon: (index: string) => string
  getName: (index: string) => string
  getIndex: (path: string) => string | undefined
  testIndex: (index: string, path: string) => boolean
}

export const menus: Menus = {
  data: {
    '0': {
      name: 'module.dashboard',
      path: '/dashboard',
      icon: 'speedometer',
    },
    '1': {
      name: 'module.knowledge',
      path: '/knowledge',
      icon: 'book-open',
    },
    '2': {
      name: 'module.subscribe',
      path: '/subscribe',
      icon: 'badge',
    },
    '3': {
      name: 'module.plan',
      path: '/plan',
      icon: 'bag',
    },
    '4': {
      name: 'module.order',
      path: '/order',
      icon: 'list',
    },
    '5': {
      name: 'module.invite',
      path: '/invite',
      icon: 'users',
    },
    '6': {
      name: 'module.profile',
      path: '/profile',
      icon: 'user',
    },
    '7': {
      name: 'module.ticket',
      path: '/ticket',
      icon: 'support',
    },
    '8': {
      name: 'module.traffic',
      path: '/traffic',
      icon: 'bar-chart',
    },
  },
  getPath: (index: string): string => {
    return menus.data[index] ? menus.data[index].path : ''
  },
  getIcon: (index: string): string => {
    return menus.data[index] ? menus.data[index].icon : ''
  },
  getName: (index: string): string => {
    return menus.data[index] ? getIntl().formatMessage({ id: menus.data[index].name }) : ''
  },
  getIndex: (path: string): string => {
    let index = ''
    Object.keys(menus.data).forEach((key) => {
      if (menus.data[key] && menus.data[key].path === path) {
        index = key
      }
      return menus.data[key]
    })
    return index
  },
  testIndex: (index: string, path: string): boolean => {
    if (menus.data[index] !== undefined) {
      return false
    }
    return menus.data[index].path === path
  },
}

export interface MenuModel {
  menuIndex: string
  menuName: string
  menus: Menus
  setMenuIndex: React.Dispatch<React.SetStateAction<string>>
  setMenuName: React.Dispatch<React.SetStateAction<string>>
}

export default (): MenuModel => {
  const [menuIndex, setMenuIndex] = useState('0')
  const [menuName, setMenuName] = useState('')

  return {
    menus,
    menuIndex,
    menuName,
    setMenuName,
    setMenuIndex,
  }
}
