import type { NextPage } from 'next'
import type { CardType, PageProps } from '@/utils/types'
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card'
import { wrapper } from '@/store'
import { findItem } from '@/utils'
import { getPicture } from '@/api/content'
import { updateSeo } from "@/store/slices/app";
import { useEffect } from 'react';

interface CardPageProps extends PageProps {
  layout: number;
  data:CardType[];
  title: string;
}

const fetchCard = async ( id: string, isServer = '0') => {
  if (!id) return ''
  const { data } = await getPicture({ isServer, moduleId: id })
  if (data.Status === 1) {
    return data.Ret
  }
  return []
}

const CardPage: NextPage<CardPageProps> = (props) => {
  /* useEffect(() => {
    fetchCard(props.id as string)
  }, []) */
  return (
    <>
      <PageHeader image={props.picUrl} title={props.pgTitle} subtitle={props.pgSubtitle} />
      <div className='app-main pg_width'>
        <Card layout={props.layout} data={(props.data || [])} />
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const { treeArr } = store.getState().menu
  let pgTitle = '', pgSubtitle = '', layout = 3, picUrl = '';
  const data = await fetchCard(ctx.query?.id as string, '1')
  findItem(treeArr, ctx.params?.path as string, (item) => {
    pgTitle = item.title || ''
    pgSubtitle = item.subtitle || ''
    picUrl = item.picurl
    layout = Number(item.layout)
    store.dispatch(updateSeo(item))
  })
  return {
    props: {
      layout:layout,
      data:data,
      id:ctx.query?.id,
      path: ctx.params?.path,
      picUrl: picUrl,
      pgTitle: pgTitle,
      pgSubtitle: pgSubtitle || '',
    }
  }
});

export default CardPage
