import React, {Component} from 'react';
import {Button, Col, Form, Input, message, Row} from "antd";
import {UserOutlined, LockOutlined, MobileOutlined, EyeTwoTone, EyeInvisibleOutlined} from '@ant-design/icons';
import Code from '../../components/code/index';
import Crypto from 'crypto-js'

import { register } from '../../apis/user';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        // 创建一个 ref 来存储 textInput 的 DOM 元素
        this.textInput = React.createRef();
        this.state = {
            userName:''
        }
    }

    formInputChange = (changedValues, allValues) => {
        this.setState({
            userName:changedValues.username
        })
    };

    onFinish = values => {
        console.log('Received values of form: ', values);
        let param = {
            username:values.username,
            password:Crypto.MD5(values.password).toString(),
            code:values.code,
        };
        register(param).then(res=>{
            if(res.resCode === 0){
                message.success(res.message, 10)
                this.gotoFrom()
            }
        });
    };

    onFinishFailed = ({values, errorFields, outOfDate })=> {
        if(!outOfDate){
            return message.error('请检查您输入的内容!')
        }
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
                <Form name="normal_login" size="large" className="login-form" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} onValuesChange={this.formInputChange}>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="username" rules={[{required: true, message: '请输入账户!'},{type:'email', message: '请输入正确邮箱!'},]}>
                                <Input allowClear ref={this.textInput} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入账户"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="password" rules={[{required: true, message: '请输入密码!'}]}>
                                {/*<Input allowClear prefix={<LockOutlined className="site-form-item-icon"/>} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} type="password" placeholder="请输入密码"/>*/}
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="请输入密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Form.Item name="password2" dependencies={['password']} rules={[
                                    {required: true, message: '请输入密码!'},
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('您输入的密码不匹配!');
                                        },
                                    }),
                                ]}>
                                {/*<Input allowClear prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="请再次输入密码"/>*/}
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="请再次输入密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={16}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Form.Item name="code" rules={[{required: true, message: '请输入验证码!'},{type: 'string', len:6, message: '请输入六位验证码!'}]}>
                                        <Input allowClear maxLength={6} prefix={<MobileOutlined className="site-form-item-icon"/>} placeholder="请输入验证码"/>
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Code userName={this.state.userName} userNameFocus={this.textInput} useModule={'register'}/>
                                    {/*<Button type="primary" className="login-form-button">获取验证码</Button>*/}
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
