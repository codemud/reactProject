import React from 'react';
import { Switch } from 'antd';

function Switchs(props) {
    const { defaultChecked,checkedChildren,unCheckedChildren } = props;

    return  <Switch checkedChildren={checkedChildren} unCheckedChildren={unCheckedChildren} defaultChecked={defaultChecked} />
}
export default Switchs
