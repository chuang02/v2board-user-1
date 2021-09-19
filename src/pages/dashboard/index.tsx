import React from 'react'
import Notice from './_Notice'
import { useEffect, useState } from 'react'
import KnowLedge from '@/components/Knowledge'
import Subscribe from './_Subscribe'
import Event from './_Event'
import { knowledges } from '@/services'
import { getLocale } from 'umi'
import classNames from 'classnames/bind'

const DashboardPage: React.FC = () => {
  const [userKnowledges, setUserKnowledges] = useState<API.User.KnowledgesResult>()
  const [userCategories, setUserCategories] = useState<string[]>([])

  const rigthDivClassName = classNames('order-xl-1', {
    'col-xl-12': userCategories.length === 0,
    'col-xl-4': userCategories.length > 0,
  })

  useEffect(() => {
    ;(async () => {
      const knowledgesResult = await knowledges({ language: getLocale() })
      if (knowledgesResult === undefined) {
        return
      }

      setUserKnowledges(knowledgesResult)
      let categories: string[] = []

      Object.keys(knowledgesResult.data).forEach((category) => {
        categories = [...categories, category]
      })
      setUserCategories(categories)
    })()
  }, [])

  return (
    <div className="content content-full">
      <div className="row">
        <div className="col-12 mb-4">
          <Notice></Notice>
        </div>
      </div>
      <div className="row">
        <div className={rigthDivClassName}>
          <Subscribe></Subscribe>
          <Event></Event>
        </div>
        <div className="col-xl-8 ">
          <KnowLedge
            categories={userCategories}
            knowledges={userKnowledges as API.User.KnowledgesResult}
          ></KnowLedge>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
