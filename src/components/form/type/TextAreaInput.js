import React, {useState,Fragment} from 'react';
import {Form, Input} from 'antd';

function TextAreaInput(props) {
    const { maxLength, textareavalue, placeholder,isResize } = props;
    const [ textValue, setTextAreaValue ] = useState(textareavalue);
    const suffixStyle = {
        userSelect:'none',
        color: '#909399',
        background: '#fff',
        position: 'absolute',
        fontSize: '12px',
        bottom: '5px',
        right: '25px'
    };
    const textareaResize = {
        resize:'none'
    };
    const onChange = e => {
        setTextAreaValue(e.target.value)
    };
    return (
        <Fragment>
            <Form.Item name={props.name} noStyle><Input.TextArea style={isResize?textareaResize:''} onChange={onChange} autoSize={{ minRows: 4, maxRows: 15 }} maxLength={maxLength} placeholder={placeholder} /></Form.Item>
            <span style={suffixStyle}>{(textValue && textValue.length) || 0}/{maxLength}</span>
        </Fragment>
    )
}
export default TextAreaInput
