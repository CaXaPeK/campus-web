import {EditOutlined} from "@ant-design/icons";
import {Button, Form, Modal, Radio} from "antd";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import {useState} from "react";
import {axiosCourseStatusEdit} from "../../api/requests/courseStatusEditRequest.js";

// eslint-disable-next-line react/prop-types
const OpenCourseStatusEditModalButton = ({courseId, updates, setUpdates}) => {
    const [isEditCourseStatusModalOpen, setIsEditCourseStatusModalOpen] = useState(false);
    const [editCourseStatusForm] = Form.useForm();

    const showEditCourseStatusModal = () => {
        editCourseStatusForm.resetFields();
        setIsEditCourseStatusModalOpen(true);
    };

    const handleEditCourseStatusFinish = async (values) => {
        try {
            await axiosCourseStatusEdit(courseId, values.status);
            setUpdates(!updates);
            setIsEditCourseStatusModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditCourseStatusOk = () => {
        editCourseStatusForm.submit();
    };

    const handleCancel = () => {
        setIsEditCourseStatusModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showEditCourseStatusModal} style={{
                marginRight: '8px',
                marginBottom: '8px',
                background: 'orange'
            }}><EditOutlined/> ИЗМЕНИТЬ СТАТУС</Button>

            <Modal
                title='Изменение статуса курса'
                open={isEditCourseStatusModalOpen}
                onOk={handleEditCourseStatusOk}
                onCancel={handleCancel}
                okText='Сохранить'
            >
                <Form
                    form={editCourseStatusForm}
                    onFinish={handleEditCourseStatusFinish}
                    layout='vertical'
                >
                    <Form.Item
                        name='status'
                        rules={[
                            {required: true, message: ERROR_MESSAGES.SELECT_COURSE_STATUS},]}
                    >
                        <Radio.Group>
                            <Radio value="OpenForAssigning"> Открыт для записи </Radio>
                            <Radio value="Started"> В процессе </Radio>
                            <Radio value="Finished"> Закрыт </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default OpenCourseStatusEditModalButton