import React from 'react'
import {Layout,Menu } from "antd";
import {UserOutlined, VideoCameraOutlined, UploadOutlined,} from '@ant-design/icons';
function Menus(props) {
    return (
        <Layout.Sider trigger={null} width={256} collapsible collapsed={props.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
}
export default Menus
