import Nav from './nav'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import zhCN from 'antd/locale/zh_CN';
import { Layout, ConfigProvider } from 'antd';
import { useAppSelector } from '@/hook/useSelector'
import { imgLoader } from '@/utils';
import { PropsWithChildren, useEffect, useState } from 'react'
const { Header, Footer, Content } = Layout;
const MyLayout: React.FC<PropsWithChildren> = ({children}) => {
  const [isMounted, setMounted] = useState(false)
  const appStore = useAppSelector((state) => {
    return {
      ...state.app,
    };
  });
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      <Head>
        <title>{appStore.seoTitle || appStore.title}</title>
        <meta content={appStore.seoKeyword} name="Keywords"></meta>
        <meta name="description" content={appStore.seoDescr} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0" />
      </Head>
      <ConfigProvider
         locale={zhCN}
        theme={{
          token: {
            borderRadius: 4,
            colorPrimary: '#126DFF',
          }
        }}
      >
        <Layout className='app-container'>
          <Header className='p_relative' style={{zIndex: 2}}>
            <div className='app-header pg_width'>
              <div className="app-logo c_pointer p_relative">
                <Link href={'/'} >
                  <Image className="fit_image" alt='' fill priority sizes="33vw" loader={imgLoader} style={{objectFit: "contain"}} src={appStore.logo} />
                </Link>
              </div>
              <Nav />
            </div>
          </Header>
          <Content className='app-page'>{children}</Content>
          <Footer>
            <div className='app-footer pg_width'>
              <p>{appStore.address}</p>
              <div>
                <span className="company-name">{appStore.companyName}</span>
                <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">{appStore.recordNo}</a>
              </div>
            </div>
          </Footer>
        </Layout>
      </ConfigProvider>
    </>
  )
}

export default MyLayout
