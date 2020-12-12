import { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Tooltip, Radio, Select, message } from 'antd'
import { useUserStore } from '@hooks/useStore'
import { API_GET_COLLEGE_LIST, API_GET_CLASS_LIST } from '@constant/urls'
import { get } from '@util/request'
import './index.less'

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

const tailLayout = {
    wrapperCol: {
        span: 24,
    },
};

function Register() {
    const userStore = useUserStore()
    const history = useHistory()
    const account = useRef(null)
    const [identityId, setIdentityId] = useState()
    const [collegeId, setCollegeId] = useState()
    const [collegeList, setCollegeList] = useState([])
    const [classList, setClassList] = useState([])

    const onFinish = async (values) => {
        const res = await userStore.register(values)
        if(res) history.push('/login')
    };

    const onFormLayoutChange = ({ identity, college}) => {
        if (identity) setIdentityId(identity)
        if (college) setCollegeId(college)
    }

    useEffect(()=>{
        const getData = async () => {
            const data = await get(API_GET_COLLEGE_LIST);
            setCollegeList(data.collegeList)
        }
        if(identityId !== 1) getData()
    }, [identityId])

    useEffect(() => {
        const getData = async () => {
            const params = {
                id: collegeId,
                year: parseInt(account.current.state.value.substr(0, 4))
            }
            const data = await get(API_GET_CLASS_LIST, params);
            setClassList(data.classList)
        }
        if (account.current.state.value) {
            getData()
        } else if(collegeId){
            message.error('请先输入学/工号')
        }
    }, [collegeId])

    return (
        <div className="register">
            {userStore.user && <Redirect to="/" />}
            <div className="register-box">
                <Link to="/">
                    <Tooltip placement="right" title="点击返回首页">
                        <h1 className="register-title">图书管理系统</h1>
                    </Tooltip>
                </Link>
                <Form 
                    {...layout} 
                    className="register-form" 
                    name="login" 
                    onFinish={onFinish}
                    onValuesChange={onFormLayoutChange}
                >
                    <Form.Item
                        label="账号"
                        name="id"
                        rules={[{ 
                            required: true, message: '学/工号不可为空!'
                        }, {
                            max: 20, message: '账号格式不合法, 最长20位!' 
                        }]}
                    >
                        <Input ref={account} placeholder="请输入学/工号" allowClear />
                    </Form.Item>
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{ 
                            required: true, message: '姓名不可为空!'
                        },{
                            max: 32, message: '姓名格式不合法, 最长32位!'
                        }]}
                    >
                        <Input placeholder="请输入姓名" allowClear />
                    </Form.Item>
                    <Form.Item
                        label="身份"
                        name="identity"
                        rules={[{ required: true, message: '请选择身份!' }]}
                    >
                        <Radio.Group value={identityId}>
                            <Radio value={1}>教职工</Radio>
                            <Radio value={2}>研究生</Radio>
                            <Radio value={3}>本科生</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="组织"
                        name="college"
                        rules={[{ required: true, message: '请选择组织!' }]}
                    >
                        <Select value={collegeId}>
                            {collegeList.map(item =>
                                <Select.Option value={item.id} key={`coll${item.id}`}>{item.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    {   identityId !== 1 &&
                        <Form.Item
                            label="班级"
                            name="class"
                            rules={[{ required: true, message: '请选择班级!' }]}
                        >
                            <Select>
                                {classList.map(item =>
                                    <Select.Option value={item.id} key={`cla${item.id}`}>{item.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                    }
                    <Form.Item
                        label="密码"
                        name="passwd"
                        rules={[{
                            required: true, message: '密码不可为空!'
                        }, {
                            min: 6, max: 32, message: '密码长度不合法, 要求6~32位!'
                        }, {
                            type: 'string', pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$/, message: '密码必需包含大小写字母和数字!'
                        }]}
                    >
                        <Input.Password placeholder="请输入密码" allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[{
                            type: 'string', pattern: /^1[3-9]\d{9}$/, message: '手机号格式不合法!'
                        }]}
                    >
                        <Input placeholder="请输入手机号" allowClear />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{
                            type: 'email', message: '邮箱格式不合法!'
                        }]}
                    >
                        <Input placeholder="请输入邮箱" allowClear />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" shape="round" className="register-btn" htmlType="submit">注 册</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )

}

export default observer(Register);