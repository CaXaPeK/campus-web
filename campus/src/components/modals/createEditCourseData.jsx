import {DatePicker, Form, Input, InputNumber, Modal, Radio} from "antd";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import {DebounceSelect, fetchUserList} from "../courses/selectWithUserList.jsx";
import {axiosCoursePost} from "../../api/requests/coursePostRequest.js";
import {useState} from "react";
import * as createForm from "react-dom/test-utils";

export const createEditCourseData = ({isEditModal, updates, setUpdates, entityId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleFinish = async (values) => {
        try {
            await axiosCoursePost(
                entityId,
                values.name,
                dayjs(values.startYear).year(),
                values.maximumStudentsCount,
                values.semester,
                values.requirements,
                values.annotations,
                values.mainTeacherId.value
            );
            setUpdates(!updates);
            setIsModalOpen(false);
        } catch (error) {

        }
        setIsModalOpen(false);
    }

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title='Создание курса'
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Создать'
        >
            <Form
                form={form}
                onFinish={handleFinish}
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
                        <Radio value="autumn"> Осенний </Radio>
                        <Radio value="spring"> Весенний </Radio>
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
                        { required: true, message: ERROR_MESSAGES.SELECT_SEMESTER },]}
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
    )
}