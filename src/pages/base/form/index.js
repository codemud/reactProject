import React, {useState} from 'react';
import AdvancedSearchForm from "../../../components/form";

function Form() {
    const [formData, setFormData] = useState({
        limit:20,
        page:1
    });
    const fromSearchData = [
        {span:'6',type:'text',name:'mobile',label:'用户账户',rules:[],placeholder:'请输入账户',},
        {span:'6',type:'text',name:'name',label:'用户姓名',rules:[],placeholder:'请输入姓名',},
        {span:'6',type:'select',name:'state',label:'用户状态', optionData:[{label:'全部',value:''},{label:'开启',value:'1'},{label:'不开启',value:'2'}], rules:[],placeholder:'请选择状态',},
        {span:'6',type:'date',name:'start_date',label:'开始时间',format:'YYYY-MM-DD HH:mm:ss',rules:[],placeholder:'请选择开始时间',},
        {span:'6',type:'date',name:'end_date',label:'结束时间',format:'YYYY-MM-DD HH:mm:ss',rules:[],placeholder:'请选择结束时间',},
    ];

    const formFinish = values => {
        setFormData(Object.assign({},formData,values));
    };
    return (
        <div>
            <AdvancedSearchForm fromData={fromSearchData} onFinishData={formFinish}/>
        </div>
    )
}
export default Form
