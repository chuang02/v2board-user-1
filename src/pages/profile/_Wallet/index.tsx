import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Button, Tooltip, Space } from 'antd'
import WalletTransferModal from '@/components/Modal/WalletTransferModal'
import WalletWithdrawalModal from '@/components/Modal/WalletWithdrawalModal'
import { QuestionCircleOutlined, TransactionOutlined, PayCircleOutlined } from '@ant-design/icons'
import { commonConfig } from '@/services'
import { currencyFormatter } from '@/default'
import { history, useIntl } from 'umi'

export interface walletProps {
  balance: number
  commissionBalance: number
  onChange?: () => void
}

const Wallet: FC<walletProps> = (props) => {
  const { balance, commissionBalance, onChange } = props
  const [transferModalVisible, seTransferModalVisible] = useState(false)
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false)
  const [userCommonConfig, setUserCommonConfig] = useState<API.User.CommonConfigItem>()
  const intl = useIntl()

  const showTransferModal = () => {
    seTransferModalVisible(true)
  }

  const transferCancelHandler = () => {
    seTransferModalVisible(false)
  }

  const transferSuccessHandler = () => {
    seTransferModalVisible(false)
    if (onChange) {
      onChange()
    }
  }

  const showWalletWithdrawalModal = () => {
    setWithdrawalModalVisible(true)
  }

  const withdrawalCancelHandler = () => {
    setWithdrawalModalVisible(false)
  }

  const withdrawSuccessHandler = () => {
    setWithdrawalModalVisible(false)
    history.push('/ticket')
  }

  useEffect(() => {
    ;(async () => {
      const commonConfigResult = await commonConfig()
      if (commonConfigResult === undefined) {
        return
      }
      setUserCommonConfig(commonConfigResult.data)
    })()
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="block block-bordered">
            <div className="block-content pb-3">
              <i className="fa fa-wallet fa-2x text-gray-light float-right" />
              <div className="pb-sm-3">
                <p className="text-muted w-75">
                  {intl.formatMessage({ id: 'profile.wallet.title' })}
                </p>
                <p className="display-4 text-black font-w300 mb-2">
                  {currencyFormatter.format((balance + commissionBalance) / 100)}
                  <span className="font-size-h5 text-muted ml-4">CNY</span>
                </p>
                <span className="text-muted" style={{ cursor: 'pointer' }}>
                  <Space>
                    {intl.formatMessage({ id: 'profile.wallet.tip' })}
                    <Tooltip
                      placement="right"
                      title={
                        <div>
                          <div>
                            {intl.formatMessage({ id: 'profile.wallet.tip.balance' })}：
                            {currencyFormatter.format(balance / 100)}
                          </div>
                          <div>
                            {intl.formatMessage({ id: 'profile.wallet.tip.commission_balance' })}：
                            {currencyFormatter.format(commissionBalance / 100)}
                          </div>
                        </div>
                      }
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </Space>
                </span>
                <div className="pt-3">
                  <Button
                    type="primary"
                    className="mr-2"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      showTransferModal()
                    }}
                  >
                    <TransactionOutlined />
                    <span> {intl.formatMessage({ id: 'profile.wallet.transfer_btn' })}</span>
                  </Button>
                  {userCommonConfig?.withdraw_close === 0 && (
                    <Button
                      type="default"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault()
                        showWalletWithdrawalModal()
                      }}
                    >
                      <PayCircleOutlined />
                      <span> {intl.formatMessage({ id: 'profile.wallet.withdrawal_btn' })}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WalletTransferModal
        commissionBalance={commissionBalance}
        onCancel={transferCancelHandler}
        visible={transferModalVisible}
        onTransferSuccess={transferSuccessHandler}
      />
      {userCommonConfig?.withdraw_close === 0 && (
        <WalletWithdrawalModal
          visiable={withdrawalModalVisible}
          onCancel={withdrawalCancelHandler}
          onWithdrawlSuccess={withdrawSuccessHandler}
          withdrawMethods={userCommonConfig.withdraw_methods}
        />
      )}
    </>
  )
}

export default Wallet
