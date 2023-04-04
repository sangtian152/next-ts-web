import request from "@/utils/request";

export const getData = (data:Record<string, string>) => {
  return request({
    url: "/api/main/getLogos.zm",
    method: "post",
    data,
  });
};

export const getAppInfo = (data:Record<string, string>) => {
  return request({
    url: "/front/partner/findByDomain.zm",
    method: "post",
    data,
  });
}

export const getMenu = async (data:Record<string, string>) => {
  return request({
    url: "/front/module/tree.zm",
    method: "post",
    data,
  });
  /* if (res.data.Status === 1) {
    return callback(res.data.Ret[0])
  } */
}
