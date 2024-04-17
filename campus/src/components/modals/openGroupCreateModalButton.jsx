import {Button, Form, Input, Modal} from "antd";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
import {axiosGroupPost} from "../../api/requests/groupPostRequest.js";

// eslint-disable-next-line react/prop-types
const OpenGroupCreateModalButton = ({updates, setUpdates}) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createForm] = Form.useForm();

    const showCreateModal = () => {
        createForm.setFieldValue('title', '');
        setIsCreateModalOpen(true);
    };

    const handleCreateFinish = async (values) => {
        try {
            await axiosGroupPost(values.title);
            setUpdates(!updates);
            setIsCreateModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateOk = () => {
        createForm.submit();
    };

    const handleCancel = () => {
        setIsCreateModalOpen(false);
    };

    return (
        <>
            <Button type='primary' onClick={showCreateModal}><PlusCircleOutlined /> СОЗДАТЬ ГРУППУ</Button>

            <Modal
                title="Введите название новой группы"
                open={isCreateModalOpen}
                onOk={handleCreateOk}
                onCancel={handleCancel}
                okText='Создать'
            >
                <Form form={createForm} onFinish={handleCreateFinish} >
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

export default OpenGroupCreateModalButton;