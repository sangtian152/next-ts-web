import type { ArticleType } from '@/utils/types'
import { Card, Pagination } from 'antd';
import Image from 'next/image'
import Hot from './Hot'
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import AppEmpty from '@/components/AppEmpty'
import { getArticle, clickArticle } from '@/api/content'
import { imgLoader } from '@/utils';
import { useAppSelector } from '@/hook/useSelector';
const { Meta } = Card;

interface ArticleProps {
  moduleId?:string;
  data?: ArticleType[];
  hots?: ArticleType[];
  className?:string;
  showHot?:boolean;
  page?: boolean;
  path?:string;
}

const Article: React.FC<ArticleProps> = (props) => {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  useEffect(() => {
    fetchArticle()
  }, [props.moduleId, props.data, pageNum, pageSize])
  // 查询文章列表
  const fetchArticle = async () => {
    if (props.moduleId) {
      const res = await getArticle({pageNum, pageSize, moduleId: props.moduleId})
      if (res.data.Status === 1) {
        setArticles(res.data.Ret)
        setTotal(res.data.Total)
      }
    } else if (props.data) {
      setArticles(props.data)
    }
  }
  
  const onChange = (page:number, pageSize:number) => {
    setPageNum(page)
    setPageSize(pageSize)
    // fetchArticle()
  }
  const onClick = (item:ArticleType) => {
    clickArticle({id: item.id})
    router.push(`/article/${props.path}/${item.id}`)
  }

  const renderArticles = (articles:ArticleType[]) => {
    return articles.map(item => {
      return <Card
        key={item.id}
        style={{padding: 20, marginBottom: 10}}
        bodyStyle={{padding: 0}}
        className="horizontal"
        onClick={() => onClick(item)}
        cover={<div className='app-article__cover p_relative'>
                <Image fill alt="" className='fit_image' sizes='30vw' loader={imgLoader} src={item.coverPicUrl || '/cover.png'} />
        </div>}>
        <Meta title={
          <>
            <span>{item.title}</span>
            {item.isTop ? <svg className="icon" aria-hidden="true"><use xlinkHref="#icon-toutiao"></use></svg> : null}
          </>
          } description={item.subtitle} />
        <div className='app-article__footer'>
          {/* <p>{item.title}</p> */}
          <p></p>
          <p>
            <span>浏览量：{item.count}</span>
            <span className='app-article__date'>发布日期：{item.publishDate}</span>
          </p>
        </div>
      </Card>
    })
  }
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}} className={props.className}>
      <div className='app-article'>
        {articles.length ? renderArticles(articles) : <AppEmpty />}
        {props.page && total > 0 ? (<div className='app-pagination'>
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
      </div>
      {props.showHot && props.hots?.length ? <Hot data={props.hots} />:null}
    </div>
  )
};

Article.defaultProps = {
  showHot: true,
  page: true
}

export default Article;