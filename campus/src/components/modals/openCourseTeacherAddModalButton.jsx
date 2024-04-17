import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Form, Modal} from "antd";
import {useState} from "react";
import {axiosCourseTeacherAdd} from "../../api/requests/courseTeacherAddRequest.js";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import {DebounceSelect, fetchUserList} from "../courses/selectWithUserList.jsx";

// eslint-disable-next-line react/prop-types
const OpenCourseTeacherAddModalButton = ({courseId, updates, setUpdates}) => {
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
    const [addTeacherForm] = Form.useForm();

    const showAddTeacherModal = () => {
        setIsAddTeacherModalOpen(true);
    };

    const handleAddTeacherFinish = async (values) => {
        try {
            await axiosCourseTeacherAdd(courseId, values.teacherId.value);
            setUpdates(!updates);
            setIsAddTeacherModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddTeacherOk = () => {
        addTeacherForm.submit();
    };

    const handleCancel = () => {
        setIsAddTeacherModalOpen(false);
    };

    return (
        <>
            <Button onClick={showAddTeacherModal} type='primary'><PlusCircleOutlined /> ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ</Button>

            <Modal
                title="Добавление преподавателя на курс"
                open={isAddTeacherModalOpen}
                onOk={handleAddTeacherOk}
                onCancel={handleCancel}
                okText='Добавить'
            >
                <Form form={addTeacherForm} onFinish={handleAddTeacherFinish}>
                    <Form.Item
                        name='teacherId' rules={[
                        {required: true, message: ERROR_MESSAGES.SELECT_TEACHER},]}
                    >
                        <DebounceSelect
                            value={selectedTeacher}
                            fetchOptions={fetchUserList}
                            placeholder="Выберите пользователя"
                            onChange={(newValue) => {
                                setSelectedTeacher(newValue);
                            }}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default OpenCourseTeacherAddModalButton