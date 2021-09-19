import { useState } from 'react'
import moment from 'moment'
import { subscribe } from '@/services'
import { formatBytes } from 'bytes-formatter'
import { title } from '@/default'

export interface subscribeState {
  planID: number
  expiredDay: string | null
  leftDay: string | null
  usedTraffic: string
  resetDay: string
  planName: string
  percentBar: string
  transferTotal: string
  subscribeUrl: string
  clashUrl: string
  surgeUrl: string
  shadowrocketUrl: string
  quantumultXUrl: string
}

export type clientUrls = Pick<
  subscribeState,
  'clashUrl' | 'surgeUrl' | 'shadowrocketUrl' | 'quantumultXUrl'
>

export interface subModel {
  subState: Partial<subscribeState>
  setSubState: React.Dispatch<React.SetStateAction<Partial<subscribeState>>>
  initSubState: () => Promise<void>
  refresh: () => Promise<void>
  fetchSubState: () => Promise<subscribeState | undefined>
  generateUrls: (subscribeUrl: string) => clientUrls
}

export default (): subModel => {
  const [subState, setSubState] = useState<Partial<subscribeState>>({})
  const [initialized, setIinitialized] = useState(false)

  const generateUrls = (
    subscribeUrl: string,
  ): Pick<subscribeState, 'clashUrl' | 'surgeUrl' | 'shadowrocketUrl' | 'quantumultXUrl'> => {
    const clashUrl: string = `clash://install-config?url=${subscribeUrl}&name=${title}`
    const surgeUrl: string = `surge:///install-config?url=${subscribeUrl}&name=${title}`
    const shaowRocketContent: string = Buffer.from(subscribeUrl).toString('base64')
    const shadowrocketUrl: string = `shadowrocket://add/sub://${shaowRocketContent}?remark=${title}`
    const quantumultXContent = encodeURIComponent(`{server_remote:[subscribeUrl,"tag=${title}"]}`)
    const quantumultXUrl: string = `quantumult-x:///update-configuration?remote-resource=${quantumultXContent}`
    return {
      clashUrl,
      surgeUrl,
      shadowrocketUrl,
      quantumultXUrl,
    }
  }

  const fetchSubState = async (): Promise<subscribeState | undefined> => {
    const subscribeResult = await subscribe()
    if (subscribeResult === undefined || subscribeResult.data === undefined) {
      return undefined
    }
    const planID: number = subscribeResult.data.plan_id
    const expiredDay: string | null =
      subscribeResult?.data.expired_at !== null
        ? moment.unix(subscribeResult?.data.expired_at).format('YYYY/MM/DD')
        : null
    const usedTrafficNum: number = subscribeResult?.data.u + subscribeResult?.data.d
    const transferTotalNum: number = subscribeResult?.data.transfer_enable
    const usedTraffic = formatBytes(usedTrafficNum)
    const transferTotal = formatBytes(transferTotalNum)
    const resetDay: string = subscribeResult?.data.reset_day
    const leftDay: string | null =
      subscribeResult?.data.expired_at !== null
        ? moment(expiredDay).diff(moment(), 'days').toString()
        : null
    const planName: string = subscribeResult?.data.plan?.name as string
    const percentBar: string = `${Math.round((usedTrafficNum / transferTotalNum) * 10000) / 100}%`
    const subscribeUrl: string = subscribeResult?.data.subscribe_url
    const clientUrls = generateUrls(subscribeUrl)

    return {
      planID,
      expiredDay,
      usedTraffic,
      leftDay,
      resetDay,
      planName,
      transferTotal,
      percentBar,
      subscribeUrl,
      ...clientUrls,
    }
  }

  const refresh = async () => {
    const stateResult = await fetchSubState()
    if (stateResult !== undefined) {
      setSubState({ ...stateResult })
      setIinitialized(true)
    }
  }

  const initSubState = async () => {
    if (initialized === true) {
      return
    }
    refresh()
  }

  return {
    subState,
    setSubState,
    initSubState,
    refresh,
    fetchSubState,
    generateUrls,
  }
}
