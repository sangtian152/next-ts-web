import React from 'react';
import Image from 'next/image'
import { Card, List } from 'antd';
import type { ArticleType } from '@/utils/types'
import { imgLoader } from '@/utils';
const { Meta } = Card;
interface HotProps {
  data: ArticleType[];
  style?: React.CSSProperties;
}

const Hot: React.FC<HotProps> = (props) => {
  return (
    <>
      <List
        className='app-hot'
        style={props.style}
        header={<div className='app-hot__header'>
          <i className='iconfont icon-rementuijian primary'></i>
          <Image className='app-hot__title v-middle' alt="" src={'/hot-title.png'} width={66} height={15} />
        </div>}
        dataSource={props.data}
        renderItem={item => (
          <List.Item className='app-hot__item'>
            <Card
              bordered={false}
              bodyStyle={{padding: '0 8px'}}
              className="horizontal no-bg"
              cover={<div className='app-hot__cover p_relative'>
                <Image fill className='fit_image' sizes='30vw' alt="" loader={imgLoader} src={item.coverPicUrl || '/cover.png'} />
              </div>}
            >
              <Meta title={item.title} description={item.subtitle} />
              {/* <p>山西代理协会介绍</p> */}
            </Card>
          </List.Item>
        )}
      />
    </>
  )
};

export default Hot;