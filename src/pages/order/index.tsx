import './style.less'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { orders, orderCancel } from '@/services'
import { Table, Tag, Badge, Divider } from 'antd'
import { Link, useModel, useIntl } from 'umi'
import { currencyFormatter } from '@/default'
import moment from 'moment'

const { Column } = Table

const OrderPage: FC = () => {
  const [userOrders, setUserOrders] = useState<API.User.OrderItem[]>([])
  const [lastCannelTradeNo, setLastCannelTradeNo] = useState('')
  const { getMethodName } = useModel('usePlanModel')
  const intl = useIntl()

  useEffect(() => {
    ;(async () => {
      const ordersResult = await orders()
      if (ordersResult === undefined || ordersResult.data === undefined) {
        return
      }
      setUserOrders(ordersResult.data)
    })()
  }, [lastCannelTradeNo])

  const cannelHandler = async (tradeNo: string) => {
    const orderCancelResult = await orderCancel({ trade_no: tradeNo })
    if (orderCancel === undefined || orderCancelResult.data !== true) {
      return
    }
    setLastCannelTradeNo(tradeNo)
  }

  return (
    <>
      <div className="content content-full">
        <div className="block block-rounded block-bordered ">
          <div className="bg-white">
            <Table<API.User.OrderItem>
              rowKey="trade_no"
              pagination={false}
              dataSource={userOrders}
              scroll={{ x: true }}
              bordered={false}
              loading={false}
            >
              <Column
                title={intl.formatMessage({ id: 'order.column.trade_no' })}
                dataIndex="trade_no"
                key="trade_no"
                render={(tradeNo: string) => (
                  <>
                    <Link to={`/order/${tradeNo}`}>{tradeNo}</Link>
                  </>
                )}
              />
              <Column
                title={intl.formatMessage({ id: 'order.column.cycle' })}
                dataIndex="cycle"
                key="cycle"
                align="center"
                render={(method: string) => (
                  <>
                    <Tag>{getMethodName(method)}</Tag>
                  </>
                )}
              />
              <Column
                title={intl.formatMessage({ id: 'order.column.total_amount' })}
                dataIndex="total_amount"
                key="total_amount"
                align="right"
                render={(totalAmout: number) => currencyFormatter.format(totalAmout / 100)}
              />
              <Column
                title={intl.formatMessage({ id: 'order.column.status' })}
                dataIndex="status"
                key="status"
                render={(status: number) => (
                  <>
                    {status === 0 && (
                      <Badge
                        status="error"
                        text={intl.formatMessage({ id: 'common.order.status.unpaid' })}
                      />
                    )}
                    {status === 1 && (
                      <Badge
                        status="processing"
                        text={intl.formatMessage({ id: 'common.order.status.pending' })}
                      />
                    )}
                    {status === 2 && (
                      <Badge
                        status="default"
                        text={intl.formatMessage({ id: 'common.order.status.cancelled' })}
                      />
                    )}
                    {status === 3 && (
                      <Badge
                        status="success"
                        text={intl.formatMessage({ id: 'common.order.status.completed' })}
                      />
                    )}
                    {status === 4 && (
                      <Badge
                        status="default"
                        text={intl.formatMessage({ id: 'common.order.status.discountd' })}
                      />
                    )}
                  </>
                )}
              />
              <Column
                title={intl.formatMessage({ id: 'common.column.created_at' })}
                dataIndex="created_at"
                key="created_at"
                render={(createdAt: number) => (
                  <>{moment.unix(createdAt).format('YYYY/MM/DD HH:MM')}</>
                )}
              />
              <Column
                title={intl.formatMessage({ id: 'common.column.operation' })}
                align="right"
                render={(text, record: API.User.OrderItem) => (
                  <>
                    <div>
                      <Link to={`/order/${record.trade_no}`}>
                        {intl.formatMessage({ id: 'order.view_detail' })}
                      </Link>
                      <Divider type="vertical" />
                      <Link
                        disabled={record.status !== 0}
                        to="#"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault()
                          cannelHandler(record.trade_no)
                        }}
                      >
                        {intl.formatMessage({ id: 'order.cancel' })}
                      </Link>
                    </div>
                  </>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
export default OrderPage
