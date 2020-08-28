import React, {Component} from 'react';
import {Row, Col,} from 'antd';
import './index.scss'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType:'login'
        }
    }

    switchForm =  value => {
        this.setState({
            formType:value
        })
    };

    render() {
        return (
            <div className="login">
                <div className="container">
                    <Row className="rowStyle" align="middle">
                        <Col span={12}>
                            <div className="l_left">
                                <img src="assets/login_img.png" alt=""/>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="l_block">
                                {/*<h1 className="title">后台管理系统</h1>*/}
                                {this.state.formType === 'login'?<LoginForm switch={this.switchForm} />:<RegisterForm switch={this.switchForm} />}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
