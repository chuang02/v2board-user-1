import './style.less'
import type { FC } from 'react'
import { useRef } from 'react'
import classNames from 'classnames'
import { useDebounceFn } from 'ahooks'
import { useIntl } from 'umi'

export interface emailInputProps {
  whiteList?: string[]
  onChange: (value: string) => void
}

const EmailInput: FC<emailInputProps> = (props) => {
  const { whiteList, onChange } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const divClassNames = classNames('form-group', {
    'v2board-email-whitelist-enable': whiteList !== undefined,
  })
  const intl = useIntl()

  const { run } = useDebounceFn(
    () => {
      const inputValue: string = inputRef.current?.value as string
      const selectValue: string = selectRef.current?.value as string
      if (whiteList !== undefined) {
        const value: string = `${inputValue}@${selectValue}`
        onChange(value)
      } else {
        onChange(inputValue)
      }
    },
    {
      wait: 300,
    },
  )

  const changeHandler = run

  return (
    <>
      <div className={divClassNames}>
        <input
          ref={inputRef}
          onChange={changeHandler}
          className="form-control form-control-lg form-control-alt"
          placeholder={intl.formatMessage({ id: 'common.email' })}
        />
        {whiteList !== undefined && (
          <select
            ref={selectRef}
            onChange={changeHandler}
            className="form-control-lg form-control-alt"
          >
            {whiteList.map((suffix) => (
              <option value={suffix} key={suffix}>
                {suffix}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  )
}
export default EmailInput
