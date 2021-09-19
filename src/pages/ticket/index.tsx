import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Table, Badge, Divider } from 'antd'
import { tickets } from '@/services'
import moment from 'moment'
import { Link, useIntl } from 'umi'
import { ticketClose } from '@/services'
import TicketModel from '@/components/Modal/TicketModal'

const { Column } = Table

const TicketPage: FC = () => {
  const [userTickets, setUserTickets] = useState<API.User.TicketItem[]>()
  const [ticketsTotal, setTicketsTotal] = useState(0)
  const [closeStatus, setCloseStats] = useState(false)
  const [createStatus, setCreateStatus] = useState(false)
  const [ticketModelVisible, setTicketModelVisible] = useState(false)
  const intl = useIntl()

  const ticketModelChangeHandler = () => {
    setCreateStatus(true)
    setTicketModelVisible(false)
  }

  const ticketModelCancelHandler = () => {
    setTicketModelVisible(false)
  }

  const closeHandler = (id: number) => {
    const tickerCloseResult = ticketClose({ id })
    if (tickerCloseResult === undefined) {
      return
    }
    setCloseStats(true)
  }

  const createHandler = () => {
    setTicketModelVisible(true)
  }

  const viewHandler = (id: number) => {
    const idUrl = `${window.location.origin}/#/ticket/${id}`
    const awidth = 800
    const aheight = 600
    const atop = 0
    const aleft = 0
    const param0 = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0'
    const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${param0}`
    window.open(idUrl, '', params)
  }

  useEffect(() => {
    ;(async () => {
      const ticketsResult = await tickets()
      if (ticketsResult === undefined) {
        return
      }
      setUserTickets(ticketsResult.data)
      setTicketsTotal(ticketsResult.data.length)
      setCloseStats(false)
      setCreateStatus(false)
    })()
  }, [closeStatus, createStatus])

  return (
    <>
      <div className="content content-full">
        <div className="block block-rounded js-appear-enabled ">
          <div className="block-header block-header-default">
            <h3 className="block-title">{intl.formatMessage({ id: 'ticket.history' })}</h3>
            <div className="block-options">
              <button
                type="button"
                className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  createHandler()
                }}
              >
                {intl.formatMessage({ id: 'ticket.new_btn' })}
              </button>
            </div>
          </div>
          <div className="block-content p-0">
            <Table<API.User.TicketItem>
              dataSource={userTickets}
              pagination={false}
              rowKey="id"
              scroll={{ x: true }}
              bordered={false}
              loading={false}
            >
              <Column
                title="#"
                dataIndex="index"
                render={(text, record, index) => ticketsTotal - index}
              />
              <Column
                title={intl.formatMessage({ id: 'ticket.column.subject' })}
                dataIndex="subject"
                key="subject"
              />
              <Column
                title={intl.formatMessage({ id: 'ticket.column.level' })}
                dataIndex="level"
                key="subject"
                render={(level) => {
                  return (
                    <>
                      {level === 2 && intl.formatMessage({ id: 'ticket.column.level.high' })}
                      {level === 1 && intl.formatMessage({ id: 'ticket.column.level.medium' })}
                      {level === 0 && intl.formatMessage({ id: 'ticket.column.level.low' })}
                    </>
                  )
                }}
              />

              <Column
                title={intl.formatMessage({ id: 'ticket.column.status' })}
                dataIndex="status"
                key="status"
                render={(status) => {
                  return (
                    <>
                      {status === 0 && (
                        <>
                          <Badge status="error" />
                          {intl.formatMessage({ id: 'ticket.column.status.not_reply' })}
                        </>
                      )}
                      {status === 1 && (
                        <>
                          <Badge status="success" />
                          {intl.formatMessage({ id: 'ticket.column.status.closed' })}
                        </>
                      )}
                    </>
                  )
                }}
              />
              <Column
                title={intl.formatMessage({ id: 'common.column.created_at' })}
                dataIndex="created_at"
                key="created_At"
                render={(createdAt) => moment.unix(Number(createdAt)).format('YYYY/MM/DD HH:MM')}
              />
              <Column
                title={intl.formatMessage({ id: 'ticket.column.updated_at' })}
                dataIndex="updated_at"
                key="updated_At"
                render={(updatedAt) => moment.unix(Number(updatedAt)).format('YYYY/MM/DD HH:MM')}
              />
              <Column
                title={intl.formatMessage({ id: 'common.column.operation' })}
                render={(text, record: API.User.TicketItem) => (
                  <>
                    <div>
                      <Link
                        to="#"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault()
                          viewHandler(record.id)
                        }}
                      >
                        {intl.formatMessage({ id: 'ticket.column.operation.view_detail' })}
                      </Link>
                      <Divider type="vertical" />
                      <Link
                        disabled={record.status !== 0}
                        to="#"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault()
                          closeHandler(record.id)
                        }}
                      >
                        {intl.formatMessage({ id: 'ticket.column.operation.close' })}
                      </Link>
                    </div>
                  </>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
      <TicketModel
        visible={ticketModelVisible}
        onCancel={ticketModelCancelHandler}
        onChange={ticketModelChangeHandler}
      />
    </>
  )
}
export default TicketPage
