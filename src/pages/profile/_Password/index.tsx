import type { FC } from 'react'
import { useRef } from 'react'
import { message } from 'antd'
import { changePassword } from '@/services'
import { useIntl } from 'umi'

export interface passwordProps {
  onChange?: () => void
}

const Password: FC<passwordProps> = (props) => {
  const { onChange } = props
  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const newPsswordRepeatRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  const clickHandler = async () => {
    const oldPassword = oldPasswordRef.current?.value as string
    const newPassword = newPasswordRef.current?.value as string
    const newPasswordRepeat = newPsswordRepeatRef.current?.value
    if (newPassword !== '' && newPassword !== newPasswordRepeat) {
      message.error(intl.formatMessage({ id: 'profile.password.message.password_diffrent' }))
      return
    }
    const changePasswordResult = await changePassword({
      old_password: oldPassword,
      new_password: newPassword,
    })
    if (changePasswordResult === undefined) {
      return
    }
    message.success(intl.formatMessage({ id: 'profile.password.message.change_success' }))

    onChange?.()
  }

  return (
    <>
      <div className="block block-rounded block-bordered">
        <div className="block-header block-header-default">
          <h3 className="block-title">{intl.formatMessage({ id: 'profile.password.title' })}</h3>
          <div className="block-options">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
              onClick={async (e: React.MouseEvent) => {
                e.preventDefault()
                await clickHandler()
              }}
            >
              {intl.formatMessage({ id: 'profile.password.save_btn' })}
            </button>
          </div>
        </div>
        <div className="block-content">
          <div className="row push">
            <div className="col-lg-8 col-xl-5">
              <div className="form-group">
                <label>{intl.formatMessage({ id: 'profile.password.old_password' })}</label>
                <input
                  ref={oldPasswordRef}
                  type="password"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: 'profile.password.enter_old_password' })}
                />
              </div>
              <div className="form-group">
                <label>{intl.formatMessage({ id: 'profile.password.new_password' })}</label>
                <input
                  ref={newPasswordRef}
                  type="password"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: 'profile.password.enter_new_password' })}
                />
              </div>
              <div className="form-group">
                <label>{intl.formatMessage({ id: 'profile.password.new_password' })}</label>
                <input
                  ref={newPsswordRepeatRef}
                  type="password"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: 'profile.password.enter_repeat_password' })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Password
