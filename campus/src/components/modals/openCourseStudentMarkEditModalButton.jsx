import {Form, Modal, Radio, Tag} from "antd";
import {markStatusColors, markStatusNames} from "../../constants/statusMetadata.js";
import {useState} from "react";
import {axiosCourseStudentMarkEdit} from "../../api/requests/courseStudentMarkEditRequest.js";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";

// eslint-disable-next-line react/prop-types
const OpenCourseStudentMarkEditModalButton = ({type, isAdmin, data, studentIndex, courseId, updates, setUpdates, result}) => {
    const userIsAdminOrTeacher = () => {
        return isAdmin ||
            // eslint-disable-next-line react/prop-types
            (Array.isArray(data.teachers) &&
                // eslint-disable-next-line react/prop-types
                data.teachers.find(teacher => teacher.email === localStorage.getItem('email')) !== undefined);
    }

    const [isEditMarkModalOpen, setIsEditMarkModalOpen] = useState(false);
    const [editMarkForm] = Form.useForm();

    const showEditMarkModal = () => {
        setIsEditMarkModalOpen(true);
    };

    const handleEditMarkFinish = async (values) => {
        try {
            // eslint-disable-next-line react/prop-types
            await axiosCourseStudentMarkEdit(courseId, data.students[studentIndex].id, type, values.mark);
            setUpdates(!updates);
            setIsEditMarkModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditMarkOk = () => {
        editMarkForm.submit();
    };

    const handleCancel = () => {
        setIsEditMarkModalOpen(false);
    };

    const markTitle = type === 'Midterm' ? "Промежуточная аттестация" : "Финальная аттестация";
    const markTitleShortGenitive = type === "Midterm" ? "промежуточной" : "финальной";

    return (
        <div>
            {userIsAdminOrTeacher() ? (
                <a onClick={showEditMarkModal}>
                    {markTitle}
                </a>
            ) : markTitle}
            <Tag style={{marginLeft: 8}} color={markStatusColors[result]}>{markStatusNames[result]}</Tag>

            <Modal
                title={"Изменение отметки для " + markTitleShortGenitive + " аттестации"}
                open={isEditMarkModalOpen}
                onOk={handleEditMarkOk}
                onCancel={handleCancel}
                okText='Сохранить'
            >
                {/* eslint-disable-next-line react/prop-types */}
                Студент: {data.students && studentIndex !== undefined && data.students[studentIndex] ? data.students[studentIndex].name : null}
                <Form
                    form={editMarkForm}
                    onFinish={handleEditMarkFinish}
                    layout='vertical'
                >
                    <Form.Item
                        name='mark'
                        rules={[
                            {required: true, message: ERROR_MESSAGES.SELECT_MARK_STATUS},]}
                    >
                        <Radio.Group>
                            <Radio value="Passed">Пройдена</Radio>
                            <Radio value="Failed">Провалена</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default OpenCourseStudentMarkEditModalButton