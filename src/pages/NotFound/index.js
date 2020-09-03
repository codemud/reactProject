import React from 'react';
import { Button, Result } from 'antd';

 function NotFound (){
    return (
        <Result
            status="404"
            title="404"
            subTitle="对不起, 此页面未找到."
            extra={
                <Button type="primary" onClick={() => this.props.history.push('/')}>
                    Back Home
                </Button>
            }
        />
    )
}
export default NotFound
