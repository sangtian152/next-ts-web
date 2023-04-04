import { UploadOutlined, DownloadOutlined  } from '@ant-design/icons';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, message, Upload, Button } from 'antd';
import { Region } from './Region'
import { downloadFileUrl } from '@/utils'
import { applyJoin, upload, attachTemplate } from '@/api/other'
import type { UploadFile } from 'antd'
import { useAppSelector } from '@/hook/useSelector';

interface ModelProps {
  id:string;
  data:Record<string, any>;
  type?: string;
  fields?:Record<string, string>[];
}

const FormModal = forwardRef((props:ModelProps, ref) => {
  const appStore = useAppSelector((state) => {
    return {
      ...state.app,
    };
  });
  const [fileList, setFileList] = useState<UploadFile[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { fields, data, type, id } = props;
    
    useImperativeHandle(ref, () => ({
        // 暴露resetForm给父组件
        showModal,
    }));
    // 打开弹窗
    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };
    // 确定按钮
    const handleOk = () =>{
        form
          .validateFields()
          .then((values) => {
            doSave(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
    }
    // 保存
    const doSave = async (formData:any) => {
        const [provice, city, county] = formData.region
        const cols = (fields || []).map((item:Record<string, string>, index:number) => {
          return { name: item.name, value: formData[`field_${index}`] }
        })
        const payload = {
          provice,
          city,
          county,
          cols: JSON.stringify(cols),
          ...formData,
          articleId:id,
          region: undefined,
          attachs: fileList.length ? JSON.stringify(fileList.map(item => ({url: item.url}))) : ''
        }
        const res = await applyJoin(payload);
        if (res.data.Status) {
            message.success('保存成功');
            handleCancel();
        }
    }
    const onAttachTemplate = () => {
      attachTemplate({type: type}).then(res => {
          const { Status, Ret } = res.data
          if (Status === 1) {
              if (Ret.length) {
                  Ret.forEach((it:Record<string, string>) => {
                      downloadFileUrl(it.url)
                  })
              } else {
                  message.error('暂无申请表模板');
              }
          }
      })
  }
  // 上传附件
  const onUpload = ({file}:any) => {
      const formData = new FormData()
      formData.append('file', file)
      upload(formData).then((res) => {
          if (res.data.Status === 1) {
              setFileList([{
                  uid: file.uid,
                  name: file.name,
                  status: 'done',
                  url: res.data.Ret[0],
              }])
          }
      })
  }
  // 移除附件
  const onRemove = (file:UploadFile) => {
      const i = fileList.findIndex(item => item.uid === file.uid)
      fileList.splice(i, 1)
      setFileList(fileList.slice(0))
  }
    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    }
    const rules = {
        name: [{ required: true, message: '请填写姓名' }],
        phone: [{ required: true, message: '请填写电话' }],
        company: [{ required: true, message: '请填写公司名称' }],
        region: [{ required: true, message: '请填写区域' }],
    }
    return (
      <Modal title={"我要申请"} className="user-modal" closable={false} maskClosable={false} open={isModalVisible} okText="提交" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} labelCol={{ span: 4 }}>
          {data.needName ? <Form.Item name="name" label="姓名" rules={rules.name}>
              <Input />
          </Form.Item>: null}
          {data.needPhone ? <Form.Item name="phone" label="电话" rules={rules.phone}>
              <Input />
          </Form.Item>: null}
          {data.needCompanyName ? <Form.Item name="companyName" label="公司名称" rules={rules.company}>
              <Input />
          </Form.Item>: null}
          {data.needArea ? <Region rules={rules.region} />: null}
          <Form.Item name="content" label="申请内容">
            <Input.TextArea rows={4} />
          </Form.Item>
          {data.needAttach ? <Form.Item name="upload" label="附件">
            <>
              <Upload action="" fileList={fileList} customRequest={onUpload} onRemove={onRemove}>
                  <Button icon={<UploadOutlined />}>上传附件</Button>
              </Upload>
              {/* <Button style={{position: 'absolute', top: 0, right: 0}} type="link" onClick={onAttachTemplate} icon={<DownloadOutlined />}>下载申请表模板</Button> */}
            </>
          </Form.Item>: null}
          {(fields || []).map((item, index) => {
            return (
              <Form.Item key={index} name={`field_${index}`} label={item.name}>
                <Input />
              </Form.Item>
            )
          })}
        </Form>
      </Modal>
    )
})

FormModal.displayName = 'FormModal'
export default FormModal;