import React, { useState } from 'react'
import type { FC } from 'react'
import { Modal } from 'antd'
import { orderSave } from '@/services'
import { history, useIntl } from 'umi'
import { currencyFormatter } from '@/default'
import { LoadingOutlined } from '@ant-design/icons'

export interface operationProps {
  planID: number
  planAmount: number
  planName: string
  planMethodName: string
  planMethod: string
  couponCode?: string
  couponName?: string
  discountAmount?: number
  totalAmount: number
}

const Operation: FC<operationProps> = (props) => {
  const [disabled, setDisabled] = useState(false)
  const intl = useIntl()

  const {
    planID,
    planAmount,
    planName,
    planMethod,
    planMethodName,
    couponName,
    discountAmount,
    totalAmount,
    couponCode,
  } = props

  const orderRun = () => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'plan.detail.operation.modal.title' }),
      content: intl.formatMessage({ id: 'plan.detail.operation.modal.content' }),
      onOk: async (): Promise<any> => {
        setDisabled(true)
        let orderSaveParams: API.User.OrderSaveParams = {
          plan_id: planID,
          cycle: planMethod,
        }
        if (typeof couponCode !== undefined) {
          orderSaveParams = { ...orderSaveParams, coupon_code: couponCode }
        }
        const orderSaveResult = await orderSave(orderSaveParams)
        if (orderSaveResult !== undefined) {
          history.push(`/order/${orderSaveResult.data}`)
        }
        setDisabled(false)
      },
    })
  }

  return (
    <>
      <div
        className="block block-link-pop block-rounded block-bordered px-3 py-3 text-light"
        style={{ background: 'rgb(53, 56, 61)' }}
      >
        <h5 className="text-light mb-3">
          {intl.formatMessage({ id: 'plan.detail.operation.total' })}
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
        {discountAmount && couponName && (
          <div>
            <div className="pt-3" style={{ color: 'rgb(100, 102, 105)' }}>
              {intl.formatMessage({ id: 'plan.detail.operation.discount' })}
            </div>
            <div
              className="row no-gutters py-3"
              style={{ borderBottom: '1px solid rgb(100, 102, 105)' }}
            >
              <div className="col-8">{couponName}</div>
              <div className="col-4 text-right">
                - {currencyFormatter.format(discountAmount / 100)}
              </div>
            </div>
          </div>
        )}
        <div className="pt-3" style={{ color: 'rgb(100, 102, 105)' }}>
          {intl.formatMessage({ id: 'plan.detail.operation.amount_to' })}
        </div>
        <h1 className="text-light mt-3 mb-3">{currencyFormatter.format(totalAmount / 100)} CNY</h1>
        <button
          type="button"
          className="btn btn-block btn-primary"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            orderRun()
          }}
        >
          <span>
            {disabled && (
              <span>
                <LoadingOutlined style={{ fontSize: 24 }} />
              </span>
            )}

            {!disabled && (
              <span>
                <i className="far fa-check-circle" />
                {intl.formatMessage({ id: 'plan.detail.operation.check_out' })}
              </span>
            )}
          </span>
        </button>
      </div>
    </>
  )
}

export default Operation
