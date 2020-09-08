import React from 'react';
import { InputNumber } from 'antd';

function InputNumbers(props) {
    const {  placeholder} = props;

    return  <InputNumber placeholder={placeholder} style={{width:'100%'}}/>
}
export default InputNumbers
