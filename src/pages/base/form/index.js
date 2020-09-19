import React, {useEffect, useState} from 'react';
import { Button,Switch,message,Form } from 'antd'
import { departmentList,setDeptState,addDept,delDept,updateDept } from '../../../apis/deptList'
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
    const [delVisible,setDelVisible] = useState(false);
    const [detailVisible,setDetailVisible] = useState(false);
    const [delIds,setDelIds] = useState('');
    const [tableIndexData,setTableIndexData] = useState({});
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
    const openDetailModal = (value)=>{
        let obj = Object.assign({},value);
        obj.status = obj.status === '0';
        setTableIndexData(obj);
        setDetailVisible(true)
    };
    const openDeleteModal = (value)=>{
        let arr = value.id;
        setDelIds(arr);
        setDelVisible(true)
    };
    const addModalProps = {
        visible:visible,
        modalOptions : {
            title:'新增',
            okText:'保存',
            cancelText:'取消',
            width:700,
            bodyStyle:{height:400}
        },
        children: <AddForm form={addForm} data={tableIndexData}/>,
        onCreate:()=>{
            addForm.validateFields().then(values => {
                // addForm.resetFields();
                addDept(values).then((res)=>{
                    if(res.resCode === 0){
                        message.success('新增成功！');
                        addForm.resetFields();
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
    const delModalProps = {
        visible:delVisible,
        modalOptions : {
            title:'删除',
            okText:'确定',
            cancelText:'取消',
            width:400,
            bodyStyle:{height:100}
        },
        children: <p>是否确定删除?</p>,
        onCreate:()=>{
            addForm.validateFields().then(values => {
                // addForm.resetFields();
                delDept({id:delIds}).then((res)=>{
                    if(res.resCode === 0){
                        message.success('删除成功！');
                        setFormData(Object.assign({},formData));
                    }else {
                        message.success("删除失败!")
                    }
                    setDelVisible(false)
                }).catch((err)=>{
                    console.log(err)
                });
            })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        },
        onCancel:()=>{setDelVisible(false);}
    };
    const detailsModalProps = {
        visible:detailVisible,
        modalOptions : {
            title:'编辑',
            okText:'保存',
            cancelText:'取消',
            width:700,
            bodyStyle:{height:400}
        },
        children: <AddForm form={addForm} data={tableIndexData}/>,
        onCreate:()=>{
            addForm.validateFields().then(values => {
                // detailForm.resetFields();
                values.id = tableIndexData.id;
                updateDept(values).then((res)=>{
                    if(res.resCode === 0){
                        message.success('修改成功！');
                        addForm.resetFields();
                        setDetailVisible(false);
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
        onCancel:()=>{addForm.resetFields();setDetailVisible(false)}
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
                    <Button type="primary" className="marginR_10" onClick={()=>openDetailModal(value)}>编辑</Button>
                    <Button type="text" danger onClick={()=>openDeleteModal(value)}>删除</Button>
                </div>
            ),
        },
        {title: '姓名', dataIndex: 'name',align: 'center',},
        {title: '人数', dataIndex: 'number',align: 'center',},
        {
            title: '状态', dataIndex: 'status', align: 'center',
            render: (record,event) => {
                return <Switch checked={event.status === '0'} onChange={(val) => {
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
    ];
    return (
        <div>
            <AdvancedSearchForm fromData={fromSearchData} onFinishData={formFinish}/>
            <TableComponent columns={columns} data={listData['list']} loadData={listData['loading']} children={tableTopBtn()} rowkey="id"/>
            <ModalComponent {...addModalProps}/>
            <ModalComponent {...delModalProps}/>
            <ModalComponent {...detailsModalProps}/>
        </div>
    )
}
export default FormIndex
