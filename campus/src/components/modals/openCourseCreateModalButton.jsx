import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, InputNumber, Modal, Radio} from "antd";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import {DebounceSelect, fetchUserList} from "../courses/selectWithUserList.jsx";
import {useState} from "react";
import {axiosCoursePost} from "../../api/requests/coursePostRequest.js";

// eslint-disable-next-line react/prop-types
const OpenCourseCreateModalButton = ({groupId, updates, setUpdates}) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createForm] = Form.useForm();
    const [requirements, setRequirements] = useState('');
    const [annotations, setAnnotations] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');

    const showCreateModal = () => {
        createForm.resetFields();
        setIsCreateModalOpen(true);
    };

    const handleCreateFinish = async (values) => {
        try {
            await axiosCoursePost(
                groupId,
                values.name,
                dayjs(values.startYear).year(),
                values.maximumStudentsCount,
                values.semester,
                values.requirements,
                values.annotations,
                values.mainTeacherId.value
            );
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
            <Button type='primary' onClick={showCreateModal}><PlusCircleOutlined /> СОЗДАТЬ КУРС</Button>

            <Modal
                title='Создание курса'
                open={isCreateModalOpen}
                onOk={handleCreateOk}
                onCancel={handleCancel}
                okText='Создать'
            >
                <Form
                    form={createForm}
                    onFinish={handleCreateFinish}
                    layout='vertical'
                >
                    <Form.Item
                        name='name'
                        label='Название курса'
                        rules={[
                            { required: true, message: ERROR_MESSAGES.ENTER_COURSE_NAME },]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='startYear'
                        label='Год начала курса'
                        rules={[
                            { required: true, message: ERROR_MESSAGES.SELECT_START_YEAR },]}
                    >
                        <DatePicker
                            picker='year'
                            style={{ width: '100%' }}
                            minDate={dayjs('2000-01-01', 'YYYY-MM-DD')}
                            maxDate={dayjs('2029-12-31', 'YYYY-MM-DD')}
                        />
                    </Form.Item>

                    <Form.Item
                        name='maximumStudentsCount'
                        label='Общее количество мест'
                        rules={[
                            { required: true, message: ERROR_MESSAGES.ENTER_COURSE_CAPACITY },]}
                    >
                        <InputNumber min={1} max={200} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name='semester'
                        label='Семестр'
                        rules={[
                            { required: true, message: ERROR_MESSAGES.SELECT_SEMESTER },]}
                    >
                        <Radio.Group>
                            <Radio value="Autumn"> Осенний </Radio>
                            <Radio value="Spring"> Весенний </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name='requirements'
                        label='Требования'
                        rules={[
                            { required: true, message: ERROR_MESSAGES.ENTER_REQUIREMENTS },]}
                    >
                        <ReactQuill theme="snow" value={requirements} onChange={setRequirements} />
                    </Form.Item>

                    <Form.Item
                        name='annotations'
                        label='Аннотации'
                        rules={[
                            { required: true, message: ERROR_MESSAGES.ENTER_ANNOTATIONS },]}
                    >
                        <ReactQuill theme="snow" value={annotations} onChange={setAnnotations} />
                    </Form.Item>

                    <Form.Item
                        name='mainTeacherId'
                        label='Основной преподаватель курса'
                        rules={[
                            { required: true, message: ERROR_MESSAGES.SELECT_MAIN_TEACHER },]}
                    >
                        <DebounceSelect
                            value={selectedTeacher}
                            fetchOptions={fetchUserList}
                            onChange={(newValue) => {
                                setSelectedTeacher(newValue);
                            }}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default OpenCourseCreateModalButton;