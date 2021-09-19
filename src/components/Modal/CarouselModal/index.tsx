import type { FC } from 'react'
import { Modal } from 'antd'

export interface carouseModalProps {
  title: string
  visible: boolean
  onCancel: () => void
}

const CarouseModal: FC<carouseModalProps> = (props) => {
  const { title, visible, onCancel, children } = props

  return (
    <>
      <Modal title={title} footer={null} visible={visible} onCancel={onCancel}>
        {children}
      </Modal>
    </>
  )
}

export default CarouseModal
