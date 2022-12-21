import request from "@/utils/request";
// 获取消息通知列表
export const getNoticeList = (data:Record<string, string>) => {
  return request({
    url: "/front/notice/list.zm",
    method: "post",
    data,
  });
};
// 申请
export const noticeApply = (data:Record<string, string>) => {
  return request({
    url: "/front/noticeApply/add.zm",
    method: "post",
    data,
  });
};