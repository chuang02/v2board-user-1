import type { FC } from 'react'
import { useState, useRef } from 'react'
import { Modal, Select, Input } from 'antd'
import { ticketWithdraw } from '@/services'
import { useIntl } from 'umi'

const { Option } = Select

export interface WalletWithdrawalModalProps {
  visiable: boolean
  onWithdrawlSuccess: () => void
  onCancel: () => void
  withdrawMethods: string[]
}

const WalletWithdrawalModal: FC<WalletWithdrawalModalProps> = (props) => {
  const { onWithdrawlSuccess, visiable, onCancel, withdrawMethods } = props
  const [userMethod, setUserMethod] = useState('')
  const accountRef = useRef<Input>(null)
  const intl = useIntl()

  const methodChangeHandler = (value: string) => {
    setUserMethod(value)
  }

  const withdrawalHandler = async () => {
    const account: string = accountRef.current?.input.value as string
    const ticketWithdrawResult = await ticketWithdraw({
      withdraw_account: account,
      withdraw_method: userMethod,
    })
    if (ticketWithdrawResult === undefined) {
      return
    }
    onWithdrawlSuccess()
  }

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'modal.wallet.wallet.withdrawal.title' })}
        visible={visiable}
        onOk={withdrawalHandler}
        onCancel={onCancel}
      >
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'modal.wallet.wallet.withdrawal.method' })}</label>
          <div>
            <Select
              style={{ width: '100%' }}
              placeholder={intl.formatMessage({
                id: 'modal.wallet.wallet.withdrawal.enter_method',
              })}
              onChange={methodChangeHandler}
            >
              {withdrawMethods.map((method) => {
                return (
                  <Option value={method} key={method}>
                    {method}
                  </Option>
                )
              })}
            </Select>
          </div>
        </div>

        <div className="form-group">
          <label>{intl.formatMessage({ id: 'modal.wallet.wallet.withdrawal.account' })}</label>
          <Input
            ref={accountRef}
            type="text"
            className="ant-input form-control"
            placeholder={intl.formatMessage({ id: 'modal.wallet.wallet.withdrawal.enter_account' })}
          />
        </div>
      </Modal>
    </>
  )
}

export default WalletWithdrawalModal
