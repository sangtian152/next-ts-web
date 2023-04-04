import { Cascader, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { getProvinceList, getCityList, getCountyList } from '@/api/other'
import type { FormRule } from 'antd';
import type { RegionType } from '@/utils/types'
import { DefaultOptionType } from 'antd/es/cascader';

interface RegionProps {
  rules:FormRule[]
}

export const Region: React.FC<RegionProps> = (props) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    initProvinceList()
  }, [])
  /* 级联选择器-开始 */
  // 获取省数据
  const initProvinceList = async () => {
    const res = await getProvinceList({});
    if (res.data.Status) {
        const data = res.data.Ret.map((it: string) => {
            return {
                value: it,
                label: it,
                level: 1,
                isLeaf: false
            }
        })
        setOptions(data)
    }
  }
  // 获取市数据
  const initCityList = async (province:RegionType) => {
      const res = await getCityList({provinceName: province.value});
      if (res.data.Status) {
          province.children = res.data.Ret.map((it:string) => {
              return {
                  value: it,
                  label: it,
                  level: 2,
                  isLeaf: false
              }
          })
          setOptions([...options])
      }
  }
  // 获取区、县数据
  const initCountyList = async (selectedOptions:RegionType[]) => {
      const [province, city] = selectedOptions
      const res = await getCountyList({
          provinceName: province.value,
          cityName: city.value
      });
      if (res.data.Status) {
          city.children = res.data.Ret.map((it:string) => {
              return {
                  value: it,
                  label: it,
                  level: 3,
                  isLeaf: true
              }
          })
          setOptions([...options])
      }
  }
  // 级联数据加载
  const loadData = (selectedOptions:DefaultOptionType[]) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true; // load options lazily
      if (targetOption.level === 1) {
          initCityList(targetOption as RegionType);
      } else if (targetOption.level === 2) {
          initCountyList(selectedOptions as RegionType[]);
      }
  }
  // 级联选中
  const onChange = () => {}
  /* 级联选择器-结束 */
  return (
    <Form.Item name="region" label="区域" rules={props.rules}>
        <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />
    </Form.Item>)
}