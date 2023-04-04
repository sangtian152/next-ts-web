/**
 * 富文本
 */
import React, { useEffect, useState } from 'react';
import { getArticleDetail } from '@/api/content'
import { useAppSelector } from '@/hook/useSelector';
interface RichTxtProps {
  content?: string;
  id?: string;
  style?: React.CSSProperties;
}

const RichTxt: React.FC<RichTxtProps> = (props) =>{
  const [htmlStr, setHtmlStr] = useState('')
  useEffect(() => {
    fetchDetail()
  }, [props.id, props.content])
  const appStore = useAppSelector((state) => {
    return {
      ...state.app,
    };
  });
  const fetchDetail = async () => {
    const { content, id } = props
    if (content) {
      setHtmlStr(content)
    } else if (id) {
      const res = await getArticleDetail({id: id})
      if (res.data.Status === 1) {
        setHtmlStr(res.data.Ret)
      }
    }
  }
  return (
    <div className='rich-txt' dangerouslySetInnerHTML={{
      __html: htmlStr || ''
    }}></div>
  );
}

export default RichTxt;