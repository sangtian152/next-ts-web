import { Breadcrumb } from 'antd';
import { useAppSelector } from '@/hook/useSelector'
import { getPath } from '@/utils'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
interface Props {
  title?: string;
  subtitle?: string;
  image?:string;
}
const PageHeader:React.FC<Props> = (props) => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<ItemType[]>([])
  const menuStore = useAppSelector((state) => {
    return {
      ...state.menu,
    };
  });
  useEffect(() => {
    const paths = getPath(menuStore.treeArr, router.query?.path as string || '')
    const items = paths.map(item => ({title: item}))
    setBreadcrumbs([{title: '首页'}].concat(items))
  }, [router.asPath])
  return (
    <>
      <div className='app-top' style={{backgroundImage: `url(${props.image || '/top-bg.png'})`}}>
        <div className='app-top__main'>
          <h4 className='app-top__title'>{props.title}</h4>
          <p className='app-top__subtitle'>{props.subtitle}</p>
        </div>
      </div>
      <div className='app-breadcrumb'>
        <Breadcrumb className='breadcrumb pg_width' items={breadcrumbs} separator=">" />
      </div>
    </>
  )
}

export default PageHeader
