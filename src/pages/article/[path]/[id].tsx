import cx from 'classnames'
import { NextPage } from "next";
import { Button } from 'antd';
import RichTxt from '@/components/RichTxt';
import ApplyForm from '@/components/ApplyForm'
import ArticleAside from '@/components/ArticleAside';
import { wrapper } from '@/store'
import styles from '@/styles/article.module.scss'
import { getArticleDetail } from '@/api/content';
import { createRef, useEffect } from 'react';
import type { ArticleType, ModelInstance } from '@/utils/types'

interface ViewProps {
  id:string;
  data: ArticleType;
}

const fetchDetail = async (id: string) => {
  if (!id) return {}
  const { data } = await getArticleDetail({id: id })
  if (data.Status === 1) {
    return data.Ret
  }
  return {}
}

const ViewArticle:NextPage<ViewProps> = (props) => {
  const formRef = createRef<ModelInstance>()
  const { data } = props;
  /* useEffect(() => {
    getArticleDetail({id: props.id as string})
  }, []) */
  const onApply = () => {
    formRef.current && formRef.current.showModal()
  }
  return (
    <div style={{background: '#fff'}}>
      <div className={cx(['pg_width', styles.page])}>
        {/* <ArticleAside data={[data, data]} /> */}
        <div className={styles.main}>
          <div className={styles.header}>
            <div className="b_with_line">
              <h2 className={styles.title}>{data.title}</h2>
              <p className={styles.subtitle}>{data.subtitle}</p>
            </div>
            <div className={cx([styles.header__right, "text_right"])}>
              <p>浏览量：{data.count}</p>
              <p>发布日期：{data.publishDate}</p>
            </div>
          </div>
          {data.contentForPc ?<RichTxt content={data.contentForPc} /> : null}
          {data.canApply ? (<div className={styles.apply}>
            <Button style={{width: 130}} type="primary" ghost onClick={onApply}>我要申请</Button>
          </div>) : null}
        </div>
        {data.canApply ? <ApplyForm ref={formRef} id={data.id} data={data} fields={data.cols} /> : null}
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const article = await fetchDetail(ctx.params?.id as string)
  return {
    props: {
      id: ctx.params?.id,
      data: {...article}
    }
  }
});

export default ViewArticle