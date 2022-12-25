import type { NextPage } from 'next'

interface Props {
  title: string
}

const About:NextPage = (props) => {
  const _props = props as Props
  return (
    <div>{_props.title}</div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: 'about us',
    },
    revalidate: 1800,
  };
}

export default About