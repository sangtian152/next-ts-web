import cx from 'classnames'
import Image from 'next/image'
import { Button, Col, Form, Input, Row, message } from 'antd';
import { sendMessage } from '@/api/other'
import { useAppSelector } from '@/hook/useSelector';
import { imgLoader } from '@/utils';
import styles from '@/styles/about.module.scss'
import type { NextPage } from 'next'
const { TextArea } = Input

interface AboutProps {
  className?: string;
  title?:string;
  subtitle?:string;
}

const About:NextPage<AboutProps> = (props) => {
  const [formRef] = Form.useForm();
  const appStore = useAppSelector((state) => {
    return {
      ...state.app,
    };
  });
  const doClear = () => {
    formRef.resetFields()
  }
  const onFinish = async (values: any) => {
    const res = await sendMessage({...values})
    if (res.data.Status === 1) {
      message.success("提交成功");
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={cx([styles.page, props.className])}>
      <h2 className={cx([styles.header, 'b_with_line'])}>{props.title}</h2>
      <div className={styles.main}>
        <div className={styles.mine_info}>
          <h5 className={styles.mine_title}>{appStore.companyName}</h5>
          <p className={styles.mine_desc}>{props.subtitle || `感谢您来到${appStore.companyName},若您有合作意向，请您为我们留言或使用以下方式联系
我们，我们将尽快给你回复，并为您提供最真诚的服务，谢谢。`}</p>
          <ul className={styles.mine_ul}>
            <li><i className='iconfont icon-dizhi primary'></i> 地址：{appStore.address}</li>
            <li><i className='iconfont icon-dianhua primary'></i> 电话：{appStore.contact}</li>
            {/* <li><i className='iconfont icon-youxiang primary'></i> 邮箱：sxsdljzhyxh@163.com</li> */}
          </ul>
          <div className={styles.mine_code}>
            {appStore.xcxCode ? <div className={styles.code}>
                <div>
                    <Image alt='' loader={imgLoader} src={appStore.xcxCode} width={100} height={100} />
                </div>
                <p>小程序</p>
            </div> : ''}
            {appStore.gzhCode ? <div className={styles.code}>
                <div>
                    <Image alt='' loader={imgLoader} src={appStore.gzhCode} width={100} height={100} />
                </div>
                <p>公众号</p>
            </div> : ''}
        </div>
        </div>
        <Form
          name="basic"
          size="large"
          form={formRef}
          className={styles.form}
          wrapperCol={{ span: 24 }}
          style={{ width: 420 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=""
            name="username"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="姓名" />
          </Form.Item>
          <Form.Item
            label=""
            name="phone"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="电话" />
          </Form.Item>
          <Form.Item
            label=""
            name="email"
          >
            <Input placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            label=""
            name="content"
            rules={[{ required: true, message: '请输入留言内容' }]}
          >
            <TextArea rows={5} placeholder="留言内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Row gutter={15}>
              <Col span={12}>
                <Button block onClick={doClear}>清除</Button>
              </Col>
              <Col span={12}>
                <Button block type="primary" htmlType="submit">提交</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default About