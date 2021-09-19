import type { FC } from 'react'
import React from 'react'
import { Space, Table, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useIntl } from 'umi'

export interface listItem {
  key: string
  name: string
  status: React.ReactNode
  rate: React.ReactNode
  tags: React.ReactNode
}

export interface listProps {
  dataSource: listItem[]
}

const List: FC<listProps> = (props) => {
  const { dataSource } = props
  const intl = useIntl()
  const columns = [
    {
      title: intl.formatMessage({ id: 'subscribe.list.column.name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: () => (
        <>
          <Space>
            {intl.formatMessage({ id: 'subscribe.list.column.status' })}
            <Tooltip title={intl.formatMessage({ id: 'subscribe.list.column.status.tip' })}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        </>
      ),
      dataIndex: 'status',
      key: 'status',
      align: 'center' as any,
    },
    {
      title: () => (
        <>
          <Space>
            {intl.formatMessage({ id: 'subscribe.list.column.rate' })}
            <Tooltip title={intl.formatMessage({ id: 'subscribe.list.column.rate.tip' })}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        </>
      ),
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
    },
    {
      title: intl.formatMessage({ id: 'subscribe.list.column.tags' }),
      dataIndex: 'tags',
      key: 'tags',
    },
  ]

  return (
    <>
      <div className="block block-rounded js-appear-enabled">
        <div className="block-header block-header-default">
          <h3 className="block-title">{intl.formatMessage({ id: 'subscribe.list.title' })}</h3>
        </div>
        <div className="block-content p-0">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ position: ['none' as any, 'none' as any] }}
          />
        </div>
      </div>
    </>
  )
}

export default List
