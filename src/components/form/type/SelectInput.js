import React from 'react';
import { Select } from 'antd';
function SelectInput(props) {
    const { placeholder, optionData, isTags, isMultiple, maxTagCount, maxTagTextLength } = props;
    return  <Select placeholder={placeholder} maxTagCount={maxTagCount} maxTagTextLength={maxTagTextLength} mode={( isTags && 'tags') || (isMultiple && 'multiple') } filterOption={(input, option) =>
        optionData && option.children.indexOf(input) >= 0
    }  getPopupContainer={triggerNode => triggerNode.parentElement}>
        {
            optionData && optionData.map((item, key) =>
                <Select.Option value={item.value} key={key}>{item.label}</Select.Option>
            )
        }
    </Select>
}
export default SelectInput
