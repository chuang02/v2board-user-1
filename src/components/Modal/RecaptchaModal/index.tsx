import type { FC } from 'react'
import Reaptcha from 'reaptcha'
import { Modal } from 'antd'
import { useRef, useEffect } from 'react'

export interface recaptchaModalProps {
  visible: boolean
  sitekey: string
  onCancel: () => void
  onVerified: (data: string) => void
}

const RecaptchaModal: FC<recaptchaModalProps> = (props) => {
  const { visible, sitekey, onCancel, onVerified } = props
  const reaptchaRef = useRef<Reaptcha>(null)

  const verifyHandler = (data: string) => {
    onVerified(data)
  }

  useEffect(() => {
    if (visible === false) {
      reaptchaRef.current?.reset()
    }
  }, [visible])

  return (
    <>
      <Modal footer={null} visible={visible} closable={false} centered={true} onCancel={onCancel}>
        <Reaptcha ref={reaptchaRef} sitekey={sitekey} onVerify={verifyHandler} />
      </Modal>
    </>
  )
}

export default RecaptchaModal
