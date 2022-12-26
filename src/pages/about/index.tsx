import type { GetStaticProps, NextPage } from 'next'
import axios from 'axios'

interface Props {
  name: string
}

const About:NextPage = (props) => {
  const _props = props as Props
  return (
    <h2>hello {_props.name}</h2>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axios.get('http://localhost:3000/api/hello');
  return {
    props: {
      name: res.data.name,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1800 seconds
    revalidate: 1800,
  };
}


export default About