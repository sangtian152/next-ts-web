import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import { Button, Empty } from 'antd';
import { getNoticeList } from '@/api/notice';
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
                  <Link href={'/demo/' + item.id}>
                    <Button className="user-button orange" size={"small"} ghost>查看详情</Button>
                  </Link>
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