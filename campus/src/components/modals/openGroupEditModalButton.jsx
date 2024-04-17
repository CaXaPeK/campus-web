import {EditOutlined} from "@ant-design/icons";
import {Button, Form, Input, Modal} from "antd";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import {useEffect, useState} from "react";
import {axiosGroupPut} from "../../api/requests/groupPutRequest.js";

// eslint-disable-next-line react/prop-types
const OpenGroupEditModalButton = ({data, selectedGroupIndex, setSelectedGroupIndex, groupIndex}) => {
    const [editForm] = Form.useForm();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const showEditModal = (groupIndex) => {
        setSelectedGroupIndex(groupIndex);
        setIsEditModalOpen(true);
    };

    const handleEditFinish = (values) => {
        // eslint-disable-next-line react/prop-types
        if (axiosGroupPut(data[selectedGroupIndex].id, values.title)) {
            // eslint-disable-next-line react/prop-types
            data[selectedGroupIndex].name = values.title;
        }
        setIsEditModalOpen(false);
    }

    const handleEditOk = () => {
        editForm.submit();
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (data.length > 0) {
            editForm.setFieldsValue({
                // eslint-disable-next-line react/prop-types
                title: data[selectedGroupIndex].name
            });
        }
    }, [editForm, data, selectedGroupIndex]);

    return (
        <>
            <Button type="primary" onClick={() => showEditModal(groupIndex)} style={{marginRight: '8px', marginBottom: '8px', background: 'orange'}}><EditOutlined /></Button>

            <Modal
                title="Введите новое название группы"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleCancel}
                okText='Сохранить'
            >
                <Form form={editForm} onFinish={handleEditFinish} >
                    <Form.Item
                        name='title' rules={[
                        { required: true, message: ERROR_MESSAGES.ENTER_GROUP_NAME },]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default OpenGroupEditModalButton