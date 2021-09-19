import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useInterval, useDebounceFn } from 'ahooks'
import classNames from 'classnames/bind'
import delay from '@umijs/utils/lib/delay/delay'
import { useIntl } from 'umi'

export interface emailCodeInputProps {
  onSend: () => Promise<boolean>
  onChange: (value: string) => void
  btnClassName: string
}

const EmailCodeInput: FC<emailCodeInputProps> = (props) => {
  const { onSend, onChange, btnClassName } = props
  const defaultCountDown = 60
  const defaultCountDownDelay = null
  const [sendDisabled, setSendDisabled] = useState(false)
  const [countDown, setCountDown] = useState(defaultCountDown)
  const [countDownDelay, setCountDownDelay] = useState<number | null>(defaultCountDownDelay)
  const inputRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  const btnClassNames = classNames('btn', 'btn-lg', 'btn-block', {
    [`${btnClassName}`]: btnClassName,
  })

  useInterval(
    () => {
      setCountDown(countDown - 1)
    },
    countDownDelay,
    { immediate: false },
  )

  const sendHandler = () => {
    onSend().then((result: boolean) => {
      if (result === true) {
        setSendDisabled(true)
        setCountDownDelay(1000)
      }
    })
  }

  useEffect(() => {
    if (sendDisabled === true && countDown === 0) {
      delay(500).then(() => {
        setSendDisabled(false)
        setCountDownDelay(null)
        setCountDown(defaultCountDown)
      })
    }
  }, [countDown, sendDisabled])

  const { run } = useDebounceFn(
    () => {
      const inputValue: string = inputRef.current?.value as string
      onChange(inputValue)
    },
    {
      wait: 300,
    },
  )

  const changeHandler = run
  return (
    <>
      <div className="form-group form-row ">
        <div className="col-9">
          <input
            ref={inputRef}
            className="form-control form-control-lg form-control-alt"
            placeholder={intl.formatMessage({ id: 'common.email_code' })}
            onChange={changeHandler}
          />
        </div>
        <div className="col-3">
          <button
            type="button"
            className={btnClassNames}
            onClick={sendHandler}
            disabled={sendDisabled}
          >
            {sendDisabled === false ? intl.formatMessage({ id: 'common.send' }) : countDown}
          </button>
        </div>
      </div>
    </>
  )
}
export default EmailCodeInput
