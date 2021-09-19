import type { FC } from 'react'
import { Link } from 'umi'
import { useModel, useIntl } from 'umi'
import OneClick from '@/components/Subscribe/OneClick'
import type { oneClickProps } from '@/components/Subscribe/OneClick'
import type { summaryProps } from '@/components/Subscribe/Summary'
import Summary from '@/components/Subscribe/Summary'
import { useMount } from 'ahooks'

const Subscribe: FC = () => {
  const { subState, initSubState } = useModel('useSubModel')
  const userSummaryProps: summaryProps = subState as summaryProps
  const useOneClickProps: oneClickProps = subState as oneClickProps
  const planPath = `/plan/${subState.planID?.toString()}`
  const intl = useIntl()

  useMount(async () => {
    await initSubState()
  })

  const render = () => (
    <>
      <div className="justify-content-md-between align-items-md-center">
        <Summary {...userSummaryProps} />
        <div className="mb-3">
          <OneClick {...useOneClickProps}></OneClick>
          <Link
            className="btn btn-sm btn-outline-primary btn-rounded px-3 mr-1 my-1"
            to="/subscribe"
          >
            <i className="fa fa-cog mr-1"></i>
            {intl.formatMessage({ id: 'dashboard.subscribe.view_subscription' })}
          </Link>
          <Link className="btn btn-sm btn-outline-danger btn-rounded px-3 my-1" to={planPath}>
            <i className="fa fa-redo mr-1"></i>
            {intl.formatMessage({ id: 'dashboard.subscribe.renew' })}
          </Link>
        </div>
      </div>
    </>
  )

  const renderEmpty = () => (
    <>
      <Link to="/plan">
        <div className="text-center">
          <div>
            <i className="fa fa-plus fa-2x" />
          </div>
          <div className="font-size-sm font-w700 text-uppercase text-muted pt-2 pb-3">
            {intl.formatMessage({ id: 'module.plan' })}
          </div>
        </div>
      </Link>
    </>
  )

  return (
    <>
      <div className="block block-rounded js-appear-enabled">
        <div className="block-header block-header-default">
          <h3 className="block-title">{intl.formatMessage({ id: 'module.subscribe' })}</h3>
        </div>
        <div className="block-content">
          {(subState.planID as number) > 0 ? render() : renderEmpty()}
        </div>
      </div>
    </>
  )
}
export default Subscribe
