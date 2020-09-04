import React from 'react';
import { Modal } from 'antd';

function ModalComponent (props) {
    const { visible,modalOptions, onCancel, onCreate, children } = props;

    return (
        <Modal
            getContainer={false}
            visible={visible}
            maskClosable={modalOptions.isClosable || false}
            title={modalOptions.title}
            okText={modalOptions.okText}
            cancelText={modalOptions.cancelText}
            width={modalOptions.width || 400}
            bodyStyle={modalOptions.bodyStyle}
            destroyOnClose={true}
            onCancel={onCancel}
            onOk={() => {
                onCreate()
            }}
        >
            {children}
        </Modal>
    );
}
export default ModalComponent
