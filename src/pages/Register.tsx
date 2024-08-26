import { Button, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        axios({
            method: 'POST',
            url: `http://localhost:3000/user`,
            data:{
                username: values.username,
                password: values.password
            }
        }).then(respons => {
            alert("注册成功");
            navigate(-1)
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        if(errorInfo.values.username === '') alert('用户名不能为空');
        if(errorInfo.values.password === '') alert('密码不能为空');
    };

    return (
        <Form
            style={{ width: '500px', margin: "auto"}}
            size={'large'}
            name="basic"

            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="新用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                style={{marginLeft:'28px'}}
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码！',
                    },
                    {
                        min: 5,
                        message: '密码长度不能小于5！',
                    }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请确认你的密码！',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次密码输入不一致！'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item style={{marginLeft:80}}>
                <Button type="primary" htmlType="submit" style={{marginRight: 40}}>
                    注册
                </Button>
                <Button onClick={() => navigate(-1)}>
                    收起
                </Button>
            </Form.Item>
        </Form>
    );
};
