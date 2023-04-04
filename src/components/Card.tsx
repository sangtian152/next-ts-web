/**
 * 卡片
 */
import type { CardType } from '@/utils/types'
import cx from 'classnames'
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, theme } from 'antd';
import { getPicture } from '@/api/content'
import { imgLoader, navigateTo } from '@/utils';
import { useRouter } from 'next/router';
import AppEmpty from './AppEmpty';
import { useAppSelector } from '@/hook/useSelector';
const { useToken } = theme;

interface CardProps {
  layout: number;
  type?: string;
  moduleId?:string;
  page?:boolean;
  data?: CardType[];
}

const Card: React.FC<CardProps> = (props) =>{
  const router = useRouter()
  const [cards, setCards] = useState<CardType[]>([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { token } = useToken()
  const num = [0, 3, 4, 6][props.layout]
  const span = num ? 24 / num : 3
  // const className = props.data.coverPicUr ? 'is-image' : 'is-icon'
  useEffect(() => {
    fetchCard()
  }, [pageNum, pageSize])
  // 请求数据
  const fetchCard = async () => {
    if (props.moduleId) {
      const res = await getPicture({pageNum, pageSize, moduleId: props.moduleId})
      if (res.data.Status === 1) {
        setCards(res.data.Ret)
        setTotal(res.data.Total)
      }
    } else if (props.data) {
      setCards(props.data)
    }
  }
  const onChange = (page:number, pageSize:number) => {
    setPageNum(page)
    setPageSize(pageSize)
    fetchCard()
  }
  const onClick = (data:CardType) => {
    if (data.linkUrl) {
      navigateTo({url: data.linkUrl, target: data.openWith})
      return
    }
  }

  const renderCards = (cards:CardType[]) => {
    return cards.map(item => {
      return <Col span={span} className={cx(["app-card", item.coverPicUrl ? 'is-image' : 'is-icon', item.linkUrl ? 'link' : ''])} key={item.id}>
        <div onClick={() => onClick(item)} className='app-card__content'>
          <div className='app-card__cover'>
            <Image fill className='fit_image' sizes='50vw' alt='' loader={imgLoader} src={item.coverPicUrl || item.picUrl} />
          </div>
          <div className='app-card__footer'>
            <h3 className='app-card__title over-hide'>{item.title}</h3>
            <p className='app-card__subtitle'>{item.subtitle}</p>
            {item.linkUrl ? (<i style={{ color: token.colorPrimary }} className='iconfont icon-gengduo1 right-arrow'></i>) : ''}
          </div>
        </div>
      </Col>
    })
  }
  return (
    <>
      <Row gutter={16}>
        {cards.length ? renderCards(cards) : <AppEmpty />}
      </Row>
      {props.page ? (<div className='app-pagination'>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={pageNum}
          showSizeChanger
          showQuickJumper
          onChange={onChange}
          showTotal={(total) => `共 ${total} 条`}
        />
      </div>):null}
    </>
  );
}

export default Card;