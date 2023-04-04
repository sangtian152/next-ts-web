import type { NextPage } from 'next'
import type { TreeType } from "@/utils/types";
import Module from '@/components/Module'
import Banner from '@/components/Banner'
import Card from '@/components/Card'
import ImgText from '@/components/ImgText'
import Article from '@/components/Article'
import RichTxt from '@/components/RichTxt';
import { wrapper } from '@/store'
import styles from '@/styles/Home.module.scss'
import About from '@/components/About';
// import { useEffect, useState } from 'react';
// import { useAppSelector } from '@/hook/useSelector';

interface HomeProps {
  modules: TreeType[];
}

const HomePage:NextPage<HomeProps> = (props) => {
  /* const [isMount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])
  if (!isMount) return null */
  const genContent = (ctx:TreeType) => {
    if (ctx.type === '1') {
      return ctx.layout === '5' ? 
      <Banner moduleId={ctx.id} /> :
      <ImgText num={3} type={1} moduleId={ctx.id} />
    } else if (ctx.type === '2') {
      return <RichTxt id={ctx.id} />
    } else if (ctx.type === '3') {
      return <Article moduleId={ctx.id} showHot={false} page={false} />
    } else if (ctx.type === '4') {
      const layout = Number(ctx.layout)
      return <Card layout={layout} moduleId={ctx.id} />
    } else if (ctx.type === '5') {
      return <About />
    }
  }
  return (
    <>
      <main className={styles.main}>
        {props.modules.map(item => {
          return (<Module title={item.type !== '1' ? item.name : ''} block={ item.type === '1' } key={item.id}>
            {genContent(item)}
          </Module>)
        })}
      </main>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  // const domain = getDomain(ctx.req?.headers.referer)
  // await store.dispatch(fetchAppInfo({domain:domain}))
  const { modules } = store.getState().menu
  console.log(modules, 61)
  return {
    props: {
      modules: modules[0]?.children || []
    }
  }
});

export default HomePage
