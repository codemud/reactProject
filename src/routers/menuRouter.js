import React from 'react';
import {
    HomeOutlined, LaptopOutlined, CalendarOutlined, UsergroupAddOutlined,
    ContainerOutlined, LockOutlined, TeamOutlined, UserOutlined,
    IdcardOutlined, EnvironmentOutlined, BankOutlined, BranchesOutlined
} from '@ant-design/icons';
const menuList = [
    { key:'home',name: "首页", icon: <HomeOutlined />, route: "" },
    {
        key:'system',name: "系统管理", icon: <LaptopOutlined />, route: "system", sub: [
            { key:'system/user',name: '用户管理', icon: <LockOutlined />, route: "system/user" },
        ]
    },
    {
        key:'base',name: "基础信息", icon: <CalendarOutlined />, route: "base", sub: [
            { key:'base/form',name: '表单管理', icon: <EnvironmentOutlined />, route: "base/form" },
        ]
    }
];
export { menuList };
