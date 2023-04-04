import { NextPage } from "next";
import Title from '@/components/Title'
import PageHeader from '@/components/PageHeader';
import RichTxt from '@/components/RichTxt';
import { wrapper } from '@/store'
import { getArticle } from '@/api/content'
import { updateSeo, updateModule } from "@/store/slices/app";
import { useEffect, useState } from 'react';
import { findItem } from '@/utils';
import type { PageProps } from '@/utils/types'
interface SinglePageProps extends PageProps{
  content: string;
  title?: string;
  subtitle?: string;
}

const fetchArticle = async (id: string, isServer = '0') => {
  if (!id) return []
  const { data } = await getArticle({ moduleId: id, isServer:isServer })
  if (data.Status === 1) {
    return data.Ret
  }
  return []
}

const SinglePage: NextPage<SinglePageProps> = (props) => {
  return (
    <>
      <PageHeader image={props.picUrl} title={props.pgTitle} subtitle={props.pgSubtitle} />
      <div className='app-main pg_width'>
        <Title
          icon={<svg className="icon" aria-hidden="true"><use xlinkHref="#icon-tuijian"></use></svg>}
          size={'small'}
          title={props.title}
          subtitle={props.subtitle} />
        <RichTxt content={props.content} />
      </div>
    </>
    
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const res = await fetchArticle(ctx.query?.id as string, '1')
  const data = res[0] || {}
  store.dispatch(updateModule({moduleId: data.moduleId}))
  let pgTitle = '', pgSubtitle = '', picUrl = '';
  const { treeArr } = store.getState().menu
  findItem(treeArr, ctx.params?.path as string, (item) => {
    pgTitle = item.title || ''
    pgSubtitle = item.subtitle || ''
    picUrl = item.picurl
    store.dispatch(updateSeo(item))
  })
  return {
    props: {
      id: ctx.query?.id || '',
      content: data.contentForPc || '',
      title: data.title || '',
      subtitle: data.subtitle || '',
      picUrl: picUrl,
      pgTitle: pgTitle,
      pgSubtitle: pgSubtitle || ''
    }
  }
});

export default SinglePage