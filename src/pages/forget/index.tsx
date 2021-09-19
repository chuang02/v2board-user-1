import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link, history, useIntl } from 'umi'
import { notification } from 'antd'
import { title, description, registerPath, loginPath, backgroundUrl } from '@/default'
import { commonConfig } from '@/services/guest'
import { emailVerify } from '@/services'
import { useLockFn } from 'ahooks'
import EmailInput from '@/components/EmailInput'
import EmailCodeInput from '@/components/EmailCodeInput'
import RecaptchaModal from '@/components/Modal/RecaptchaModal'
import delay from '@umijs/utils/lib/delay/delay'
import { forget } from '@/services'
import DropDownLang from '@/components/DropDownLang'

const ForgetPage: FC = () => {
  const [guestEmail, setGuestEmail] = useState('')
  const [guestEmailCode, setGusetEmailCode] = useState('')
  const [gusetCommonConfig, setGuestCommonConfig] = useState<API.Guest.CommonConfigItem>()
  const [recaptchaModalVisible, setRecaptchaModalVisible] = useState(false)
  const [guestRecaptchaData, setGuestRecaptchaData] = useState('')
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordRepeatRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  const recaptchaVerifiedHandler = (data: string) => {
    setGuestRecaptchaData(data)
    setRecaptchaModalVisible(false)
  }

  const showRecaptchaModal = () => {
    setRecaptchaModalVisible(true)
  }

  const cancelRecaptchaModalHandler = () => {
    setRecaptchaModalVisible(false)
  }

  const emailInputChangeHandler = (value: string) => {
    setGuestEmail(value)
  }

  const emailCodeInputChangeHandler = (value: string) => {
    setGusetEmailCode(value)
  }

  const emailCodeSendHandler = async () => {
    if (gusetCommonConfig?.is_recaptcha === 1 && guestRecaptchaData.length === 0) {
      showRecaptchaModal()
      return false
    }

    let emailVerifyParams = { email: guestEmail } as API.Passport.EmailVerifyParams
    if (guestRecaptchaData.length > 0) {
      emailVerifyParams = { ...emailVerifyParams, recaptcha_data: guestRecaptchaData }
    }
    setGuestRecaptchaData('')
    const emailVerifyResult = await emailVerify(emailVerifyParams)
    if (emailVerifyResult === undefined) {
      return false
    }
    notification.success({
      message: intl.formatMessage({ id: 'common.message.request_success' }),
      description: intl.formatMessage({ id: 'common.message.check_samp_box' }),
    })
    return true
  }

  const submitHandler = useLockFn(async () => {
    const password = passwordRef.current?.value as string
    const passwordRepeat = passwordRepeatRef.current?.value as string
    if (password.length > 0 && passwordRepeat.length > 0 && password !== passwordRepeat) {
      notification.error({
        message: intl.formatMessage({ id: 'common.message.request_error' }),
        description: intl.formatMessage({ id: 'common.message.different' }),
      })
      return
    }

    const registerParams = {
      email: guestEmail,
      email_code: guestEmailCode,
      password,
    } as API.Passport.ForgetParams
    const registerResult = await forget(registerParams)
    if (registerResult === undefined) {
      return
    }
    delay(10).then(() => {
      history.push(loginPath)
    })
  })
  useEffect(() => {
    ;(async () => {
      const commonConfigResut = await commonConfig()
      if (commonConfigResut === undefined) {
        return
      }
      setGuestCommonConfig(commonConfigResut.data)
    })()
  }, [])
  return (
    <>
      <div id="page-container" className="side-trans-enabled">
        <main id="main-container">
          <div className="row no-gutters bg-gd-sun-op">
            <div
              className="hero-static col-md-12 d-flex align-items-center v2board-background bg-white"
              style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {}}
            >
              <div className="p-3 w-100">
                <div className="text-center">
                  <Link className="link-fx text-warning font-w700 font-size-h1" to="/">
                    <span className="text-warning">{title}</span>
                  </Link>
                  <p className="text-uppercase font-w700 font-size-sm text-muted">{description}</p>
                  <DropDownLang placement="bottomCenter"></DropDownLang>
                </div>

                <div className="row no-gutters justify-content-center">
                  <div className="col-sm-8 col-xl-6">
                    <EmailInput onChange={emailInputChangeHandler} />
                    <EmailCodeInput
                      onChange={emailCodeInputChangeHandler}
                      onSend={emailCodeSendHandler}
                      btnClassName="btn-warning"
                    />

                    <div className="form-group">
                      <input
                        ref={passwordRef}
                        type="password"
                        className="form-control form-control-lg form-control-alt"
                        placeholder={intl.formatMessage({ id: 'common.password' })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        ref={passwordRepeatRef}
                        type="password"
                        className="form-control form-control-lg form-control-alt"
                        placeholder={intl.formatMessage({ id: 'common.password_repeat' })}
                      />
                    </div>

                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="btn btn-block btn-hero btn-hero-warning"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault()
                          submitHandler()
                        }}
                      >
                        <i className="fa fa-fw fa-reply mr-1" />
                        {intl.formatMessage({ id: 'forget.reset_password_btn' })}
                      </button>
                      <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                        <Link
                          className="btn btn-sm btn-light d-block d-lg-inline-block mb-1"
                          to={registerPath}
                        >
                          <i className="fa fa-plus text-muted mr-1" />
                          {intl.formatMessage({ id: 'common.register' })}
                        </Link>
                        <Link
                          className="btn btn-sm btn-light d-block d-lg-inline-block mb-1"
                          to={loginPath}
                        >
                          <i className="fa fa-sign-in-alt text-muted mr-1" />
                          {intl.formatMessage({ id: 'common.login' })}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {gusetCommonConfig?.is_recaptcha === 1 && (
        <>
          <RecaptchaModal
            onVerified={recaptchaVerifiedHandler}
            sitekey={gusetCommonConfig?.recaptcha_site_key as string}
            visible={recaptchaModalVisible}
            onCancel={cancelRecaptchaModalHandler}
          />
        </>
      )}
    </>
  )
}

export default ForgetPage
