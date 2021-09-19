import type { FC } from 'react'
import React, { useState } from 'react'
import { knowledge } from '@/services'
import { Drawer } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Link, useIntl } from 'umi'
import MarkdownIt from 'markdown-it'

const mdParser = new MarkdownIt({ html: true })

export interface KnowLedgeProps {
  knowledges: API.User.KnowledgesResult
  categories: string[]
}

const KnowLedge: FC<KnowLedgeProps> = (props) => {
  const { knowledges, categories } = props
  const [userKnowledge, setUserKnowledge] = useState<API.User.KnowledgeResult>()
  const [visible, setVisible] = useState(false)
  const intl = useIntl()

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
    setUserKnowledge(undefined)
  }

  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    ;(async () => {
      e.preventDefault()
      const knowLedgeResult = await knowledge({ id })
      if (knowLedgeResult === undefined) {
        return
      }
      setUserKnowledge(knowLedgeResult)
      showDrawer()
    })()
  }

  return (
    <>
      {categories &&
        categories.map((category, categoryIndex) => {
          const categoryKey: number = categoryIndex
          return (
            <div className="row" key={categoryKey}>
              <div className="col-md-12">
                <div className="block block-rounded block-bordered">
                  <div className="block-header block-header-default">
                    <h3 className="block-title">{category}</h3>
                  </div>
                  <div className="list-group">
                    {knowledges?.data[category].map((knowledgeItem, knowledgeIndex) => {
                      const knowledgeKey: number = knowledgeIndex
                      return (
                        <Link
                          className="list-group-item list-group-item-action"
                          key={knowledgeKey}
                          to="#"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            clickHandler(e, knowledgeItem.id)
                          }}
                        >
                          <h5 className="font-size-base mb-1">{knowledgeItem.title}</h5>
                          <small>
                            {intl.formatMessage({ id: 'knowledge.last_update' })}:
                            {moment.unix(Number(knowledgeItem.updated_at)).format('l')}
                          </small>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      <Drawer
        title={userKnowledge?.data.title ?? 'Loading...'}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="80%"
      >
        {userKnowledge?.data.body !== undefined ? (
          <div
            dangerouslySetInnerHTML={{ __html: mdParser.render(userKnowledge.data.body as string) }}
          ></div>
        ) : (
          <LoadingOutlined />
        )}
      </Drawer>
    </>
  )
}

export default KnowLedge
