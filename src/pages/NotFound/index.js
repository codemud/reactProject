import React, {Component} from 'react';
import { Button, Result } from 'antd';

export default class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
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
}
