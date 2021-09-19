import type { FC } from 'react'
import { message, Table } from 'antd'
import moment from 'moment'
import { Link, useIntl } from 'umi'
import clipboardy from '@umijs/deps/reexported/clipboardy'
import { inviteGenerate } from '@/services'

const { Column } = Table
export interface managerProps {
  dataSource: API.User.InviteCodeItem[]
  onGenerateSuccess: () => void
}

const Manager: FC<managerProps> = (props) => {
  const { dataSource, onGenerateSuccess } = props
  const intl = useIntl()

  const clickHandler = async () => {
    const inviteGenerateResult = await inviteGenerate()
    if (inviteGenerateResult !== undefined) {
      onGenerateSuccess()
    }
  }

  return (
    <>
      <div className="block block-rounded js-appear-enabled ">
        <div className="block-header block-header-default">
          <h3 className="block-title">{intl.formatMessage({ id: 'invite.manager.title' })}</h3>
          <div className="block-options">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                clickHandler()
              }}
            >
              {intl.formatMessage({ id: 'invite.mangaer.generate_btn' })}
            </button>
          </div>
        </div>
        <div className="block-content p-0">
          <Table<API.User.InviteCodeItem>
            rowKey="id"
            pagination={false}
            dataSource={dataSource}
            scroll={{ x: true }}
            bordered={false}
            loading={false}
          >
            <Column
              title={intl.formatMessage({ id: 'invite.manager.column.invite_code' })}
              dataIndex="code"
              key="code"
            />
            <Column
              title={intl.formatMessage({ id: 'common.column.created_at' })}
              dataIndex="created_at"
              key="created_at"
              render={(createdAt) => {
                return <>{moment.unix(Number(createdAt)).format('YYYY/MM/DD HH:MM')}</>
              }}
            />
            <Column
              title={intl.formatMessage({ id: 'common.column.operation' })}
              align="right"
              render={(record) => {
                return (
                  <>
                    <Link
                      to=""
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault()
                        const registerUrl = `${window.location.origin}/#/register?code=${record.code}`
                        clipboardy.write(registerUrl).then(() => {
                          message.success(intl.formatMessage({ id: 'common.message.copy_success' }))
                        })
                      }}
                    >
                      {intl.formatMessage({ id: 'invite.manager.copy_link' })}
                    </Link>
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
export default Manager
