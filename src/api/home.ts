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
