import React from 'react';
import { Empty } from 'antd';

interface EmptyProps {
  text?: string;
  image?: string;
}

const AppEmpty: React.FC<EmptyProps> = (props) => (
  <Empty
    className='app-empty'
    image={props.image}
    imageStyle={{ height: 60 }}
    description={
      <span>
        {props.text}
      </span>
    }
  >
  </Empty>
);

// props默认值
AppEmpty.defaultProps = {
  text: '暂无数据',
  image: 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
}

export default AppEmpty;