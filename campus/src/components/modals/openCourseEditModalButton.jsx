import {EditOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, InputNumber, Modal, Radio} from "antd";
import {useEffect, useState} from "react";
import {axiosCourseEdit} from "../../api/requests/courseEditRequest.js";
import dayjs from "dayjs";
import {
    axiosCourseRequirementsAndAnnotationsEdit
} from "../../api/requests/courseEditRequirementsAndAnnotationsRequest.js";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import ReactQuill from "react-quill";

// eslint-disable-next-line react/prop-types
const OpenCourseEditModalButton = ({isAdmin, data, courseId, updates, setUpdates}) => {
    const [editCourseForm] = Form.useForm();
    const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);

    const [requirements, setRequirements] = useState('');
    const [annotations, setAnnotations] = useState('');

    const showEditCourseModal = () => {
        setIsEditCourseModalOpen(true);
    };

    const handleEditCourseFinish = async (values) => {
        try {
            if (isAdmin) {
                await axiosCourseEdit(
                    courseId,
                    values.name,
                    dayjs(values.startYear).year(),
                    values.maximumStudentsCount,
                    values.semester,
                    values.requirements,
                    values.annotations
                );
            }
            else {
                await axiosCourseRequirementsAndAnnotationsEdit(courseId, values.requirements, values.annotations);
            }
            setUpdates(!updates);
            setIsEditCourseModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditCourseOk = () => {
        editCourseForm.submit();
    };

    const handleCancel = () => {
        setIsEditCourseModalOpen(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (data.length !== []) {
            editCourseForm.setFieldsValue({
                // eslint-disable-next-line react/prop-types
                name: data.name,
                // eslint-disable-next-line react/prop-types
                startYear: dayjs().set('year', data.startYear),
                // eslint-disable-next-line react/prop-types
                maximumStudentsCount: data.maximumStudentsCount,
                // eslint-disable-next-line react/prop-types
                semester: data.semester,
                // eslint-disable-next-line react/prop-types
                requirements: data.requirements,
                // eslint-disable-next-line react/prop-types
                annotations: data.annotations
            });
        }
    }, [editCourseForm, data, updates]);

    return (
        <>
            <Button type="primary" onClick={showEditCourseModal} style={{
                background: 'orange',
                marginRight: 8,
                marginBottom: 8
            }}><EditOutlined/> ИЗМЕНИТЬ ДАННЫЕ</Button>

            <Modal
                title='Изменение данных курса'
                open={isEditCourseModalOpen}
                onOk={handleEditCourseOk}
                onCancel={handleCancel}
                okText='Сохранить'
            >
                <Form
                    form={editCourseForm}
                    onFinish={handleEditCourseFinish}
                    layout='vertical'
                >
                    {isAdmin ? (
                        <>
                            <Form.Item
                                name='name'
                                label='Название курса'
                                rules={[
                                    {required: true, message: ERROR_MESSAGES.ENTER_COURSE_NAME},]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name='startYear'
                                label='Год начала курса'
                                rules={[
                                    {required: true, message: ERROR_MESSAGES.SELECT_START_YEAR},]}
                            >
                                <DatePicker
                                    picker='year'
                                    style={{width: '100%'}}
                                    minDate={dayjs('2000-01-01', 'YYYY-MM-DD')}
                                    maxDate={dayjs('2029-12-31', 'YYYY-MM-DD')}
                                />
                            </Form.Item>

                            <Form.Item
                                name='maximumStudentsCount'
                                label='Общее количество мест'
                                rules={[
                                    {required: true, message: ERROR_MESSAGES.ENTER_COURSE_CAPACITY},
                                    () => ({
                                        validator(_, value) {
                                            if (!isAdmin) {
                                                return Promise.resolve();
                                            }
                                            // eslint-disable-next-line react/prop-types
                                            if (!value || value >= data.studentsEnrolledCount) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(ERROR_MESSAGES.CAPACITY_CANNOT_BE_LESS));
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber min={1} max={200} style={{width: '100%'}}/>
                            </Form.Item>

                            <Form.Item
                                name='semester'
                                label='Семестр'
                                rules={[
                                    {required: true, message: ERROR_MESSAGES.SELECT_SEMESTER},]}
                            >
                                <Radio.Group>
                                    <Radio value="Autumn"> Осенний </Radio>
                                    <Radio value="Spring"> Весенний </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </>
                    ) : null}

                    <Form.Item
                        name='requirements'
                        label='Требования'
                        rules={[
                            {required: true, message: ERROR_MESSAGES.ENTER_REQUIREMENTS},]}
                    >
                        <ReactQuill theme="snow" value={requirements} onChange={setRequirements}/>
                    </Form.Item>

                    <Form.Item
                        name='annotations'
                        label='Аннотации'
                        rules={[
                            {required: true, message: ERROR_MESSAGES.ENTER_ANNOTATIONS},]}
                    >
                        <ReactQuill theme="snow" value={annotations} onChange={setAnnotations}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default OpenCourseEditModalButton