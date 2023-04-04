import request from "@/utils/request";

// 获取banner列表
export const getBanner = (data:Record<string, any>) => {
  return request({
    url: "/front/banner/list.zm",
    method: "post",
    data,
  });
};
// 记录点击banner
export const clickBanner = (data:Record<string, any>) => {
  return request({
    url: "/front/banner/click.zm",
    method: "post",
    data,
  });
};

// 获取文章列表
export const getArticle = (data:Record<string, any>) => {
  return request({
    url: "/front/article/list.zm",
    method: "post",
    data,
  });
};
// 文章详情
export const getArticleDetail = (data:Record<string, any>) => {
  return request({
    url: "/front/article/detail.zm",
    method: "post",
    data,
  });
};
// 记录点击文章
export const clickArticle = (data:Record<string, string>) => {
  return request({
    url: "/front/article/click.zm",
    method: "post",
    data,
  });
};

// 获取图集列表
export const getPicture = (data:Record<string, any>) => {
  return request({
    url: "/front/picture/list.zm",
    method: "post",
    data,
  });
};
// 记录点击图集
export const clickPicture = (data:Record<string, string>) => {
  return request({
    url: "/front/picture/click.zm",
    method: "post",
    data,
  });
};