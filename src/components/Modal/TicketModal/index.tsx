import type { FC } from 'react'
import { Modal, Input, Select, message as antMessage } from 'antd'
import { useRef, useState } from 'react'
import { ticketSave } from '@/services'
import { useIntl } from 'umi'

const { Option } = Select
const { TextArea } = Input

export interface ticketModalProps {
  visible: boolean
  onChange?: () => void
  onCancel: () => void
}

const TicketModal: FC<ticketModalProps> = (props) => {
  const { visible, onChange, onCancel } = props
  const subjectRef = useRef<Input>(null)
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState<number>(0)
  const intl = useIntl()

  const messageChangeHandler = (e: React.ChangeEvent) => {
    setMessage(e.currentTarget.textContent as string)
  }

  const levelChangeHandler = (value: number) => {
    setLevel(value as number)
  }

  const changeHandler = async () => {
    const subject = subjectRef.current?.input.value as string
    const ticketSaveResult = await ticketSave({ subject, message, level })
    if (ticketSaveResult === undefined) {
      return
    }
    antMessage.success(intl.formatMessage({ id: 'modal.ticket.create_success' }))
    if (onChange) {
      onChange()
    }
  }

  return (
    <>
      <Modal
        title={intl.formatMessage({ id: 'modal.ticket.title' })}
        visible={visible}
        onOk={changeHandler}
        onCancel={onCancel}
      >
        <div className="form-group">
          <label htmlFor="example-text-input-alt">
            {intl.formatMessage({ id: 'modal.ticket.subject' })}
          </label>
          <Input
            placeholder={intl.formatMessage({ id: 'modal.ticket.enter_jubject' })}
            ref={subjectRef}
            type="text"
            className="ant-input"
          />
        </div>
        <div className="form-group">
          <label>{intl.formatMessage({ id: 'modal.ticket.level' })}</label>
          <div>
            <Select
              style={{ width: '100%' }}
              placeholder={intl.formatMessage({ id: 'modal.ticket.enter_level' })}
              onChange={levelChangeHandler}
            >
              <Option value="0">{intl.formatMessage({ id: 'modal.ticket.level.low' })}</Option>
              <Option value="1">{intl.formatMessage({ id: 'modal.ticket.level.medium' })}</Option>
              <Option value="2">{intl.formatMessage({ id: 'modal.ticket.level.high' })}</Option>
            </Select>
          </div>

          <div className="form-group">
            <label htmlFor="example-text-input-alt">
              {intl.formatMessage({ id: 'modal.ticket.message' })}
            </label>
            <TextArea
              onChange={messageChangeHandler}
              rows={5}
              placeholder={intl.formatMessage({ id: 'modal.ticket.enter_message' })}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TicketModal
