import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Table } from 'antd'
import { inviteOrders } from '@/services'
import { currencyFormatter } from '@/default'
import { useIntl } from 'umi'
import moment from 'moment'

const { Column } = Table

const List: FC = () => {
  const [userInviteOrders, setUserInviteOrders] = useState<API.User.InviteOrderItem[]>()
  const intl = useIntl()
  useEffect(() => {
    ;(async () => {
      const inviteOrdersResult = await inviteOrders()
      if (inviteOrdersResult !== undefined) {
        setUserInviteOrders(inviteOrdersResult.data)
      }
    })()
  }, [])

  return (
    <>
      <div className="block block-rounded js-appear-enabled ">
        <div className="block-header block-header-default">
          <h3 className="block-title">{intl.formatMessage({ id: 'invite.list.title' })}</h3>
        </div>
        <div className="block-content p-0">
          <Table<API.User.InviteOrderItem>
            rowKey="id"
            dataSource={userInviteOrders}
            pagination={false}
            scroll={{ x: true }}
            bordered={false}
            loading={false}
          >
            <Column
              title="#"
              dataIndex="id"
              render={(text, record, index) => {
                return <>{index + 1}</>
              }}
            />
            <Column
              title={intl.formatMessage({ id: 'invite.list.column.updated_at' })}
              dataIndex="updated_at"
              key="updated_at"
              render={(updatedAt: string) => {
                return <>{moment.unix(Number(updatedAt)).format('YYYY/MM/DD HH:MM')}</>
              }}
            />
            <Column
              title={intl.formatMessage({ id: 'invite.list.column.commission_balance' })}
              dataIndex="commission_balance"
              key="commission_balance"
              render={(balance: number) => {
                return <>{currencyFormatter.format(balance / 100)}</>
              }}
            />
            <Column
              title={intl.formatMessage({ id: 'invite.list.column.commission_status' })}
              dataIndex="commission_status"
              key="commission_status"
              align="right"
              render={(commissionStatus: number) => {
                return (
                  <>
                    {commissionStatus === 0 &&
                      intl.formatMessage({ id: 'invite.list.column.commission_status.new' })}
                    {commissionStatus === 1 &&
                      intl.formatMessage({ id: 'invite.list.column.commission_status.pending' })}
                    {commissionStatus === 2 &&
                      intl.formatMessage({ id: 'invite.list.column.commission_status.valid' })}
                    {commissionStatus === 3 &&
                      intl.formatMessage({ id: 'invite.list.column.commission_status.invalid' })}
                  </>
                )
              }}
            />
          </Table>
        </div>
      </div>
    </>
  )
}
export default List
