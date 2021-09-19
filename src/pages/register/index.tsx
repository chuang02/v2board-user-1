import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import { title, description } from '@/default'
import { commonConfig } from '@/services/guest'
import EmailInput from '@/components/EmailInput'
import EmailCodeInput from '@/components/EmailCodeInput'
import { emailVerify, register } from '@/services'
import { loginPath, forgetPath, backgroundUrl } from '@/default'
import { notification } from 'antd'
import { useLockFn } from 'ahooks'
import delay from '@umijs/utils/lib/delay/delay'
import { history, Link, useIntl } from 'umi'
import RecaptchaModal from '@/components/Modal/RecaptchaModal'
import DropDownLang from '@/components/DropDownLang'

const RegisterPage: FC = () => {
  const [gusetCommonConfig, setGuestCommonConfig] = useState<API.Guest.CommonConfigItem>()
  const [submitStatus, setSubmitStatus] = useState(true)
  const [guestEmail, setGuestEmail] = useState('')
  const [guestEmailCode, setGusetEmailCode] = useState('')
  const [guestRecaptchaData, setGuestRecaptchaData] = useState('')
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordRepeatRef = useRef<HTMLInputElement>(null)
  const inviteCodeRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  const [recaptchaModalVisible, setRecaptchaModalVisible] = useState(false)

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

  const recaptchaVerifiedHandler = (data: string) => {
    setGuestRecaptchaData(data)
    setRecaptchaModalVisible(false)
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
    if (gusetCommonConfig?.is_recaptcha === 1 && guestRecaptchaData.length === 0) {
      showRecaptchaModal()
      return
    }
    const password = passwordRef.current?.value as string
    const passwordRepeat = passwordRepeatRef.current?.value as string
    const inviteCode = inviteCodeRef.current?.value as string
    if (password.length > 0 && passwordRepeat.length > 0 && password !== passwordRepeat) {
      notification.error({
        message: intl.formatMessage({ id: 'common.message.request_error' }),
        description: intl.formatMessage({ id: 'common.message.different' }),
      })
      return
    }

    let registerParams = {
      email: guestEmail,
      email_code: guestEmailCode,
      password,
      invite_code: inviteCode,
    } as API.Passport.RegisterParams

    if (guestRecaptchaData.length > 0) {
      registerParams = { ...registerParams, recaptcha_data: guestRecaptchaData }
    }
    setGuestRecaptchaData('')
    const registerResult = await register(registerParams)
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

      if (commonConfigResut.data.tos_url) {
        setSubmitStatus(false)
      }
    })()
  }, [])

  return (
    <>
      <div id="page-container">
        <main id="main-container">
          <div className="bg-image">
            <div className="row no-gutters justify-content-center">
              <div
                className="hero-static col-md-12 d-flex align-items-center v2board-background bg-white"
                style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {}}
              >
                <div className="p-3 w-100">
                  <div className="mb-3 text-center">
                    <Link className="link-fx text-success font-w700 font-size-h1" to="/">
                      <span className="text-success">{title}</span>
                    </Link>
                    <p className="text-uppercase font-w700 font-size-sm text-muted">
                      {description}
                    </p>
                    <DropDownLang placement="bottomCenter"></DropDownLang>
                  </div>

                  <div className="row no-gutters justify-content-center">
                    <div className="col-sm-8 col-xl-6">
                      <div className="py-3">
                        <EmailInput
                          onChange={emailInputChangeHandler}
                          whiteList={
                            typeof gusetCommonConfig?.email_whitelist_suffix === 'object'
                              ? gusetCommonConfig?.email_whitelist_suffix
                              : undefined
                          }
                        />
                        {gusetCommonConfig?.is_email_verify === 1 && (
                          <EmailCodeInput
                            onChange={emailCodeInputChangeHandler}
                            onSend={emailCodeSendHandler}
                            btnClassName="btn-success"
                          />
                        )}
                        <div className="form-group">
                          <input
                            ref={passwordRef}
                            className="form-control form-control-lg form-control-alt"
                            placeholder={intl.formatMessage({ id: 'common.password' })}
                            type="password"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            ref={passwordRepeatRef}
                            className="form-control form-control-lg form-control-alt"
                            placeholder={intl.formatMessage({ id: 'common.password_repeat' })}
                            type="password"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            ref={inviteCodeRef}
                            className="form-control form-control-lg form-control-alt"
                            placeholder={
                              gusetCommonConfig?.is_invite_force === 1
                                ? intl.formatMessage({ id: 'register.invite_code' })
                                : intl.formatMessage({ id: 'register.invite_code_optional' })
                            }
                          />
                        </div>
                        {gusetCommonConfig?.tos_url && (
                          <div className="form-group">
                            <div className="custom-control custom-checkbox custom-control-primary">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="signup-terms"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  setSubmitStatus(e.currentTarget.checked)
                                }}
                              />
                              <label className="custom-control-label" htmlFor="signup-terms">
                                {intl.formatMessage({ id: 'register.agree' })}
                                <a href={gusetCommonConfig.tos_url} target="_blank">
                                  {intl.formatMessage({ id: 'register.terms' })}
                                </a>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-block btn-hero btn-hero-success"
                          disabled={!submitStatus}
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault()
                            submitHandler()
                          }}
                        >
                          <i className="fa fa-fw fa-plus mr-1" />
                          {intl.formatMessage({ id: 'common.register' })}
                        </button>
                        <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                          <Link
                            className="btn btn-sm btn-light d-block d-lg-inline-block mb-1"
                            to={forgetPath}
                          >
                            <i className="fa fa-sign-in-alt text-muted mr-1" />
                            {intl.formatMessage({ id: 'common.forget_password' })}
                          </Link>
                          <Link
                            className="btn btn-sm btn-light d-block d-lg-inline-block mb-1"
                            to={loginPath}
                          >
                            <i className="fa fa-plus text-muted mr-1" />
                            {intl.formatMessage({ id: 'common.login' })}
                          </Link>
                        </p>
                      </div>
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
export default RegisterPage
