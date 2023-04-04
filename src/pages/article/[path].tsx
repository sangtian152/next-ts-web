import type { ArticleType, PageProps } from '@/utils/types'
import { NextPage } from "next";
import Article from '@/components/Article';
import { wrapper } from '@/store'
import { getArticle } from '@/api/content'
import { useEffect } from 'react';
import { findItem } from '@/utils';
import { updateSeo } from '@/store/slices/app';
import PageHeader from '@/components/PageHeader';

interface ArticlePageProps extends PageProps {
  articles:ArticleType[];
  hots:ArticleType[];
}

const fetchArticle = async ( id: string, isServer = '0') => {
  if (!id) return ''
  const { data } = await getArticle({ isServer, moduleId: id })
  if (data.Status === 1) {
    return data.Ret
  }
  return []
}
// 查询推荐文章列表
const fetchHotArticle = async (id: string, isServer = '0') => {
  if (!id) return ''
  const res = await getArticle({isServer, pageNum: 1, pageSize: 10, moduleId: id, isRecommend: 1})
  if (res.data.Status === 1) {
    return res.data.Ret
  }
  return []
}
const ArticlePage:NextPage<ArticlePageProps> = (props) => {
  useEffect(() => {
    fetchHotArticle(props.id)
  }, [props.id])
  
  return (
    <>
      <PageHeader image={props.picUrl} title={props.pgTitle} subtitle={props.pgSubtitle} />
      <div className='app-main pg_width'>
        <Article data={props.articles} hots={props.hots} path={props.path} />
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const { treeArr } = store.getState().menu
  let pgTitle = '', pgSubtitle = '', picUrl;
  const data = await fetchArticle(ctx.query?.id as string, '1')
  const hots = await fetchHotArticle(ctx.query?.id as string, '1')
  findItem(treeArr, ctx.params?.path as string, (item) => {
    pgTitle = item.title || ''
    pgSubtitle = item.subtitle || ''
    picUrl = item.picurl
    store.dispatch(updateSeo(item))
  })
  return {
    props: {
      articles: data,
      hots: hots,
      id:ctx.query?.id,
      path: ctx.params?.path,
      picUrl: picUrl,
      pgTitle: pgTitle,
      pgSubtitle: pgSubtitle || '',
    }
  }
});

export default ArticlePage