import React, {useEffect} from 'react';
import {Form, Row, Col, Input} from 'antd';
import TextAreaInput from '../../../../components/form/type/TextAreaInput.js';
// import UpLoad from '../../../../components/form/type/UpLoad.js';
import SelectInput from "../../../../components/form/type/SelectInput";
import DateInput from "../../../../components/form/type/DateInput";

function AddForm (props) {
    const { form,data } = props;

    useEffect(()=>{
        form.setFieldsValue(data)
    },[data,form]);

    const fromData = [
        {span:'24',name:'name',type:'text',label:'部门名称',rules:[{required: true, message: '请输入部门名称!'}],placeholder:'请输入部门名称'},
        // {span:'24',name:'icon',type:'upload',label:'动态图标',rules:[],defaultValue:data['icon'],done:(data)=>{
        //         form.setFieldsValue({icon:data});
        //     }
        // },
        {span:'24',name:'content',type:'textarea',label:'介绍',maxLength:100,rules:[{required: true, message: '请输入介绍!'},{type:'string',max:100,message: '长度不能超过100个字!'}],placeholder:'请输入动态简介'},
    ];
    const outPut = (param) => {
        switch (param.type) {
            case 'text':
                return <Input placeholder={param.placeholder}/>;
            case 'select':
                return SelectInput(param);
            case 'date':
                return DateInput(param);
            case 'textarea':
                return TextAreaInput(param);
            // case 'upload':
            //     return UpLoad(param);
            default :
                return <div />
        }
    };
    const getFields = () => {
        return fromData.map((item, key) =>
            <Row key={key}>
                <Col span={item.span}>
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        labelCol={{span:3}}
                    >
                        {outPut(item)}
                    </Form.Item>
                </Col>
            </Row>
        )
    };

    return (
        <Form
            form={form}
            layout="horizontal"
            name="form_in_modal"
            autoComplete="off"
            initialValues={data}
        >
            {getFields()}
        </Form>
    );
}
export default AddForm;
