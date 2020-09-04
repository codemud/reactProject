import React from 'react';
import { Table, Card } from 'antd';
import '../../assets/scss/admins/compontsStyle.scss'
function TableComponent (props) {
    const { columns, data, loadData, children, rowkey } = props;
    const pagination = {
        current: 1,
        pageSize: 20,
        total: 0,
        defaultCurrent:1,
        onChange: (page, pageSize) => {
            pagination.current = page
        }
    };
    return (
        <div className="WTable">
            <Card className="card">
                { children }
                <Table className="table marginT_20"
                       bordered
                       columns={columns}
                       dataSource={data}
                       loading={loadData}
                       size="middle"
                       tableLayout="fixed"
                       rowKey={rowkey}
                       scroll={{ x: 1500, y: 450 }}
                       pagination={pagination}
                />
            </Card>
        </div>
    );
}
export default TableComponent
