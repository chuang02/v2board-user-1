import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Modal, Button, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { telegramBotInfo } from '@/services'
import { useIntl } from 'umi'

export interface telegramModalProps {
  visiable: boolean
  subscribeUrl: string
  onCancel: () => void
}

const TelegramModal: FC<telegramModalProps> = (props) => {
  const { visiable, subscribeUrl, onCancel } = props
  const [telegramUsername, setTelegramUsername] = useState('')
  const intl = useIntl()

  useEffect(() => {
    if (visiable === false) {
      return
    }
    if (telegramUsername !== '') {
      return
    }
    ;(async () => {
      const telegramBotInfoResult = await telegramBotInfo()
      setTelegramUsername(telegramBotInfoResult.data.username)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visiable])

  const footer = () => (
    <Button
      type="default"
      onClick={(e) => {
        e.preventDefault()
        onCancel()
      }}
    >
      <span>{intl.formatMessage({ id: 'modal.telegram.got_it' })}</span>
    </Button>
  )

  const content = () => (
    <>
      <h2 className="content-heading pt-1">
        <i className="fa fa-arrow-right text-info mr-1"></i>
        {intl.formatMessage({ id: 'modal.telegram.first_step' })}
      </h2>
      <div>
        <Space>
          {intl.formatMessage({ id: 'modal.telegram.search' }, { name: 'telegram' })}
          <a href={`https://t.me/${telegramUsername}`}>{telegramUsername}</a>
        </Space>
      </div>
      <h2 className="content-heading">
        <i className="fa fa-arrow-right text-info mr-1"></i>
        {intl.formatMessage({ id: 'modal.telegram.second_step' })}
      </h2>
      <div>
        {intl.formatMessage({ id: 'modal.telegram.send_bot' })}
        <br />
        <code>/bind {subscribeUrl}</code>
      </div>
    </>
  )

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'modal.telegram.bind' }, { name: 'Telegram' })}
        visible={visiable}
        onCancel={onCancel}
        footer={footer()}
      >
        {telegramUsername ? content() : <LoadingOutlined />}
      </Modal>
    </>
  )
}
export default TelegramModal
