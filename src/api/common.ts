import request from "@/utils/request";

export const fetchAppInfo = async (data:Record<string, string>, callback: (arg0: Record<string, string>) => any) => {
  const res = await request({
    url: "/front/partner/findByDomain.zm",
    method: "post",
    data,
  });
  if (res.data.Status === 1) {
    return callback(res.data.Ret[0])
  }
}
