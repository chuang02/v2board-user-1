import type { FC } from 'react'
import { Modal, Input, notification } from 'antd'
import { useRef } from 'react'
import { transfer } from '@/services'
import { useIntl } from 'umi'

export interface walletTransferModalProps {
  visible: boolean
  onTransferSuccess: () => void
  onCancel: () => void
  commissionBalance: number
}

const WalletTransferModal: FC<walletTransferModalProps> = (props) => {
  const { visible, onTransferSuccess, onCancel, commissionBalance } = props
  const transferAmoutRef = useRef<Input>(null)
  const intl = useIntl()

  const transferHandler = async () => {
    const transferAmount: number = Number(transferAmoutRef.current?.input.value).valueOf() * 100
    if (transferAmount <= 0) {
      notification.error({
        description: intl.formatMessage({ id: 'modal.wallet.transfer.amount_error' }),
        message: intl.formatMessage({ id: 'common.message.request_error' }),
      })
    }
    const transferResult: API.User.TransferResult = await transfer({
      transfer_amount: transferAmount,
    })

    if (transferResult !== undefined) {
      if (transferAmoutRef.current) {
        transferAmoutRef.current.setValue('')
      }
      onTransferSuccess()
    }
  }

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'modal.wallet.transfer.title' })}
        visible={visible}
        onOk={transferHandler}
        onCancel={onCancel}
      >
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <div className="flex-00-auto">
            <i className="fa fa-fw fa-info-circle"></i>
          </div>
          <div className="flex-fill ml-3">
            <p className="mb-0">{intl.formatMessage({ id: 'modal.wallet.transfer.tip' })}</p>
          </div>
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'modal.wallet.transfer.current_total' })}</label>
          <Input disabled className="form-control" value={Math.floor(commissionBalance) / 100} />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'modal.wallet.transfer.amount' })}</label>
          <Input
            className="form-control"
            placeholder={intl.formatMessage({ id: 'modal.wallet.transfer.enter_amount' })}
            ref={transferAmoutRef}
          />
        </div>
      </Modal>
    </>
  )
}

export default WalletTransferModal
