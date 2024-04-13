import CoursePreviewListItem from "../components/courses/coursePreviewListItem.jsx";
import {useParams} from "react-router";
import {Button, DatePicker, Form, Input, InputNumber, List, Modal, Radio, Select} from "antd";
import {useEffect, useState} from "react";
import {fetchGetApi} from "../api/fetchGetApi.js";
import {API_URLS} from "../constants/apiUrls.js";
import {getGroupName} from "../api/requests/getGroupName.js";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {ERROR_MESSAGES} from "../constants/errorMessages.js";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import dayjs from "dayjs";
import {DebounceSelect, fetchUserList} from "../components/courses/selectWithUserList.jsx";
import {axiosCoursePost} from "../api/requests/coursePostRequest.js";
import {ROUTES} from "../constants/routes.js";

const GroupPage = ({mode}) => {
    if (mode == 'my') {
        document.title = ROUTES.RUS_MY_COURSES;
    }
    else if (mode == 'teaching') {
        document.title = ROUTES.RUS_TEACHING_COURSES;
    }

    const { groupId } = useParams();
    const user = useSelector((state) => state.user);
    const [requirements, setRequirements] = useState('');
    const [annotations, setAnnotations] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const [updates, setUpdates] = useState(false);
    const [groupName, setGroupName] = useState("");

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createForm] = Form.useForm();

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

        }
        setIsCreateModalOpen(false);
    }

    const handleCreateOk = () => {
        createForm.submit();
    };

    const handleCancel = () => {
        setIsCreateModalOpen(false);
    };

    let listData = data.length > 0 ? data.map(group => ({
        data: group
    })) : [];

    useEffect(() => {
        const url = mode == 'public' ? API_URLS.GROUPS + '/' + groupId : mode == 'my' ? API_URLS.MY_COURSES : API_URLS.TEACHING_COURSES;
        fetchGetApi(url, setData, setLoading, setAuthorized, setError, [], true);
        if (mode == 'public') {
            getGroupName(groupId, setGroupName);
        }
    }, [updates])

    return (
        <>
            <List
                loading={loading}
                header={<h1 style={{alignContent: 'center'}}>{
                    mode == 'public' ? (groupName != "" ? `Группа «${groupName}»` : 'Группа') :
                    mode == 'my' ? "Мои курсы" : "Преподаваемые курсы"
                }</h1>}
                style={{width: '40%', minWidth: '450px', background: 'white', marginBottom: '16px'}}
                bordered
                dataSource={authorized ? listData : []}
                renderItem={(item, index) => (
                    <CoursePreviewListItem
                        name={item.data.name}
                        id={item.data.id}
                        startYear={item.data.startYear}
                        maximumStudentsCount={item.data.maximumStudentsCount}
                        remainingSlotsCount={item.data.remainingSlotsCount}
                        status={item.data.status}
                        semester={item.data.semester}
                    />
                )}
            />
            {user.isAdmin ? (
                <Button type='primary' onClick={showCreateModal}><PlusCircleOutlined /> СОЗДАТЬ КУРС</Button>
            ) : null}

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
    );
}

export default GroupPage