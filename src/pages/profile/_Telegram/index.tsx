import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'umi'
import TelegramModal from '@/components/Modal/TelegramModal'

export interface telegramProps {
  subscribeUrl: string
}

const Telegram: FC<telegramProps> = (props) => {
  const { subscribeUrl } = props
  const [telegramModalVisible, setTelegramModalVisible] = useState(false)
  const intl = useIntl()

  const showTelegramModal = () => {
    setTelegramModalVisible(true)
  }
  const telegreamModalCancelhandle = () => {
    setTelegramModalVisible(false)
  }

  return (
    <>
      <div className="block block-rounded block-bordered">
        <div className="block-header block-header-default">
          <h3 className="block-title">
            {intl.formatMessage({ id: 'profile.telegram.bind' }, { name: 'Telegram' })}
          </h3>
          <div className="block-options">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                showTelegramModal()
              }}
            >
              {intl.formatMessage({ id: 'profile.telegram.start_btn' })}
            </button>
          </div>
        </div>
      </div>
      <TelegramModal
        visiable={telegramModalVisible}
        onCancel={telegreamModalCancelhandle}
        subscribeUrl={subscribeUrl}
      />
    </>
  )
}

export default Telegram
