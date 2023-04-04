import type { NextPage } from 'next'
import type { ImageTxtType, PageProps } from '@/utils/types'
import PageHeader from '@/components/PageHeader';
import Banner from '@/components/Banner'
import { wrapper } from '@/store'
import { findItem } from '@/utils'
import { getBanner } from '@/api/content'
import { updateSeo } from "@/store/slices/app";

interface BannerPageProps extends PageProps {
  layout: number;
  data:ImageTxtType[];
  title: string;
}

const fetchBnner = async (id: string, isServer = '0') => {
  if (!id) return ''
  const { data } = await getBanner({isServer, moduleId: id })
  if (data.Status === 1) {
    return data.Ret
  }
  return []
}

const BannerPage: NextPage<BannerPageProps> = (props) => {
  return (
    <>
      <PageHeader image={props.picUrl} title={props.pgTitle} subtitle={props.pgSubtitle} />
      <div className='pg_width'>
        <Banner data={(props.data || [])} />
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const { treeArr } = store.getState().menu
  let pgTitle = '', pgSubtitle = '', layout = 3, picUrl = '';
  const data = await fetchBnner(ctx.query?.id as string, '1')
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

export default BannerPage
