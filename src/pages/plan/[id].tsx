import './style.less'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import type { IRouteComponentProps } from 'umi'
import { history, useModel } from 'umi'
import { Result, Button } from 'antd'
import { plan } from '@/services'
import { notFoundPath } from '@/default'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import type { couponValues } from './_Coupon'
import Coupon from './_Coupon'
import type { operationProps } from './_Operation'
import Operation from './_Operation'
import type { priceOverview } from '@/models/usePlanModel'
import { currencyFormatter } from '@/default'
import { useIntl } from 'umi'

const PlanDetailPage: FC<IRouteComponentProps> = (props) => {
  const { match, location } = props
  const { getFistPriceOverview, getMethodName } = useModel('usePlanModel')
  const { getOwnProperty } = useModel('useCommonModel')
  const { setMenuName } = useModel('useMenuModel')
  const [userPlan, setUserPlan] = useState<API.User.PlanItem>()
  const { method } = location.state ? (location.state as { method: string }) : { method: '' }
  const [userPlanMethod, setUserPlanMethod] = useState('')
  const [userPrice, setUserPrice] = useState<operationProps>()
  const { id } = match.params as { id: number }
  const intl = useIntl()

  const changeUserPrice = (item: API.User.PlanItem, planMethod: string) => {
    const methodPrice = getOwnProperty(item, planMethod as keyof API.User.PlanItem) as number
    setUserPrice({
      planID: item.id,
      planAmount: methodPrice,
      planMethod,
      planName: item.name,
      totalAmount: methodPrice,
      planMethodName: getMethodName(planMethod),
    })
  }

  useEffect(() => {
    setMenuName(intl.formatMessage({ id: 'plan.detail.title' }))
    ;(async () => {
      const planResult = await plan({ id })
      if (
        planResult === undefined ||
        planResult.data === undefined ||
        planResult.data.renew === 0
      ) {
        history.replace(notFoundPath)
        return
      }
      setUserPlan(planResult.data)
      if (method === '') {
        const firstPriceOverview: priceOverview = getFistPriceOverview(planResult.data)
        setUserPlanMethod(firstPriceOverview.method)
      } else {
        setUserPlanMethod(method)
      }
    })()
    return () => {
      setMenuName('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (userPlan) {
      changeUserPrice(userPlan, userPlanMethod)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPlanMethod])

  const couponCheckCallbackHandler = (coupon: couponValues) => {
    if (userPrice === undefined) {
      return
    }
    const couponCode: string = coupon.code
    const couponName: string = coupon.name
    let discountAmount: number
    let totalAmount: number
    if (coupon.type === 1) {
      discountAmount = coupon.value
      totalAmount = userPrice.totalAmount - discountAmount
    } else if (coupon.type === 2) {
      discountAmount = (coupon.value / 100) * userPrice.totalAmount
      totalAmount = userPrice.totalAmount - discountAmount
    } else {
      throw Error('wrong coupon code type')
    }
    setUserPrice({ ...userPrice, couponName, totalAmount, discountAmount, couponCode })
  }

  const prcieMethodChangeHandler = (e: RadioChangeEvent, paymentMethod: string) => {
    e.preventDefault()
    setUserPlanMethod(paymentMethod)
  }

  const renderDetail = (item: API.User.PlanItem) => {
    return (
      <>
        <div className="block block-link-pop block-rounded block-bordered py-3">
          <h4 className="mb-0 px-3">{item.name}</h4>
          <div
            className="v2board-plan-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
        </div>
      </>
    )
  }

  const renderCycle = (item: API.User.PlanItem) => {
    return (
      <>
        <div className="mb-3">
          <Radio.Group
            defaultValue={userPlanMethod}
            value={userPlanMethod}
            size="large"
            className="v2board-select-price"
            onChange={(e: RadioChangeEvent) => {
              prcieMethodChangeHandler(e, e.target.value as string)
            }}
          >
            {item.month_price && (
              <Radio.Button value="month_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.month_price' })}
                  <br />
                  <span className="price">{currencyFormatter.format(item.month_price / 100)}</span>
                </span>
              </Radio.Button>
            )}
            {item.quarter_price && (
              <Radio.Button value="quarter_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.quarter_price' })}
                  <br />
                  <span className="price">
                    {currencyFormatter.format(item.quarter_price / 100)}
                  </span>
                </span>
              </Radio.Button>
            )}
            {item.half_year_price && (
              <Radio.Button value="half_year_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.half_year_price' })}
                  <br />
                  <span className="price">
                    {currencyFormatter.format(item.half_year_price / 100)}
                  </span>
                </span>
              </Radio.Button>
            )}
            {item.year_price && (
              <Radio.Button value="year_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.year_price' })}
                  <br />
                  <span className="price">{currencyFormatter.format(item.year_price / 100)}</span>
                </span>
              </Radio.Button>
            )}
            {item.two_year_price && (
              <Radio.Button value="two_year_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.two_year_price' })}
                  <br />
                  <span className="price">
                    {currencyFormatter.format(item.two_year_price / 100)}
                  </span>
                </span>
              </Radio.Button>
            )}
            {item.three_year_price && (
              <Radio.Button value="three_year_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.three_year_price' })}
                  <br />
                  <span className="price">
                    {currencyFormatter.format(item.three_year_price / 100)}
                  </span>
                </span>
              </Radio.Button>
            )}
            {item.onetime_price && (
              <Radio.Button value="onetime_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.onetime_price' })}
                  <br />
                  <span className="price">
                    {currencyFormatter.format(item.onetime_price / 100)}
                  </span>
                </span>
              </Radio.Button>
            )}
            {item.reset_price && (
              <Radio.Button value="reset_price">
                <span>
                  {intl.formatMessage({ id: 'plan.detail.reset_price' })}
                  <br />
                  <span className="price">{currencyFormatter.format(item.reset_price / 100)}</span>
                </span>
              </Radio.Button>
            )}
          </Radio.Group>
        </div>
      </>
    )
  }

  const renderNoRenewal = () => {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <div className="block block-rounded">
              <div className="block-content">
                <Result
                  title={intl.formatMessage({ id: 'plan.detail.select_other_btn.title' })}
                  extra={
                    <Button
                      type="primary"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault()
                        history.push('/plan')
                      }}
                    >
                      {intl.formatMessage({ id: 'plan.detail.select_other_btn' })}
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="content content-full">
      {userPlan !== undefined && userPlan.renew === 1 && (
        <div className="row" id="cashier">
          <div className="col-md-8 col-sm-12">
            {userPlan && renderDetail(userPlan)}
            <h3 className="font-w300 mt-4 mb-3">
              {intl.formatMessage({ id: 'plan.detail.cycle' })}
            </h3>
            {userPlan && renderCycle(userPlan)}
          </div>
          <div className="col-md-4 col-sm-12">
            {userPlan && (
              <Coupon planID={userPlan?.id} onCheckSuccess={couponCheckCallbackHandler}></Coupon>
            )}
            {userPrice && <Operation {...userPrice}></Operation>}
          </div>
        </div>
      )}

      {userPlan !== undefined && userPlan.renew === 0 && renderNoRenewal()}
    </div>
  )
}

export default PlanDetailPage
