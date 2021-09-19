import React, { useState } from 'react'
import type { FC } from 'react'
import { currencyFormatter } from '@/default'
import { orderCheckout } from '@/services'
import { LoadingOutlined } from '@ant-design/icons'
import { useIntl } from 'umi'

export interface operationProps {
  tradeNo: string
  paymentID: number
  planAmount: number
  planMethodName: string
  planName: string
  discountAmount?: number
  totalAmount: number
  onPaymentSuccess: (callbackResult: API.User.OrderCheckoutResult) => void
}

const Operation: FC<operationProps> = (props) => {
  const [disabled, setDisabled] = useState(false)
  const intl = useIntl()

  const {
    tradeNo,
    paymentID,
    planAmount,
    planName,
    planMethodName,
    discountAmount,
    totalAmount,
    onPaymentSuccess,
  } = props
  const clickHandler = async () => {
    setDisabled(true)
    const orderCheckoutResult = await orderCheckout({ trade_no: tradeNo, method: paymentID })
    if (orderCheckoutResult !== undefined) {
      onPaymentSuccess(orderCheckoutResult)
    }
    setDisabled(false)
  }
  return (
    <>
      <div className="col-md-4 col-sm-12">
        <div
          className="block block-link-pop block-rounded block-bordered px-3 py-3 text-light"
          style={{ background: 'rgb(53, 56, 61)' }}
        >
          <h5 className="text-light mb-3">
            {intl.formatMessage({ id: 'order.detail.operation.total' })}
          </h5>
          <div
            className="row no-gutters pb-3"
            style={{ borderBottom: '1px solid rgb(100, 102, 105)' }}
          >
            <div className="col-8">
              {planName} x {planMethodName}
            </div>
            <div className="col-4 text-right">{currencyFormatter.format(planAmount / 100)}</div>
          </div>
          {discountAmount && (
            <div>
              <div className="pt-3" style={{ color: 'rgb(100, 102, 105)' }}>
                {intl.formatMessage({ id: 'order.detail.operation.discount' })}
              </div>
              <div
                className="row no-gutters py-3"
                style={{ borderBottom: '1px solid rgb(100, 102, 105)' }}
              >
                <div className="col-8" />
                <div className="col-4 text-right">
                  {currencyFormatter.format(discountAmount / 100)}
                </div>
              </div>
            </div>
          )}
          <div className="pt-3" style={{ color: 'rgb(100, 102, 105)' }}>
            {intl.formatMessage({ id: 'order.detail.operation.amount_to' })}
          </div>
          <h1 className="text-light mt-3 mb-3">
            {currencyFormatter.format(totalAmount / 100)} CNY
          </h1>
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              clickHandler()
            }}
            disabled={disabled}
          >
            {disabled && (
              <span>
                <LoadingOutlined style={{ fontSize: 24 }} />
              </span>
            )}

            {!disabled && (
              <span>
                <i className="far fa-check-circle" />
                {intl.formatMessage({ id: 'order.detail.operation.check_out' })}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default Operation
