import request from "@/utils/request";

export const getProvinceList = (data:Record<string, string>) => {
  return request({
    url: "/front/place/provinceList.zm",
    method: "post",
    data,
  });
};

export const getCityList = (data:Record<string, string>) => {
    return request({
      url: "/front/place/cityList.zm",
      method: "post",
      data,
    });
  };

export const getCountyList = (data:Record<string, string>) => {
    return request({
        url: "/front/place/countyList.zm",
        method: "post",
        data,
    });
};
// /front/partnerApplyJoin/add.zm
// /front/noticeApply/add.zm
export const applyJoin = (data:Record<string, string>) => {
  return request({
    url: "/front/noticeApply/add.zm",
    method: "post",
    data,
  });
};
// 上传附件
export const upload = (data:Record<string, any>) => {
  return request({
      url: "/front/file/upload.zm",
      method: "post",
      data,
      /* isUpload: true,
      contentType: false,
      processData: false, */
      isUpload: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [function () { //在向服务器发送前，修改请求数据
        // 可以对 data 进行任意转换处理，这里直接return formData
        return data;
      }],
  });
}
// 下载申请表
export const attachTemplate = (data:Record<string, any>) => {
  return request({
    url: "/front/attachTemplate/list.zm",
    method: "post",
    data,
});
}
// 提交留言
export const sendMessage = (data:Record<string, string>) => {
  return request({
    url: "/front/message/add.zm",
    method: "post",
    data,
  });
};