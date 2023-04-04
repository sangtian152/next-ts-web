/**
 * 轮播图
 */
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Carousel } from 'antd';
import { imgLoader } from '@/utils'
import { getBanner } from '@/api/content'
import type { ImageTxtType } from '@/utils/types';
import AppEmpty from './AppEmpty';
import { useAppSelector } from '@/hook/useSelector';
interface BannerProps {
  moduleId?: string;
  data?: ImageTxtType[];
}

const Banner: React.FC<BannerProps> = (props) => {
  console.log(props, 19)
  const [images, setImages] = useState<ImageTxtType[]>([])
  useEffect(() => {
    fetchBanner()
  }, [props.data, props.moduleId])
  const fetchBanner = async () => {
    const { moduleId, data } = props
    if (moduleId) {
      const res = await getBanner({moduleId: moduleId})
      if (res.data.Status === 1) {
        setImages(res.data.Ret)
      }
    } else {
      setImages(data as ImageTxtType[])
    }
  }
  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  const genImages = function (imgs:ImageTxtType[]) {
    return imgs.map(item => {
      return item.linkUrl ? (
        <div key={item.id} className='app-banner__image p_relative'>
          <a href={item.linkUrl}>
            <Image fill className='fit_image' alt='' loader={imgLoader} src={item.picForPcUrl} />
          </a>
        </div>
      ) : (
        <div key={item.id} className='app-banner__image p_relative'>
          <Image fill className='fit_image' alt='' loader={imgLoader} src={item.picForPcUrl} />
        </div>
      )
    })
  }

  return (
    <div className="app-banner">
      {images.length ? <Carousel autoplay={images.length > 1} style={{width: '100%'}} afterChange={onChange}>
        {genImages(images)}
      </Carousel> : <AppEmpty text='暂无轮播图' />}
    </div>
  );
};

export default Banner;
