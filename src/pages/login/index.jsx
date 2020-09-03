import React, { useState} from 'react';
import {Row, Col,} from 'antd';
import './index.scss'
import LoginForm from "./LoginForm";
import RegisterForm  from "./RegisterForm";
function Login () {
    const [formType,setFormType] = useState('login');

    const switchForm =  value => {
        setFormType(value);
    };

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
                            {formType === 'login'?<LoginForm switch={switchForm} />:<RegisterForm switch={switchForm} />}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )

}
export default Login
