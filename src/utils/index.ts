export const downloadFileUrl = (url:string, fileName:string) => {
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

export const isUrl = (url:string) => {
  return url.includes('http://') || url.includes('https://')
}

// 其中gender为可选属性
interface ILoader {
  src: string,
  width: number,
  quality: number
}

export const imgLoader = ({ src, width, quality }:ILoader) => {
  if (src.includes('?')) {
    return `${src}&w=${width}&q=${quality || 75}`
  } else {
    return `${src}?w=${width}&q=${quality || 75}`
  }
}