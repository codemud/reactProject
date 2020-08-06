import React, {Component} from 'react';
import {Button, message} from "antd";
import { getCode } from '../../apis/user'

export default class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer:null,
            userName:props.userName,
            btn_loading:false,
            btn_text:'获取验证码'
        }
    }

    // 父组件改变后的props更新的生命周期
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            userName:nextProps.userName
        })
    }

    //销毁生命周期方法  clear在组建中所有的setTimeout,setInterval  移除所有组建中的监听 removeEventListener
    componentWillUnmount(){
        clearInterval(this.state.timer);
    }

    getCode = () => {
        const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(this.state.userName === ""){
            // 输入不能为空
            return message.warning("请输入邮箱!");
        }else if(!reg.test(this.state.userName)){
            // 正则验证不通过，格式不对
            // return message.warning("验证不通过!");
            this.props.userNameFocus.current.focus();
            return false;
        }else{
            this.setState({
                btn_loading:true,
                btn_text:'发送中'
            });
            const params = {
                username:this.state.userName,
                module:'login'
            };
            getCode(params).then(res=>{
                if(res.resCode === 0){
                    this.countDown()
                }
            }).catch(error=>{
                this.setState({
                    btn_loading:false,
                    btn_text:'重新获取'
                });
            })
        }
    };

    countDown = () => {
        let timeCount = 60;
        this.setState({
            btn_loading:true,
            btn_text:`${timeCount}s`
        });
        this.state.timer = setInterval(()=>{
            timeCount--;
            if(timeCount <= 0){
                this.setState({
                    btn_loading:false,
                    btn_text:'获取验证码'
                });
                clearInterval(this.state.timer);
                return false;
            }
            this.setState({
                btn_loading:true,
                btn_text:`${timeCount}s`
            });
        },1000)
    };

    render() {
        return <Button type="primary" loading={ this.state.btn_loading } onClick={this.getCode} block className="login-form-button getCode">{ this.state.btn_text }</Button>
    }
}
