import React from 'react';
import {DatePicker} from 'antd';
import locale from "antd/es/date-picker/locale/zh_CN";
function DateInput(props) {
    const { format, placeholder} = props;

    return  <DatePicker locale={locale} showTime format={format} placeholder={placeholder}/>
}
export default DateInput
