import PageHeader from '@/components/PageHeader';
import { wrapper } from '@/store'
import { findItem } from '@/utils'
import { updateSeo } from "@/store/slices/app";
import type { NextPage } from 'next'
import type { PageProps } from '@/utils/types';

interface DemoProps extends PageProps {
  title?: string;
}

const Demo:NextPage<DemoProps> = (props) => {
  return (
    <>
      <PageHeader title={props.pgTitle} subtitle={props.pgSubtitle} />
      {/* <p>公告id:{props.path}</p> */}
      <div>
        未定义的模板类型
      </div>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const { treeArr } = store.getState().menu
  let pgTitle = '', pgSubtitle = ''
  findItem(treeArr, ctx.params?.path as string, (item) => {
    pgTitle = (item.title || item.name) as string
    pgSubtitle = item.subtitle as string
    store.dispatch(updateSeo(item))
  })
  return {
    props: {
      path: ctx.params?.path,
      pgTitle: pgTitle,
      pgSubtitle: pgSubtitle || '',
    }
  }
});

export default Demo
