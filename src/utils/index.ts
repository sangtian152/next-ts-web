import type { MenuProps } from "antd"
import type { ImageLoaderProps } from "next/image"
import type { TreeType, MyItemType, NavigateType } from './types'
import type { ItemType, SubMenuType } from "antd/es/menu/hooks/useItems"

// a链接下载
export const downloadFileUrl = (url:string, fileName?:string) => {
  const elink = document.createElement('a')
  const str = url.split('?')[0] || ''
  const _fileName = fileName ? fileName : str.split('/').pop() || ''
  elink.href = url
  elink.setAttribute('download', _fileName)
  elink.style.display = 'none'
  document.body.appendChild(elink)
  setTimeout(() => {
    elink.click()
    document.body.removeChild(elink)
  }, 66)
}

// 获取图片宽高
export const getImageDimensions = (url:string)  => {
  return new Promise((resolve,reject) => {
    try {
      if (!url) {
        resolve({width: 1, height: 1})
      }
      const img = new Image;
      img.onload = () => {
        const { width, height } = img;
        URL.revokeObjectURL(img.src);
        if (width && height) 
          resolve({ width, height });
        else 
          reject(new Error("Missing image dimensions"));
      };
      img.src=url;
    }
    catch(err) {
      resolve({ width: 1, height: 1 });
    }
  });
};

// 判读是否是链接
export const isUrl = (url:string) => {
  return url.includes('http://') || url.includes('https://')
}

export const getDomain = (url:string|undefined) => {
  if (!url) {
    return ''
  } else if(url?.includes('localhost')) {
    return 'test.yzsdata.com'
  } else {
    return url?.split('/')[2] || url?.split('/')[0]
  }
}

// next/image 解析 URL 的自定义函数
export const imgLoader = ({ src, width, quality }:ImageLoaderProps) => {
  if (src.includes('?')) {
    return `${src}&w=${width}&q=${quality || 75}`
  } else {
    return `${src}?w=${width}&q=${quality || 75}`
  }
}

// 生成随机字符串, e表示长度
export function randomString (e: number) {
  e = e || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

// 跳转链接
export const navigateTo = (nav:NavigateType) => {
  if (nav.url) {
    if (nav.target === '1') {
      location.href = nav.url
    } else {
      window.open(nav.url)
    }
    return
  }
}

export const tree2menu = (tree:TreeType[]):ItemType[] => {
  return tree.map(item => ({
    id: item.id,
    parentid: item.parentId,
    seodescr: item.seoDescr,
    seokeyword: item.seoKeyword,
    seotitle: item.seoTitle,
    // show: item.show,
    flat: item.flat ? '1' : '0',
    picurl: item.picUrl,
    singlepageid: item.singlePageId,
    subtitle: item.subtitle,
    title: item.title,
    type: item.type,
    label: item.name,
    name: item.name,
    layout: item.layout || null,
    key: item.name !== '首页' ? item.route || randomString(6) : '',
    children: item.children && !item.flat ? tree2menu(item.children) : null
  }))
}

// 树状数据改平铺
export const tree2arr = (tree:MenuProps['items'], res:MyItemType[] = []) => {
  (tree || []).forEach(item => {
    const children:MenuProps['items'] = []
    res.push({ ...item, children } as MyItemType);
    const it = item as SubMenuType
    if (it.children && it.children.length > 0) {
      tree2arr(it.children, res);
    }
  });
  return res;
};

// 根据末级id获取路径
export const getPath = (tree:MyItemType[], route:string|undefined) => {
  const _tree:MyItemType[] = tree || []
  const id = (_tree.find(item => item.key === route) || {}).id
  if (!id) return []
  const path:string[] = []
  function recursion (tree:MyItemType[], id:string|undefined, path:string[]) {
    for(let i = 0; i < tree.length; i++) {
      const item = tree[i]
      if (id === item?.id) {
        path.unshift(item.label as string)
        if (item.parentid) {
          recursion(tree, item.parentid, path)
        }
        break;
      }
    }
  }
  recursion(tree, id, path)
  return path
};

// 根据id获取某项
export const findItem = (treeArr:MyItemType[], route:string, callback: (a:MyItemType) => void) => {
  if(!treeArr) return
  for(let i = 0; i < treeArr.length; i++) {
    const item:MyItemType = treeArr[i]
    if (treeArr[i] && route === item?.key) {
      callback(item)
    }
  }
}
