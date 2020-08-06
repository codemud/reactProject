import React, {Component} from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {UserOutlined, LockOutlined, MobileOutlined} from '@ant-design/icons';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    gotoFrom = () => {
        this.props.switch('login')
    };

    render() {
        return (
            <div className="form-type">
                <Row justify="center" className="form-title">
                    <Col span={16}>
                        <Row justify="space-between" align="bottom">
                            <Col>
                                <h1 className="title">注册</h1>
                            </Col>
                            <Col>
                                <h3 className="title" onClick={this.gotoFrom}>登录</h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Form name="normal_login" size="large" className="login-form" initialValues={{remember: true}} onFinish={this.onFinish}>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="username" rules={[{required: true, message: '请输入账户!'}]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入账户"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="password" rules={[{required: true, message: '请输入密码!'}]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="请输入密码"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="password2" rules={[{required: true, message: '请输入密码!'}]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="请再次输入密码"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Row gutter={13}>
                                <Col span={16}>
                                    <Form.Item name="code" rules={[{required: true, message: '请输入验证码!'}]}>
                                        <Input prefix={<MobileOutlined className="site-form-item-icon"/>} placeholder="请输入验证码"/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" className="login-form-button">获取验证码</Button>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item>
                                <Button type="primary" block htmlType="submit" className="login-form-button">注册</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
