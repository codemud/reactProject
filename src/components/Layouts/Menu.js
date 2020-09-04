import React, {useState} from 'react'
import {Layout,Menu } from "antd";
import { Link } from "react-router-dom"
import {menuList} from '../../routers/menuRouter'

function Menus(props) {
    const [openKeys,optionsSet] = useState([]);
    const tile = list => list.map(
        item =>
            item.sub && item.sub.length
            ? <Menu.SubMenu key={ item.key } icon={ item.icon } title={ item.name }>
                    {tile(item.sub)}
            </Menu.SubMenu>
            : <Menu.Item key={ item.key } icon={ item.icon }>
                    <Link to={ `/${item.route}` }>{ item.name }</Link>
            </Menu.Item>
    );
    // 设置选中
    const setActive = (item) => {
        optionsSet(item.keyPath)
    };
    const onOpenChange = openKeys => {
        if(openKeys.length === 1 || openKeys.length === 0){
            optionsSet(openKeys);
            return false;
        }
        const latestOpenKey = openKeys[openKeys.length - 1];
        if(latestOpenKey.includes(openKeys[0])){
            optionsSet(openKeys)
        }else {
            optionsSet(latestOpenKey ? [latestOpenKey] : [])
        }
    };
    return (
        <Layout.Sider trigger={null} width={256} collapsible collapsed={props.collapsed}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                onClick={ setActive }
                openKeys={openKeys}
                onOpenChange={ onOpenChange }
            >
                {tile(menuList)}
            </Menu>
        </Layout.Sider>
    )
}
export default Menus
