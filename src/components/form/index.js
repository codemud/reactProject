import React from 'react';
import {Button, Card, Col, Form, Input, Row} from 'antd';
import 'moment/locale/zh-cn';
import SelectInput from "./type/SelectInput";
import DateInput from './type/DateInput'
function AdvancedSearchForm (props) {
    const [form] = Form.useForm();
    const { fromData, onFinishData } = props;
    let dateList = [];
    const onFinish = fieldsValue => {
        dateList.length && dateList.forEach((item) => {
            fieldsValue[item.name] = fieldsValue[item.name] && fieldsValue[item.name].format(item.format)
         });
        onFinishData(fieldsValue)
    };
    const onReset = ()=> {
        form.resetFields();
        let resetValue = {};
        fromData.forEach(item=>{
            resetValue[item.name] = undefined;
        });
        onFinishData(resetValue)
    };
    const outPut = (param) => {
        switch (param.type) {
            case 'text':
                return <Input placeholder={param.placeholder}/>;
            case 'select':
                return SelectInput(param);
            case 'date':
                setDate(param);
                return DateInput(param);
            default :
                return <div />
        }
    };
    const setDate = (param) => {
        dateList.push({name:param.name,format:param.format});
    };
    const getFields = ()=> {
        return fromData.map((item, key) =>
            <Col span={item.span} key={key}>
                <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={item.rules}
                >
                    {outPut(item)}
                </Form.Item>
            </Col>
        )
    };
    return (
        <Card className="card">
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                autoComplete="off"
                hideRequiredMark={true}
                onFinish={onFinish}
            >
                <Row gutter={24}>{getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                onReset()
                            }}
                        >
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}
export default AdvancedSearchForm
