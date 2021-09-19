import { getIntl } from 'umi'

const intl = getIntl()

export interface priceOverview {
  price: number
  method: string
  methodName: string
}

export interface PlanModel {
  getMethodName: (method: string) => string
  getFistPriceOverview: (plan: API.User.PlanItem) => priceOverview
  getMethodPrice: (plan: API.User.PlanItem, method: string) => number
}

const planMethodNames: Record<string, string> = {
  month_price: intl.formatMessage({ id: 'plan.detail.month_price' }),
  quarter_price: intl.formatMessage({ id: 'plan.detail.quarter_price' }),
  half_year_price: intl.formatMessage({ id: 'plan.detail.half_year_price' }),
  year_price: intl.formatMessage({ id: 'plan.detail.year_price' }),
  two_year_price: intl.formatMessage({ id: 'plan.detail.two_year_price' }),
  three_year_price: intl.formatMessage({ id: 'plan.detail.three_year_price' }),
  onetime_price: intl.formatMessage({ id: 'plan.detail.onetime_price' }),
  reset_price: intl.formatMessage({ id: 'plan.detail.reset_price' }),
}

export default (): PlanModel => {
  const getMethodName = (method: string): string => {
    let methodName: string
    if (typeof planMethodNames[method] !== undefined) {
      methodName = planMethodNames[method]
    } else {
      methodName = 'unknown'
    }
    return methodName
  }

  const getMethodPrice = (plan: API.User.PlanItem, method: string): number => {
    let price: number = 0
    const anyPlan: any = plan as any
    if (method in anyPlan) {
      price = anyPlan[method] as number
    }
    return price
  }

  const getFistPriceOverview = (plan: API.User.PlanItem): priceOverview => {
    let methodName: string = 'unknown'
    let price: number = 0
    let method: string = 'unknown'
    if (plan.month_price) {
      price = plan.month_price
      method = 'month_price'
    } else if (plan.quarter_price) {
      price = plan.quarter_price
      method = 'quarter_price'
    } else if (plan.half_year_price) {
      price = plan.half_year_price
      method = 'half_year_price'
    } else if (plan.year_price) {
      price = plan.year_price
      method = 'year_price'
    } else if (plan.two_year_price) {
      price = plan.two_year_price
      method = 'two_year_price'
    } else if (plan.three_year_price) {
      price = plan.three_year_price
      method = 'three_year_price'
    } else if (plan.onetime_price) {
      price = plan.onetime_price
      method = 'onetime_price'
    } else if (plan.reset_price) {
      price = plan.reset_price
      method = 'reset_price'
    }
    if (method !== 'unknown') {
      methodName = planMethodNames[method]
    }

    return { methodName, method, price }
  }

  return {
    getMethodPrice,
    getMethodName,
    getFistPriceOverview,
  }
}
