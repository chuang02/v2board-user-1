import type { FC } from 'react'
import { useModel, Link, useIntl } from 'umi'
import type { summaryProps } from '@/components/Subscribe/Summary'
import Summary from '@/components/Subscribe/Summary'
import OneClick from '@/components/Subscribe/OneClick'
import type { oneClickProps } from '@/components/Subscribe/OneClick'
import Operation from './_Operation'
import { useMount } from 'ahooks'

const Top: FC = () => {
  const { subState, setSubState, initSubState, generateUrls } = useModel('useSubModel')
  const userSummaryProps: summaryProps = subState as summaryProps
  const userOneClickProps: oneClickProps = subState as oneClickProps
  const intl = useIntl()

  const resetPrivateCallBack = (subUrl: string) => {
    const subscribeUrl = subUrl
    setSubState({ ...subState, subscribeUrl, ...generateUrls(subscribeUrl) })
  }

  const render = () => {
    return (
      <>
        <div className="block block-rounded mb-4">
          <div className="block-content block-content-full">
            <div className="d-md-flex justify-content-md-between align-items-md-center">
              <Summary {...userSummaryProps}></Summary>
              <div className="p-1 p-md-3 col-md-6 col-xs-12 text-md-right">
                <OneClick {...userOneClickProps}></OneClick>
                {(subState.planID as number) > 0 && (
                  <Operation
                    planID={subState.planID as number}
                    onResetPrivate={resetPrivateCallBack}
                  ></Operation>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <>
        <Link className="block block-rounded mb-4 block-link-pop" to="/plan">
          <div className="block-content block-content-full">
            <div className="text-center align-items-md-center py-5">
              <div>
                <i className="fa fa-plus fa-2x" />
              </div>
              <div className="font-size-sm font-w700 text-uppercase text-muted pt-2">
                {intl.formatMessage({ id: 'module.plan' })}
              </div>
            </div>
          </div>
        </Link>
      </>
    )
  }

  useMount(async () => {
    await initSubState()
  })

  return (subState?.planID as number) > 0 ? render() : renderEmpty()
}

export default Top
