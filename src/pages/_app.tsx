import '../styles/globals.scss'
import Layout from '@/layout'
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import { wrapper } from '@/store';
import { fetchAppInfo } from "@/store/slices/app";
import { fetchMenu } from "@/store/slices/menu";
import type { AppContext, AppProps } from 'next/app';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <StyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyleProvider>
    </Provider>
  )
}
App.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}: AppContext) => {
  let domain = ctx.req?.headers.host
  await store.dispatch(fetchAppInfo({domain:domain}))
  await store.dispatch(fetchMenu({domain: domain}))
  return {
    Component,
    pageProps: {}
  }
})
export default App
