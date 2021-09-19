import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useModel, Link, useIntl } from 'umi'
import { Empty, Space } from 'antd'
import { statsUser } from '@/services'
import TelegramModal from '@/components/Modal/TelegramModal'
import { useMount } from 'ahooks'

const Event: FC = () => {
  const [telegramModalVisible, setTelegramModalVisible] = useState(false)
  const [userStats, setUserStats] = useState<number[]>([])
  const { initialState } = useModel('@@initialState')
  const { subState, initSubState } = useModel('useSubModel')
  const { currentUser } = initialState || {}
  const [unpaidOrders, unprocessedTickets] = userStats
  const intl = useIntl()

  useMount(async () => {
    await initSubState()
  })

  const showTelegramModal = () => {
    setTelegramModalVisible(true)
  }
  const telegreamModalCancelhandle = () => {
    setTelegramModalVisible(false)
  }

  useEffect(() => {
    ;(async () => {
      const statsUserResult = await statsUser()
      setUserStats(statsUserResult.data)
    })()
  }, [])

  const clickBindTelegramHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    showTelegramModal()
  }

  const renderTelegramEvent = () => (
    <>
      <div className="alert alert-danger" role="alert">
        <p className="mb-0">
          <Space>
            {intl.formatMessage({ id: 'dashboard.event.bind_telegram' })}
            <Link
              className="alert-link"
              to=""
              onClick={(e) => {
                clickBindTelegramHandler(e)
              }}
            >
              {intl.formatMessage({ id: 'dashboard.event.click_bind' })}
            </Link>
          </Space>
        </p>
      </div>
      <TelegramModal
        subscribeUrl={subState.subscribeUrl as string}
        visiable={telegramModalVisible}
        onCancel={telegreamModalCancelhandle}
      ></TelegramModal>
    </>
  )

  const renderOrderEvent = () => (
    <>
      <div className="alert alert-danger" role="alert">
        <p className="mb-0">
          <Space>
            {intl.formatMessage({ id: 'dashboard.event.unpaid_orders' })}
            <Link className="alert-link" to="/order">
              {intl.formatMessage({ id: 'dashboard.event.pay_now' })}
            </Link>
          </Space>
        </p>
      </div>
    </>
  )

  const renderTicketEvent = () => (
    <>
      <div className="alert alert-warning" role="alert">
        <p className="mb-0">
          {intl.formatMessage(
            { id: 'dashboard.event.processing' },
            { unprocessedTickets: <strong>{unprocessedTickets}</strong> },
          )}
          <Link className="alert-link" to="/ticket">
            {intl.formatMessage({ id: 'dashboard.event.view_now' })}
          </Link>
        </p>
      </div>
    </>
  )

  const renderEmpty = () => (
    <>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={intl.formatMessage({ id: 'dashboard.event.nothing' })}
      />
    </>
  )

  return (
    <>
      <div className="block block-rounded js-appear-enabled">
        <div className="block-header block-header-default">
          <h3 className="block-title">{intl.formatMessage({ id: 'dashboard.event.pending' })}</h3>
        </div>
        <div className="block-content">
          {currentUser?.data.telegram_id === 0 && renderTelegramEvent()}
          {unpaidOrders > 0 && renderOrderEvent()}
          {unprocessedTickets > 0 && renderTicketEvent()}
          {(currentUser?.data.telegram_id as number) > 0 &&
            unpaidOrders === 0 &&
            unprocessedTickets === 0 &&
            renderEmpty()}
        </div>
      </div>
    </>
  )
}

export default Event
