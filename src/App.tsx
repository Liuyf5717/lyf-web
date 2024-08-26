import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios';
import {NavLink,useRoutes} from 'react-router-dom'
import routes from './routes'
import './App.css'

const App: React.FC = () => {

    const element = useRoutes(routes)


    const onFinish = (values: any) => {
        axios({
            method: 'GET',
            url: `http://localhost:3000/user?username=${values.username}&password=${values.password}`,
        }).then(respons => {
            respons.data.length === 0 ? alert("登录失败！账号或密码错误。") : alert("登录成功！");
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        if(errorInfo.values.username === '') alert('用户名不能为空');
        if(errorInfo.values.password === '') alert('密码不能为空');
    };

    return (
        <div>
            <h1>用户登录界面</h1>
            <Form
                style={{ width: '500px' ,margin: "auto"}}
                size={'large'}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入您的用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{marginLeft:'14px'}}
                    label='密码'
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" style={{marginLeft:80}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    style={{marginLeft:80}}
                >
                    <Button type="primary" htmlType="submit" style={{marginRight: 40}}>
                        登录
                    </Button>

                    <NavLink  to="/register">
                        <Button htmlType="button">
                            注册
                        </Button>
                    </NavLink>

                </Form.Item>

            </Form>
            {element}

        </div>
    );
};

export default App;