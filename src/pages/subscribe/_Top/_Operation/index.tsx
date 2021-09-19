import type { FC } from 'react'
import { Link, history, useIntl } from 'umi'
import { Menu, Dropdown, Modal } from 'antd'
import { resetSecurity } from '@/services'

export interface OperationProps {
  planID: number
  onResetPrivate?: (subUrl: string) => void
}

const Operation: FC<OperationProps> = (props) => {
  const { planID, onResetPrivate } = props
  const intl = useIntl()

  const resetTrafficConfirm = () => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'subscribe.top.operation.reset_traffic.title' }),
      content: intl.formatMessage({ id: 'subscribe.top.operation.reset_traffic.content' }),
      onOk: (): any => {
        history.push({
          pathname: `/plan/${planID}`,
          state: {
            method: 'reset_price',
          },
        })
      },
    })
  }

  const resetPrivate = () => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'subscribe.top.operation.reset_private.title' }),
      content: intl.formatMessage({ id: 'subscribe.top.operation.reset_private.content' }),
      onOk: async (): Promise<any> => {
        if (onResetPrivate) {
          const resetSecurityResult = await resetSecurity()
          if (resetSecurityResult === undefined) {
            return
          }
          const subscribeUrl = resetSecurityResult.data
          onResetPrivate(subscribeUrl)
        }
      },
    })
  }

  const menu = () => (
    <>
      <Menu>
        <Menu.Item key="0">
          <Link to={`/plan/${planID}`}>
            <i className="fa fa-clock mr-1" />
            {intl.formatMessage({ id: 'subscribe.renew' })}
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault()
              resetTrafficConfirm()
            }}
          >
            <i className="fa fa-sync-alt mr-1" />
            {intl.formatMessage({ id: 'subscribe.top.operation.reset_traffic' })}
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault()
              resetPrivate()
            }}
          >
            <i className="fa fa-user-shield mr-1" />
            {intl.formatMessage({ id: 'subscribe.top.operation.reset_private' })}
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
        <Link
          className="btn btn-sm btn-outline-primary btn-rounded px-3 mr-1 my-1 ant-dropdown-trigger"
          to=""
          onClick={(e) => e.preventDefault()}
        >
          <i className="fa fa-cog mr-1" />
          {intl.formatMessage({ id: 'common.column.operation' })}
        </Link>
      </Dropdown>
    </>
  )
}

export default Operation
