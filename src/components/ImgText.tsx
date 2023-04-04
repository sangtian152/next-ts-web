/**
 * 图文模型
 */
import type { ImageTxtType } from '@/utils/types';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
import { getBanner } from '@/api/content';
import AppEmpty from './AppEmpty';
import { useAppSelector } from '@/hook/useSelector';
const { Meta } = Card
interface ImgTextProps {
  moduleId?:string;
  num?: number;
  type:number;
  style?: React.CSSProperties;
  data?: ImageTxtType[];
}

const ImgText: React.FC<ImgTextProps> = (props) =>{
  const { type, moduleId } = props
  const direction = ['', 'l-r', 'r-l', 't-b', 'b-t'][type]
  const [images, setImages] = useState<ImageTxtType[]>([])
  useEffect(() => {
    fetchImages()
  }, [props.moduleId, props.data])
  // 请求数据
  const fetchImages = async () => {
    if (props.moduleId) {
      const res = await getBanner({ moduleId})
      if (res.data.Status === 1) {
        setImages(res.data.Ret)
      }
    } else if (props.data) {
      setImages(props.data)
    }
  }
  return (
    <>
        {images.length ? images.map(item => {
          const content = item.content.split('\n')
          return <Card
              key={item.id}
              className={cx(["app-sketch", direction])}
              cover={<img alt="图片加载失败" src={item.picForPcUrl} />}
            >
              <Meta title={item.title} description={item.subtitle} className="b_with_line1" />
              <div className='app-sketch__content'>
                {content.map((it, idx) => (<p key={idx}><i className='iconfont icon-mulu'></i> {it}</p>))}
              </div>
              {item.showButton ? <Button type="link">查看详情<ArrowRightOutlined /></Button> : ''}
            </Card>
        }) : <AppEmpty />}
    </>
  );
}

export default ImgText;