import type { GetServerSideProps } from 'next'
import { Button, Empty } from 'antd';
import React from 'react'
import { getNoticeList } from '@/api/notice';
import cx from 'classnames'
import styles from "@/styles/notice.module.scss";
interface Props {
  noticeList: Array<Record<string, any>>
}
const Notice = (props:Props) => {
  return (
    <div className="page-container">
        {props.noticeList.length ? (<ul className={styles.notice_list}>
          {props.noticeList.map(item => {
            return (<li key={item.id} className={styles.notice_item}>
              <h4 className={styles.notice_title}>{item.title}</h4>
              <div className={styles.notice_content} dangerouslySetInnerHTML={{
                __html: item.content.length > 230 ? item.content.replace(/<[^>]+>/g,"") : item.content
              }}></div>
              <div className={styles.notice_footer}>
                <span className={styles.notice_date}>{item.publishDate}</span>
                <div>
                  <Button className="user-button orange" size={"small"} ghost>查看详情</Button>
                  {item.canApply ? <Button className={cx(['user-button', 'orange', styles.apply_btn])} size={"small"} ghost>我要申请</Button> : null}
                </div>
              </div>
            </li>)
          })}
      </ul>) : (<div className={cx([styles.course, styles.empty])}>
        <Empty className="course-empty" description="暂无数据" />
      </div>)}
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  console.log('context.req.headers.host ===>' + context.req.headers.cookie)
  const res = await getNoticeList({
    type: '1',
    keyword: '',
    pageNum: '',
    pageSize: ''
  });
  
  return {
    props: {
      noticeList: res.data.Ret,
    },
  };
}

export default Notice