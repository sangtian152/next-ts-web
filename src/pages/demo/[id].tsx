import type { NextPage } from 'next'
import {wrapper} from '@/store'

interface Props {
  id: string
}

const Demo:NextPage = (props) => {
  const _props = props as Props
  return (
    <div>公告id:{_props.id}</div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  return {
    props: {
      id: ctx.params?.id
    }
  }
});

export default Demo
