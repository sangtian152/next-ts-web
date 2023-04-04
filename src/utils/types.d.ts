import { MenuItemType } from "antd/es/menu/hooks/useItems"

type LowerKey<T> = {
  [P in Lowercase<keyof Omit<T, 'children'>>]: string;
};
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 定义页面类型
export interface PageProps {
  id:string;
  path:string;
  picUrl:string;
  pgTitle?:string;
  pgSubtitle?:string;
}

// 定义Model弹窗组件实例类型
export interface ModelInstance<Values = any> {
  showModal: () => void;
}

// Image Loader
export interface ILoader {
  src: string;
  width: number;
  quality: number;
}

// navigateTo函数跳转参数类型
export interface NavigateType {
  url:string;
  target:string;  // 打开方式 1：当前窗口   2：新窗口
  type?:string;  // 链接类型 1：站内链接   2：外部链接
}

// 定义区域级联数据类型
export interface RegionType {
  value:string;
  label:string;
  level:number;
  isLeaf:boolean;
  loading?:boolean;
  children?: RegionType[]
}

// 定义文件数据类型
export interface MyFileType {
  uid: string|number,
  name: string,
  status: string,
  url: string
}

// 定义接口返回栏目数据类型
export interface TreeType {
  children: TreeType[];
  flat: number; // 展示方式   1：平铺下来   2：创建新页
  id: string;
  layout: string; // 模板
  linkUrl:string, // 链接
  linkType: string; // 链接类型 1：站内链接   2：外部链接
  name:string;
  openWith: string; // 打开方式 1：当前窗口   2：新窗口
  type: string; // 模型
  parentId: string;
  route?:string;
  subtitle:string
  title:string;
  singlePageId:string;
  seoTitle:string;
  seoDescr:string;
  seoKeyword:string;
  picUrl:string;
  show:boolean;
  flat:string;
}

// 定义导航菜单数据类型
export interface MyItemType extends MenuItemType, LowerKey<TreeType> {
  children:MyItemType[];
}
/* export interface MyItemType extends MenuItemType {
  id: string;
  name: string;
  parentid:string;
  type?:string;
  layout?: string;
  route?:string;
  subtitle?:string;
  picurl:string;
  seodescr:string,
  seokeyword:string,
  seotitle:string,
  linkurl:string, // 链接
  linktype: string; // 链接类型 1：站内链接   2：外部链接
  openwith: string; // 打开方式 1：当前窗口   2：新窗口
  flat:string;
  children?:MyItemType[];
} */

// 基础数据类型
interface baseType {
  id:string;
  title:string;
  subtitle:string;
  count: string|number;
  publishDate:string;
}
// 文章模型数据类型
export interface ArticleType extends baseType {
  isTop: boolean;
  canApply: boolean;
  cols:any[];
  coverPicUrl: string;
  contentForPc:string;
}

// 图文模型数据类型
export interface ImageTxtType extends baseType {
  picForPcUrl: string;
  content:string;
  linkUrl: string;
  openWith: string;
  showButton: boolean | string;
}

// 卡片模型数据类型
export interface CardType extends baseType {
  coverPicUrl: string;
  picUrl: string;
  contentForPc:string;
  linkUrl: string;
  openWith: string;
  showButton: boolean | string;
}

