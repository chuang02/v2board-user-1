import type { FC } from 'react'
import { Switch } from 'antd'
import { update } from '@/services'
import { useState } from 'react'
import { useIntl } from 'umi'

export interface settingProps {
  remindExpire: boolean
  remindTraffic: boolean
  onChange: () => void
}

const Setting: FC<settingProps> = (props) => {
  const { remindExpire, remindTraffic, onChange } = props
  const [expireLoading, setExpireLoding] = useState(false)
  const [trafficLoading, setTrafficLoading] = useState(false)
  const intl = useIntl()

  const expireChangeHandler = async (checked: boolean) => {
    setExpireLoding(true)
    const updateResult = await update({ remind_expire: Number(checked).valueOf() })
    if (updateResult !== undefined) {
      onChange()
    }
    setExpireLoding(false)
  }
  const trafficChangeHandler = async (checked: boolean) => {
    setTrafficLoading(true)
    const updateResult = await update({ remind_traffic: Number(checked).valueOf() })
    if (updateResult !== undefined) {
      onChange()
    }
    setTrafficLoading(false)
  }
  return (
    <>
      <div className="block block-rounded block-bordered">
        <div className="block-header block-header-default">
          <h3 className="block-title">{intl.formatMessage({ id: 'profile.setting.notice' })}</h3>
        </div>
        <div className="block-content">
          <div className="row push">
            <div className="col-lg-8 col-xl-5">
              <div className="form-group">
                <label>{intl.formatMessage({ id: 'profile.setting.remind_expire' })}</label>
                <div>
                  <Switch
                    defaultChecked={remindExpire}
                    onChange={expireChangeHandler}
                    loading={expireLoading}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>{intl.formatMessage({ id: 'profile.setting.remind_email' })}</label>
                <div>
                  <Switch
                    defaultChecked={remindTraffic}
                    onChange={trafficChangeHandler}
                    loading={trafficLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Setting
