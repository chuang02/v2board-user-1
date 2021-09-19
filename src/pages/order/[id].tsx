import './style.less'
import type { FC } from 'react'
import type { IRouteComponentProps } from 'umi'
import { useModel, useIntl } from 'umi'
import { useState, useEffect } from 'react'
import { order, orderCancel, paymentNames, orderCheck } from '@/services'
import { notFoundPath, currencyFormatter } from '@/default'
import type { RadioChangeEvent } from 'antd'
import { Result, Radio, message } from 'antd'
import moment from 'moment'
import Operation from './_Operation'
import type { operationProps } from './_Operation'
import { useInterval, useUnmount } from 'ahooks'
import QRCodeModal from '@/components/Modal/QRcodeModal'
import delay from '@umijs/utils/lib/delay/delay'

const OrderDetailPage: FC<IRouteComponentProps> = (props) => {
  const { match, history } = props
  const { setMenuName } = useModel('useMenuModel')
  const [userOrder, setUserOrder] = useState<API.User.OrderItem>()
  const [payments, setPayments] = useState<API.User.PaymentNameItem[]>()
  const [userPrice, setUserPrice] = useState<operationProps>()
  const [userPayment, setUserPayment] = useState(0)
  const { getMethodName, getMethodPrice } = useModel('usePlanModel')
  const [cancelStatus, setCancelStatus] = useState(false)
  const [changeStatus, setChangeStatus] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(false)
  const [checkInterval, setCheckIntelVal] = useState<number | null>(null)
  const [qrcodeModalVisible, setQRcodeModalVisible] = useState(false)
  const [qrcodeUrl, setQrcodeUrl] = useState('')
  const checkDelay: number = 3000
  const { id } = match.params as { id: string }
  const intl = useIntl()

  const orderCheckInterval = async () => {
    if (userOrder && userOrder?.status in [0, 1] === false) {
      setCheckIntelVal(null)
    }

    const orderCheckResult = await orderCheck({ trade_no: id })
    if (orderCheckInterval === undefined) {
      return
    }
    if (orderCheckResult.data !== userOrder?.status) {
      setChangeStatus(true)
    }
  }

  useInterval(orderCheckInterval, checkInterval, { immediate: false })

  useUnmount(() => {
    setCheckIntelVal(null)
    setMenuName('')
  })

  const onPaymentSuccessHandler = (callbackResult: API.User.OrderCheckoutResult) => {
    if (callbackResult.type === -1 && callbackResult.data === true) {
      setPaymentStatus(true)
      return
    }

    if (callbackResult.type === 1) {
      const redirectUrl = callbackResult.data
      message.info(intl.formatMessage({ id: 'order.detail.messager.info' }))
      delay(1000).then(() => {
        window.location.href = redirectUrl as string
      })
      return
    }

    if (callbackResult.type === 0) {
      setQrcodeUrl(callbackResult.data as string)
      setQRcodeModalVisible(true)
    }
  }

  useEffect(() => {
    setMenuName(intl.formatMessage({ id: 'order.detail.title' }))
    ;(async () => {
      const orderResult = await order({ trade_no: id })
      if (orderResult === undefined || orderResult.data === undefined) {
        history.replace(notFoundPath)
        return
      }
      setUserOrder(orderResult.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, cancelStatus, changeStatus, paymentStatus])

  useEffect(() => {
    if (userOrder?.status === 0) {
      ;(async () => {
        const paymentNamesResult = await paymentNames()
        if (
          paymentNamesResult === undefined ||
          paymentNamesResult.data === undefined ||
          paymentNamesResult.data.length === 0
        ) {
          return
        }
        setPayments(paymentNamesResult.data)
        setUserPayment(paymentNamesResult.data[0].id)
        setUserPrice({
          tradeNo: id,
          paymentID: paymentNamesResult.data[0].id,
          planName: userOrder.plan.name,
          planMethodName: getMethodName(userOrder.cycle),
          totalAmount: userOrder.total_amount,
          discountAmount: userOrder.discount_amount,
          planAmount: getMethodPrice(userOrder.plan, userOrder.cycle),
          onPaymentSuccess: onPaymentSuccessHandler,
        })
      })()
    }

    if (userOrder && userOrder.status in [0, 1]) {
      setCheckIntelVal(checkDelay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userOrder?.status])

  const cannelHandler = async (tradeNo: string) => {
    const orderCancelResult = await orderCancel({ trade_no: tradeNo })
    if (orderCancel === undefined || orderCancelResult.data !== true) {
      return
    }
    setCancelStatus(true)
  }

  const paymentChangeHandler = (paymentIndex: number) => {
    if (payments === undefined || typeof payments[paymentIndex] === undefined) {
      return
    }
    setUserPayment(paymentIndex)
    if (userPrice) {
      setUserPrice({ ...userPrice, paymentID: paymentIndex })
    }
  }

  const renderTop = () => (
    <>
      <div className="block block-rounded">
        <div className="block-content pt-0">
          {userOrder?.status === 1 && (
            <Result
              title={intl.formatMessage({ id: 'common.order.status.pending' })}
              className="py-4"
              subTitle={intl.formatMessage({ id: 'order.detail.status.pending.subtitle' })}
            />
          )}
          {(userOrder?.status === 3 || userOrder?.status === 4) && (
            <Result
              status="success"
              title={intl.formatMessage({ id: 'common.order.status.completed' })}
              className="py-4"
              subTitle={intl.formatMessage({ id: 'order.detail.status.completed.subtitle' })}
            />
          )}
          {userOrder?.status === 2 && (
            <Result
              status="warning"
              title={intl.formatMessage({ id: 'common.order.status.cancelled' })}
              className="py-4"
              subTitle={intl.formatMessage({ id: 'order.detail.status.cancelled.subtitle' })}
            />
          )}
        </div>
      </div>
    </>
  )

  const renderPayment = () => (
    <>
      <h3 className="font-w300 mt-4 mb-3">
        {intl.formatMessage({ id: 'order.detail.payment_method' })}
      </h3>
      <div className="mb-4">
        <Radio.Group
          defaultValue={1}
          value={userPayment}
          size="large"
          onChange={(e: RadioChangeEvent) => {
            e.preventDefault()
            paymentChangeHandler(e.target.value)
          }}
        >
          {payments?.map((payment: API.User.PaymentNameItem) => (
            <Radio.Button value={payment.id} key={payment.id}>
              {payment.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </>
  )

  const renderOrder = () => (
    <>
      <div className="content content-full">
        <div className="row" id="cashier">
          <div className={userOrder?.status === 0 ? 'col-md-8 col-sm-12' : 'col-12'}>
            {userOrder?.status !== 0 && renderTop()}
            <div className="block block-rounded">
              <div className="block-header block-header-default">
                <h3 className="block-title v2board-trade-no">
                  {intl.formatMessage({ id: 'order.detail.plan_title' })}
                </h3>
              </div>
              <div className="block-content pb-4">
                <div className="v2board-order-info">
                  <div>
                    <span>{intl.formatMessage({ id: 'order.detail.plan_name' })}：</span>
                    <span>{userOrder?.plan.name}</span>
                  </div>
                  <div>
                    <span>{intl.formatMessage({ id: 'order.detail.plan_cycle' })}：</span>
                    <span>{getMethodName(userOrder?.cycle || '')}</span>
                  </div>
                  <div>
                    <span>{intl.formatMessage({ id: 'order.detail.plan_transter_enable' })}：</span>
                    <span>{userOrder?.plan.transfer_enable} GB</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="block block-rounded">
              <div className="block-header block-header-default">
                <h3 className="block-title v2board-trade-no">
                  {intl.formatMessage({ id: 'order.detail.order_title' })}
                </h3>
                {userOrder?.status === 0 && (
                  <div className="block-options">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm btn-danger btn-rounded px-3"
                      onClick={(e) => {
                        e.preventDefault()
                        cannelHandler(userOrder.trade_no)
                      }}
                    >
                      {intl.formatMessage({ id: 'order.detail.order_close_btn' })}
                    </button>
                  </div>
                )}
              </div>
              <div className="block-content pb-4">
                <div className="v2board-order-info">
                  <div>
                    <span>{intl.formatMessage({ id: 'order.detail.order_trade_no' })}：</span>
                    <span>{userOrder?.trade_no}</span>
                  </div>
                  {userOrder?.callback_no && (
                    <div>
                      <span>{intl.formatMessage({ id: 'order.detail.order_callback_no' })}：</span>
                      <span>{userOrder?.callback_no}</span>
                    </div>
                  )}

                  {userOrder?.discount_amount && (
                    <div>
                      <span>
                        {intl.formatMessage({ id: 'order.detail.order_discount_amount' })}：
                      </span>
                      <span>{currencyFormatter.format(userOrder.discount_amount / 100)}</span>
                    </div>
                  )}

                  {userOrder?.balance_amount && (
                    <div>
                      <span>
                        {intl.formatMessage({ id: 'order.detail.order_balance_payment' })}：
                      </span>
                      <span>
                        {currencyFormatter.format((userOrder.balance_amount as number) / 100)}
                      </span>
                    </div>
                  )}
                  {userOrder?.paid_at && (
                    <div>
                      <span>{intl.formatMessage({ id: 'order.detail.order_paid_at' })}：</span>
                      <span>
                        {userOrder?.paid_at &&
                          moment.unix(Number(userOrder.paid_at)).format('YYYY-MM-DD HH:MM:SS')}
                      </span>
                    </div>
                  )}
                  <div>
                    <span>{intl.formatMessage({ id: 'common.column.created_at' })}：</span>
                    <span>
                      {userOrder?.created_at &&
                        moment.unix(Number(userOrder.created_at)).format('YYYY-MM-DD HH:MM:SS')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {userOrder?.status === 0 && renderPayment()}
          </div>
          {userOrder?.status === 0 && userPrice && <Operation {...userPrice} />}
        </div>
      </div>
    </>
  )

  return (
    <>
      {renderOrder()}
      <QRCodeModal url={qrcodeUrl} visible={qrcodeModalVisible} />
    </>
  )
}

export default OrderDetailPage
