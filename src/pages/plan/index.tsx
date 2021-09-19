import './style.less'
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { plans } from '@/services'
import type { IRouteComponentProps } from 'umi'
import { useModel, useIntl } from 'umi'

const PlanPage: FC<IRouteComponentProps> = (props) => {
  const [userPlans, setUserPlans] = useState<API.User.PlanItem[]>([])
  const { history } = props
  const { getFistPriceOverview } = useModel('usePlanModel')
  const intl = useIntl()

  useEffect(() => {
    ;(async () => {
      const plansResult = await plans()
      if (plansResult === undefined || plansResult.data === undefined) {
        return
      }
      setUserPlans(plansResult.data)
    })()
  }, [])

  const renderPrice = (plan: API.User.PlanItem) => {
    const firstPrice = getFistPriceOverview(plan)

    return (
      <>
        <p className="h1 font-w700 mb-2">¥ {firstPrice.price}</p>
        <p className="h6 text-muted">{firstPrice.methodName}</p>
      </>
    )
  }

  const render = () => (
    <>
      <div className="content content-full">
        <div className="row">
          {userPlans.map((plan: API.User.PlanItem) => {
            return (
              <div
                className="col-md-4 col-xl-3"
                key={plan.id}
                onClick={(e: React.MouseEvent) => {
                  const planPathName = `/plan/${plan.id}`
                  e.preventDefault()
                  history.push({
                    pathname: planPathName,
                    state: { method: getFistPriceOverview(plan).method },
                  })
                }}
              >
                <div className="block block-link-pop block-rounded block-bordered text-center">
                  <div className="block-header">
                    <h3 className="block-title"> {plan.name}</h3>
                  </div>
                  <div className="block-content bg-body-light">
                    <div className="py-2">{renderPrice(plan)}</div>
                  </div>
                  <div className="block-content">
                    <div className="py-2" dangerouslySetInnerHTML={{ __html: plan.content }}></div>
                  </div>
                  <div className="block-content block-content-full bg-body-light">
                    <span className="btn btn-hero-primary btn-rounded px-4">
                      <i className="fa fa-thumbs-up mr-1"></i>
                      {intl.formatMessage({ id: 'plan.now' })}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )

  return <>{render()}</>
}
export default PlanPage
