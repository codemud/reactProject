import React, {useEffect, useState} from 'react';
import {Button, message} from "antd";
import { getCode } from '../../apis/user'

function Code (props) {
    let timer = null;
    const [userName,setUserName] = useState();
    const [useModule] = useState(props.useModule);
    const [btn_loading,setBtn_loading] = useState(false);
    const [btn_text,setBtn_text] = useState('获取验证码');

    useEffect(()=>{
        setUserName(props.userName);
        return ()=>{
            timer && clearInterval(timer);
        }
    },[props.userName,timer]);


    const getCodes = () => {
        const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(userName === ""){
            // 输入不能为空
            return message.warning("请输入邮箱!");
        }else if(!reg.test(userName)){
            // 正则验证不通过，格式不对
            return message.warning("邮箱格式不正确,请检查!");
            // this.props.userNameFocus.current.focus();
            // return false;
        }else{
            setBtn_loading(true);
            setBtn_text('发送中');
            const params = {
                username:userName,
                module:useModule //登录：login，注册：register
            };
            getCode(params).then(res=>{
                if(res.resCode === 0){
                    countDown();
                    return message.success(res.message, 10)
                }
            }).catch(error=>{
                setBtn_loading(false);
                setBtn_text('重新获取');
            })
        }
    };

    const countDown = () => {
        let timeCount = 60;
        setBtn_loading(true);
        setBtn_text(`${timeCount}s`);
        timer = setInterval(()=>{
            timeCount--;
            if(timeCount <= 0){
                setBtn_loading(false);
                setBtn_text('获取验证码');
                clearInterval(timer);
                return false;
            }
            setBtn_loading(true);
            setBtn_text(`${timeCount}s`);
        },1000)
    };

    return <Button type="primary" loading={ btn_loading } onClick={getCodes} block className="login-form-button getCode">{ btn_text }</Button>

}
export default Code
