import type { NextPage } from 'next'
import {wrapper} from '@/store'
import { login } from '@/store/slices/auth'
const Demo:NextPage = () => {
  return (
    <div>Demo</div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  console.log(store.getState().auth.token, 11)
  return {
    props: {}
  }
});

export default Demo
