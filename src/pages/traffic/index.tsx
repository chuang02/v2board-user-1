import type { FC } from 'react'
import { useState, useEffect } from 'react'
import type { TablePaginationConfig, RadioChangeEvent } from 'antd'
import { Space } from 'antd'
import { Radio, Table, Tooltip, Tag } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { serverLogs } from '@/services'
import moment from 'moment'
import { formatBytes } from 'bytes-formatter'
import { useIntl } from 'umi'

const { Column } = Table

const TrafficPage: FC = () => {
  const [userServerLogs, setUserServerLogs] = useState<API.User.ServerLogItem[]>()
  const [useServerLogsTotal, setUserServerLogsTotal] = useState<number>(0)
  const [pageCurrent, setPageCurrent] = useState<number>(0)
  const [dateType, setDateType] = useState(0)
  const pageSize = 10
  const intl = useIntl()

  const dateOptions = [
    { label: intl.formatMessage({ id: 'traffic.day' }), value: 0 },
    { label: intl.formatMessage({ id: 'traffic.week' }), value: 1 },
    { label: intl.formatMessage({ id: 'traffic.month' }), value: 2 },
  ]

  const pageChangeHandler = (pagenation: TablePaginationConfig) => {
    if (pageCurrent !== undefined) {
      const current = pagenation.current as number
      setPageCurrent(current)
    }
  }

  const pagenationProps: TablePaginationConfig = {
    pageSize,
    showQuickJumper: false,
    showLessItems: false,
    showSizeChanger: false,
    showTitle: false,
    total: useServerLogsTotal,
    size: 'small',
  }

  const dateChangeHandler = (e: RadioChangeEvent) => {
    setDateType(e.target.value as number)
  }

  useEffect(() => {
    ;(async () => {
      const serverLogsResult = await serverLogs({
        type: dateType,
        pageSize,
        current: pageCurrent,
      })
      if (serverLogsResult === undefined) {
        return
      }
      setUserServerLogs(serverLogsResult.data)
      setUserServerLogsTotal(serverLogsResult.total)
    })()
  }, [dateType, pageCurrent])

  return (
    <>
      <div className="content content-full">
        <div className="block block-rounded block-bordered ">
          <div className="bg-white">
            <div className="p-3">
              <Radio.Group
                options={dateOptions}
                onChange={dateChangeHandler}
                defaultValue={0}
                optionType="button"
              />
            </div>
            <Table<API.User.ServerLogItem>
              rowKey="id"
              dataSource={userServerLogs}
              scroll={{ x: true }}
              bordered={false}
              loading={false}
              pagination={pagenationProps}
              onChange={pageChangeHandler}
            >
              <Column
                dataIndex="log_at"
                key="log_at"
                title={intl.formatMessage({ id: 'traffic.column.log_at' })}
                render={(logAt) => {
                  return moment.unix(Number(logAt)).format('YYYY/MM/DD HH:MM')
                }}
              />
              <Column
                dataIndex="u"
                key="u"
                title={intl.formatMessage({ id: 'traffic.column.u' })}
                render={(u) => {
                  return formatBytes(Number(u).valueOf())
                }}
              />
              <Column
                dataIndex="d"
                key="d"
                title={intl.formatMessage({ id: 'traffic.column.d' })}
                render={(d) => {
                  return formatBytes(Number(d).valueOf())
                }}
              />
              <Column
                dataIndex="rate"
                key="rate"
                title={intl.formatMessage({ id: 'traffic.column.rate' })}
                align="center"
                render={(rate) => {
                  return (
                    <Tag style={{ minWidth: 60 }}>
                      <Space>${Number(rate).valueOf()}x</Space>
                    </Tag>
                  )
                }}
              />
              <Column
                title={
                  <>
                    <Space>
                      {intl.formatMessage({ id: 'traffic.column.total' })}
                      <Tooltip title={intl.formatMessage({ id: 'traffic.column.total.tip' })}>
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Space>
                  </>
                }
                align="right"
                render={(record) => {
                  return formatBytes(
                    (Number(record.d) + Number(record.u)) * Number(record.rate),
                  ).valueOf()
                }}
              />
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
export default TrafficPage
