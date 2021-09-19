import type { FC } from 'react'
import { Modal } from 'antd'
import QRcode from 'qrcode.react'
import { useIntl } from 'umi'

export interface qrcodeModalProps {
  visible: boolean
  url: string
}

const QRcodeModal: FC<qrcodeModalProps> = (props) => {
  const { visible, url } = props
  const intl = useIntl()
  return (
    <>
      <Modal
        title=""
        centered={true}
        visible={visible}
        closable={false}
        zIndex={1200}
        width={300}
        footer={
          <div style={{ textAlign: 'center' }}>
            {intl.formatMessage({ id: 'modal.qrcode.waiting' })}
          </div>
        }
      >
        <QRcode value={url} size={250} includeMargin={false} renderAs="svg" />,
      </Modal>
    </>
  )
}

export default QRcodeModal
