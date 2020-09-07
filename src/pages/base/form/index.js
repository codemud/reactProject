import React, {useEffect, useState} from 'react';
import { Button,Switch,message,Form } from 'antd'
import { departmentList,setDeptState,addDept } from '../../../apis/deptList'
import AdvancedSearchForm from "../../../components/form";
import TableComponent from '../../../components/table'
import ModalComponent from '../../../components/modal'
import AddForm from "./components";

function FormIndex() {
    const [formData, setFormData] = useState({
        pageSize:10,
        pageNumber:1
    });
    const [listData,setListData] = useState({
        list:[],
        loading:false
    });
    const [visible,setVisible] = useState(false);
    const [ addForm ] = Form.useForm();

    const fromSearchData = [
        {span:'6',type:'text',name:'name',label:'部门名称',rules:[],placeholder:'请输入姓名',},
        {span:'6',type:'select',name:'status',label:'用户状态', optionData:[{label:'全部',value:''},{label:'开启',value:'1'},{label:'不开启',value:'2'}], rules:[],placeholder:'请选择状态',},
        {span:'6',type:'date',name:'start_date',label:'开始时间',format:'YYYY-MM-DD HH:mm:ss',rules:[],placeholder:'请选择开始时间',},
        {span:'6',type:'date',name:'end_date',label:'结束时间',format:'YYYY-MM-DD HH:mm:ss',rules:[],placeholder:'请选择结束时间',},
    ];
    const formFinish = values => {
        setFormData(Object.assign({},formData,values));
    };
    useEffect(()=>{
        setListData({list:[],loading:true});
        departmentList(formData).then(res=>{
            if(res.resCode === 0){
                setListData({list:res.data.data,loading:false})
            }
        })
    },[formData]);
    const openDetailModal = ()=>{

    };
    const openDeleteModal = ()=>{

    };
    const addModalProps = {
        visible:visible,
        modalOptions : {
            title:'新增',
            okText:'保存',
            cancelText:'取消',
            width:800,
            bodyStyle:{height:600}
        },
        children: <AddForm form={addForm} data={{}}/>,
        onCreate:()=>{
            addForm.validateFields().then(values => {
                // addForm.resetFields();
                addDept(values).then((res)=>{
                    if(res.resCode === 0){
                        message.success('新增成功！');
                        setVisible(false);
                        setFormData(Object.assign({},formData));
                    }
                }).catch((err)=>{
                    console.log(err)
                });
            })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        },
        onCancel:()=>{addForm.resetFields();setVisible(false);}
    };
    const tableTopBtn = ()=>{
        return <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={()=>{setVisible(true)}}>新增</Button>
        </div>
    };
    const columns = [
        {
            title: '功能列', key: 'id', fixed: 'left', width: 150, align: 'center',
            render: (value) => (
                <div>
                    <Button type="primary" className="marginR_10" onClick={()=>openDetailModal(value)}>查看</Button>
                    <Button type="text" danger onClick={()=>openDeleteModal(value)}>删除</Button>
                </div>
            ),
        },
        {title: '姓名', dataIndex: 'name',align: 'center',},
        {title: '人数', dataIndex: 'number',align: 'center',},
        {
            title: '状态', dataIndex: 'status', align: 'center',
            render: (record,event) => {
                return <Switch checked={event.status} onChange={(val) => {
                    listData.list.forEach(item => {
                        if(item.id === event.id){
                            item.state = !record
                        }
                    });
                    setListData(Object.assign({},listData));
                    setDeptState({id:event.id,status:!record}).then(res=>{
                        message.success('当前状态修改成功！')
                    },err=>{
                        message.error('当前状态修改失败！')
                    })
                }} />
            }
        },
        {title: '介绍', dataIndex: 'content',align: 'center',}
    ];
    return (
        <div>
            <AdvancedSearchForm fromData={fromSearchData} onFinishData={formFinish}/>
            <TableComponent columns={columns} data={listData['list']} loadData={listData['loading']} children={tableTopBtn()} rowkey="id"/>
            <ModalComponent {...addModalProps}/>
        </div>
    )
}
export default FormIndex
