import type { FC } from 'react'
import { Modal, message } from 'antd'
import { resetSecurity } from '@/services'
import { useModel, useIntl } from 'umi'

export interface resetProps {
  onChange?: () => void
}
const Reset: FC<resetProps> = (props) => {
  const { onChange } = props
  const { refresh } = useModel('useSubModel')
  const intl = useIntl()

  const resetPrivate = () => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'profile.reset.reset_private.title' }),
      content: intl.formatMessage({ id: 'profile.reset.reset_private.content' }),
      onOk: async (): Promise<any> => {
        const resetSecurityResult = await resetSecurity()
        if (resetSecurityResult === undefined) {
          return
        }
        await refresh()
        onChange?.()
        message.success(intl.formatMessage({ id: 'common.message.request_success' }))
      },
    })
  }
  return (
    <>
      <div className="block block-rounded block-bordered">
        <div className="block-header block-header-default">
          <h3 className="block-title">
            {intl.formatMessage({ id: 'profile.reset.reset_private' })}
          </h3>
          <div className="block-options">
            <button
              type="button"
              className="btn btn-danger btn-sm btn-primary btn-rounded px-3"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                resetPrivate()
              }}
            >
              {intl.formatMessage({ id: 'profile.reset.reset_btn' })}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset
