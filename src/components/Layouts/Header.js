import React from 'react'
import {Layout } from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';
function Header(props) {
    return (
        <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: props.toggle,
            })}
        </Layout.Header>
    )
}
export default Header
