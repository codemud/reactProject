import React, {useState} from 'react'
import { Layout } from 'antd';
import { Switch, withRouter} from 'react-router-dom';
import Menus from './Menu'
import Header from './Header'

function Layouts(props) {
    console.log(props,'123');
    const [collapsed,setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    return <Layout>
        <Menus collapsed={collapsed}/>
        <Layout className="site-layout">
            <Header collapsed={collapsed} toggle={toggle}/>
            <Layout.Content
                className="site-layout-background"
                style={{
                    margin: '2%',
                    minHeight: 280
                }}
            >
                <Switch>
                    { props.routes }
                </Switch>
            </Layout.Content>
        </Layout>
    </Layout>
}
export default withRouter(Layouts);
