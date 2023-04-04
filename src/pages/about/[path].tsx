import About from '@/components/About';
import { wrapper } from '@/store'
import { findItem } from '@/utils';
import { updateSeo } from '@/store/slices/app';
import type { NextPage } from 'next'
import type { PageProps } from '@/utils/types';

interface AboutPageProps extends PageProps {
  name: string;
}

const AboutPage:NextPage<AboutPageProps> = (props) => {
  return (
    <div style={{background: 'linear-gradient(209deg, #EEFAFD 0%, #FFFFFF 100%)'}}>
      <About className='pg_width' title={props.pgTitle} subtitle={props.pgSubtitle} />
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const { treeArr } = store.getState().menu
  let pgTitle = '', pgSubtitle = '', picUrl = '';
  findItem(treeArr, ctx.params?.path as string, (item) => {
    pgTitle = item.title || item.name
    pgSubtitle = item.subtitle || ''
    picUrl = item.picurl
    store.dispatch(updateSeo(item))
  })
  return {
    props: {
      pgTitle,
      pgSubtitle
    }
  }
});

export default AboutPage