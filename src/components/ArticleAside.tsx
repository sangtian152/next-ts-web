import { Timeline } from 'antd';
import { ArticleType } from '@/utils/types';

interface AsideProps {
  data: ArticleType[]
}

const ArticleAside: React.FC<AsideProps> = (props) => {
  return <Timeline className='dashed app-article__aside'>
    {props.data.map((item, idx) => (
      <Timeline.Item key={idx + item.id} dot={<svg className="icon" aria-hidden="true"><use xlinkHref="#icon-shezhi"></use></svg>}>
        <h3 className={'app-article__aside-title c_pointer'}>{item.title}</h3>
        <p className={'app-article__aside-subtitle'}>{item.subtitle}</p>
      </Timeline.Item>
    )
    )}
  </Timeline>
}

export default ArticleAside