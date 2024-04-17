import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Checkbox, Form, Modal} from "antd";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import TextArea from "antd/es/input/TextArea.js";
import {useState} from "react";
import {axiosCourseNotificationCreate} from "../../api/requests/courseNotificationCreateRequest.js";

// eslint-disable-next-line react/prop-types
const OpenCourseNotificationCreateModalButton = ({courseId, updates, setUpdates}) => {
    const [isCreateNotificationModalOpen, setIsCreateNotificationModalOpen] = useState(false);
    const [createNotificationForm] = Form.useForm();

    const showCreateNotificationModal = () => {
        createNotificationForm.resetFields();
        setIsCreateNotificationModalOpen(true);
    };

    const handleCreateNotificationFinish = async (values) => {
        try {
            await axiosCourseNotificationCreate(courseId, values.text, values.isImportant);
            setUpdates(!updates);
            setIsCreateNotificationModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateNotificationOk = () => {
        createNotificationForm.submit();
    };

    const handleCancel = () => {
        setIsCreateNotificationModalOpen(false);
    };

    return (
        <>
            <Button onClick={showCreateNotificationModal} type='primary'><PlusCircleOutlined /> СОЗДАТЬ УВЕДОМЛЕНИЕ</Button>

            <Modal
                title="Создание уведомления"
                open={isCreateNotificationModalOpen}
                onOk={handleCreateNotificationOk}
                onCancel={handleCancel}
                okText='Создать'
            >
                <Form form={createNotificationForm} onFinish={handleCreateNotificationFinish}>
                    <Form.Item
                        name='text' rules={[
                        {required: true, message: ERROR_MESSAGES.ENTER_NOTIFICATION_TEXT},]}
                    >
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item
                        name='isImportant'
                        valuePropName='checked'
                    >
                        <Checkbox>Важное</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default OpenCourseNotificationCreateModalButton