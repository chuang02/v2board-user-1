import type { FC } from 'react'
import { useIntl } from 'umi'

export interface summaryProps {
  planName: string
  expiredDay: string
  leftDay: string
  resetDay: string
  percentBar: string
  usedTraffic: string
  transferTotal: string
}

const Summary: FC<summaryProps> = (props) => {
  const { planName, expiredDay, leftDay, resetDay, percentBar, usedTraffic, transferTotal } = props
  const intl = useIntl()
  return (
    <>
      <div>
        <h3 className="h4 font-w700 mb-1">{planName}</h3>
        <p className="font-size-sm text-muted">
          {expiredDay === null || leftDay === null ? (
            <span>{intl.formatMessage({ id: 'subscribe.summary.not_expired' })}</span>
          ) : (
            <span>
              {intl.formatMessage(
                { id: 'subscribe.summary.expire_tip' },
                { expiredDay, leftDay, resetDay },
              )}
            </span>
          )}
        </p>
        <div className="mb-0">
          <div className="progress mb-1" style={{ height: '6px' }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              role="progressbar"
              style={{ width: percentBar }}
            ></div>
          </div>
          <p className="font-size-sm font-w600 mb-3">
            <span className="font-w700">
              {intl.formatMessage(
                { id: 'subscribe.summary.stats' },
                { usedTraffic, transferTotal },
              )}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Summary
