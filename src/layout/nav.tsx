import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { useRouter } from "next/router";
import { csWebUrl } from '@/config';
import { findItem, navigateTo } from '@/utils'
import { useAppSelector } from '@/hook/useSelector'
import type { MenuProps } from 'antd';


const Nav: React.FC = () => {
  const router = useRouter();
  // 浏览器的宽度 默认设置为0；
  const [width, setWidth] = useState(0); 
  let timer:any = null;
  const resizeUpdate = (e:Event) => {
    //防抖语句
    if(timer !== null){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // 通过事件对象获取浏览器窗口的高度
      let w = (e.target as Window).innerWidth;
      setWidth(w);
    },500)
      
  };
  
  const [items, setItems] = useState<MenuProps['items']>([])
  const [current, setCurrent] = useState('');
  const [open, setOpen] = useState(false);
  const menuStore = useAppSelector((state) => {
    return { ...state.menu };
  });
  useEffect(() => {
    // 页面刚加载完成后获取浏览器窗口的大小
    let h = window.innerWidth;
    setWidth(h)
    // 页面变化时获取浏览器窗口的大小 
    window.addEventListener('resize', resizeUpdate);
    return () => {
        // 组件销毁时移除监听事件
        window.removeEventListener('resize', resizeUpdate);
    }
  }, []);

  useEffect(() => {
    setItems(menuStore.menus || [])
  }, [menuStore.menus])

  useEffect(() => {
    const { path } = router.query
    if (path) {
      if (typeof path === 'string') {
        setCurrent(path)
      } else {
        setCurrent(path[0])
      }
    }
  }, [router.asPath, router.query])

  // 菜单点击事件
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    onClose()
    findItem(menuStore.treeArr, e.key, (item) => {
      // 外链
      if (item.linkurl) {
        navigateTo({ url: item.linkurl, target: item.openwith })
        return
      }
      if (item.label === '首页') {
        router.push('/')
      } else {
        if (item.type === '1' && item.layout === '5') {
          // 单页模型
          router.push(`/banner/${item.key}?id=${item.id}`)
        } else if (item.type === '2') {
          // 单页模型
          router.push(`/single/${item.key}?id=${item.id}`)
        } else if (item.type === '3') {
          // 文章模型
          router.push(`/article/${item.key}?id=${item.id}`)
        } else if (item.type === '4') {
          // 卡片模型
          router.push(`/card/${item.key}?id=${item.id}`)
        } else if (item.type === '5') {
          // 留言模型
          router.push(`/about/${e.key}`)
        } else {
          router.push(`/other/${e.key}?id=${item.id}`)
        }
      }
    })
  };
  // 打开侧滑导航
  const showDrawer = () => {
    setOpen(true);
  };
  // 关闭侧滑导航
  const onClose = () => {
    setOpen(false);
  };
  // 跳转财税产业互联网
  const toPage = () => {
    navigateTo({url: csWebUrl, target: '2'})
  }
  // 渲染PC导航
  const renderPcNav = () => {
    return (<>
      <Menu style={{maxWidth: 'calc(100% - 310px)'}} key={width} className='nav show-only-on-pc' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Button className='show-only-on-pc' type="primary" onClick={toPage}>登录财税产业互联网</Button>
      </>)
  }
  // 渲染移动端导航
  const renderMobile = () => {
    return (<>
      <Button className='show-only-on-mobile' type="text" icon={<MenuOutlined />} onClick={showDrawer} />
      <Drawer
        title="导航"
        placement="left"
        open={open}
        closable={false}
        onClose={onClose}
        className='show-only-on-mobile'
        extra={<Button type="text" icon={<CloseOutlined />} onClick={onClose} />}
      >
        <Menu className='nav' onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
        <div style={{paddingLeft: 28, paddingTop: 30}}>
          <Button className='show-only-on-pc' type="primary" onClick={toPage}>登录财税产业互联网</Button>
        </div>
      </Drawer>
    </>)
  }
  return (<>
    {width > 600 ? renderPcNav() : renderMobile() }
    </>)
};

export default Nav;