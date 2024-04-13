import {
    Badge,
    Button,
    Card, Checkbox,
    DatePicker,
    Divider,
    Flex,
    Form,
    Input,
    InputNumber,
    List,
    Modal, Radio,
    Tabs,
    Tag
} from "antd";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {fetchGetApi} from "../api/fetchGetApi.js";
import {API_URLS} from "../constants/apiUrls.js";
import {useParams} from "react-router";
import {
    courseStatusColors,
    courseStatusNames, markStatusColors, markStatusNames,
    studentStatusColors,
    studentStatusNames
} from "../constants/statusMetadata.js";
import {ERROR_MESSAGES} from "../constants/errorMessages.js";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import {axiosCourseEdit} from "../api/requests/courseEditRequest.js";
import {axiosCourseDelete} from "../api/requests/courseDeleteRequest.js";
import {ROUTES} from "../constants/routes.js";
import {axiosCourseStatusEdit} from "../api/requests/courseStatusEditRequest.js";
import TextArea from "antd/es/input/TextArea.js";
import {axiosCourseNotificationCreate} from "../api/requests/courseNotificationCreateRequest.js";

const CoursePage = () => {
    const { courseId } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const [updates, setUpdates] = useState(false);

    const [requirements, setRequirements] = useState('');
    const [annotations, setAnnotations] = useState('');

    const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
    const [isEditCourseStatusModalOpen, setIsEditCourseStatusModalOpen] = useState(false);
    const [isCreateNotificationModalOpen, setIsCreateNotificationModalOpen] = useState(false);
    const [editCourseForm] = Form.useForm();
    const [editCourseStatusForm] = Form.useForm();
    const [createNotificationForm] = Form.useForm();

    let notificationListData = data.notifications != null ? data.notifications.map(notification => ({
        data: notification
    })) : [];

    let teacherListData = data.teachers != null ? data.teachers.map(teacher => ({
        data: teacher
    })) : [];

    let studentListData = data.students != null ? data.students.map(student => ({
        data: student
    })) : [];

    const showEditCourseModal = () => {
        setIsEditCourseModalOpen(true);
    };

    const showEditCourseStatusModal = () => {
        setIsEditCourseStatusModalOpen(true);
    };

    const showCreateNotificationModal = () => {
        setIsCreateNotificationModalOpen(true);
    };

    const handleEditCourseFinish = async (values) => {
        try {
            await axiosCourseEdit(
                courseId,
                values.name,
                dayjs(values.startYear).year(),
                values.maximumStudentsCount,
                values.semester,
                values.requirements,
                values.annotations
            );
            setUpdates(!updates);
            setIsEditCourseModalOpen(false);
        } catch (error) {

        }
        setIsEditCourseModalOpen(false);
    }

    const handleEditCourseStatusFinish = async (values) => {
        try {
            await axiosCourseStatusEdit(courseId, values.status);
            setUpdates(!updates);
            setIsEditCourseStatusModalOpen(false);
        } catch (error) {

        }
        setIsCreateNotificationModalOpen(false);
    }

    const handleCreateNotificationFinish = async (values) => {
        console.log(values.isImportant)
        try {
            await axiosCourseNotificationCreate(courseId, values.text, values.isImportant);
            setUpdates(!updates);
            setIsCreateNotificationModalOpen(false);
        } catch (error) {

        }
        setIsCreateNotificationModalOpen(false);
    }

    const handleEditCourseOk = () => {
        editCourseForm.submit();
    };

    const handleEditCourseStatusOk = () => {
        editCourseStatusForm.submit();
    };

    const handleCreateNotificationOk = () => {
        createNotificationForm.submit();
    };

    const handleCancel = () => {
        setIsEditCourseModalOpen(false);
        setIsEditCourseStatusModalOpen(false);
        setIsCreateNotificationModalOpen(false);
    };

    const deleteCourse = async () => {
        const confirmed = await modal.confirm(config);
        if (confirmed) {
            try {
                await axiosCourseDelete(courseId);
                window.location.href = ROUTES.GROUPS;
            } catch (error) {

            }
        }
    }

    const [modal, contextHolder] = Modal.useModal();
    const config = {
        title: 'Подождите!',
        content: (
            <>
                Вы точно хотите удалить этот курс?
            </>
        )
    }

    useEffect(() => {
        if (data.length != []) {
            console.log(data)
            editCourseForm.setFieldsValue({
                name: data.name,
                startYear: dayjs().set('year', data.startYear),
                maximumStudentsCount: data.maximumStudentsCount,
                semester: data.semester,
                requirements: data.requirements,
                annotations: data.annotations
            });
        }
    }, [editCourseForm, data, updates]);

    const infoTabsItems = [
        {
            key: '1',
            label: 'Требования к курсу',
            children: <div dangerouslySetInnerHTML={{__html: data.requirements}}/>,
        },
        {
            key: '2',
            label: 'Аннотации',
            children: <div dangerouslySetInnerHTML={{__html: data.annotations}}/>,
        },
        {
            key: '3',
            label: (
                <>
                    Уведомления
                    <Badge overflowCount={9} style={{marginLeft: 8}} count={data.notifications != null ? data.notifications.length : 0} />
                </>
            ),
            children: <>
                <Button onClick={showCreateNotificationModal} type='primary'><PlusCircleOutlined /> СОЗДАТЬ УВЕДОМЛЕНИЕ</Button>
                <List
                    style={{marginTop: 8}}
                    dataSource={notificationListData}
                    renderItem={(item, index) => (
                        <List.Item style={{ background: item.data.isImportant ? 'pink' : 'white' }}>
                            <div style={{marginLeft: 16}}>{item.data.text}</div>
                        </List.Item>
                    )}
                />
            </>,
        },
    ];

    const userTabsItems = [
        {
            key: '1',
            label: 'Преподаватели',
            children : <>
                <Button type='primary'><PlusCircleOutlined /> ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ</Button>
                <List
                    style={{marginTop: 8}}
                    dataSource={teacherListData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<>{item.data.name} {item.data.isMain ? (<Tag style={{marginLeft: 8}} color='green-inverse'>основной</Tag>) : null}</>}
                                description={item.data.email}
                            />
                        </List.Item>
                    )}
                />
            </>
        },
        {
            key: '2',
            label: 'Студенты',
            children: <List
                style={{marginTop: 8}}
                dataSource={studentListData}
                renderItem={(item, index) => (
                    <List.Item>
                        <div>
                            <b>{item.data.name}</b>
                            <br/>
                            <div style={{color: 'gray'}}>
                                Статус: <span style={{color: studentStatusColors[item.data.status]}}>{studentStatusNames[item.data.status]}</span>
                                <br/>
                                {item.data.email}
                            </div>
                        </div>
                        {item.data.status == 'Accepted' ? <a>
                            Промежуточная аттестация
                            <Tag style={{marginLeft: 8}} color={markStatusColors[item.data.midtermResult]}>{markStatusNames[item.data.midtermResult]}</Tag>
                        </a> : null}
                        {item.data.status == 'Accepted' ? <a>
                            Финальная аттестация
                            <Tag style={{marginLeft: 8}} color={markStatusColors[item.data.finalResult]}>{markStatusNames[item.data.finalResult]}</Tag>
                        </a> : null}
                        {item.data.status == 'InQueue' ? <div>
                            <Button style={{marginRight: 8}} type='primary'>ПРИНЯТЬ</Button>
                            <Button type='primary' danger>ОТКЛОНИТЬ</Button>
                        </div> : null}
                    </List.Item>
                )}
            />
        }
    ];

    useEffect(() => {
        fetchGetApi(API_URLS.COURSE + courseId + API_URLS.COURSE_DETAILS, setData, setLoading, setAuthorized, setError, [], true);
    }, [updates])

    return (
        <>
            <Card
                style={{width: '60%', minWidth: '450px', marginBottom: '16px'}}
            >
                <h1>{data.name}</h1>
                <Divider />
                <Flex justify='space-between'>
                    <h2>Основные данные курса</h2>
                    <div>
                        <Button type="primary" onClick={showEditCourseModal} style={{background: 'orange', marginRight: 8, marginBottom: 8}}><EditOutlined /> ИЗМЕНИТЬ ДАННЫЕ</Button>
                        <Button type="primary" onClick={deleteCourse} danger><DeleteOutlined /> УДАЛИТЬ КУРС</Button>
                    </div>

                </Flex>
                <Card bordered={true}>
                    <Flex justify='space-between'>
                        <div>
                            <b>Статус курса</b>
                            <div style={{ color: courseStatusColors[data.status] }}>{courseStatusNames[data.status]}</div>
                        </div>
                        {data.status != 'Finished' ? <Button type="primary" onClick={showEditCourseStatusModal} style={{marginRight: '8px', marginBottom: '8px', background: 'orange'}}><EditOutlined /> ИЗМЕНИТЬ СТАТУС</Button> : null}
                    </Flex>

                    <Divider/>
                    <Flex justify='space-between'>
                        <div style={{width: '50%'}}>
                            <b>Учебный год</b>
                            <div>{data.startYear + '-' + (data.startYear+1)}</div>
                        </div>
                        <div style={{width: '50%'}}>
                            <b>Семестр</b>
                            <div>{data.semester == 'Spring' ? 'Весенний' : 'Осенний'}</div>
                        </div>
                    </Flex>
                    <Divider/>
                    <Flex justify='space-between'>
                        <div style={{width: '50%'}}>
                            <b>Всего мест</b>
                            <div>{data.maximumStudentsCount}</div>
                        </div>
                        <div style={{width: '50%'}}>
                            <b>Студентов зачислено</b>
                            <div>{data.studentsEnrolledCount}</div>
                        </div>
                    </Flex>
                    <Divider/>
                    <b>Заявок на рассмотрении</b>
                    <div>{data.studentsInQueueCount}</div>
                </Card>
                    <Tabs
                        defaultActiveKey="1"
                        centered
                        style={{marginTop: '16px'}}
                        items={infoTabsItems}
                    />
                <Tabs
                    defaultActiveKey="1"
                    centered
                    style={{marginTop: '16px'}}
                    items={userTabsItems}
                />
            </Card>

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
                            { required: true, message: ERROR_MESSAGES.ENTER_COURSE_CAPACITY },
                            () => ({
                                validator(_, value) {
                                    if (!value || value >= data.studentsEnrolledCount) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(ERROR_MESSAGES.CAPACITY_CANNOT_BE_LESS));
                                },
                            }),
                        ]}
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
                </Form>
            </Modal>

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
                            { required: true, message: ERROR_MESSAGES.SELECT_COURSE_STATUS },]}
                    >
                        <Radio.Group>
                            <Radio value="OpenForAssigning"> Открыт для записи </Radio>
                            <Radio value="Started"> В процессе </Radio>
                            <Radio value="Finished"> Закрыт </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Создание уведомления"
                open={isCreateNotificationModalOpen}
                onOk={handleCreateNotificationOk}
                onCancel={handleCancel}
                okText='Создать'
            >
                <Form form={createNotificationForm} onFinish={handleCreateNotificationFinish} >
                    <Form.Item
                        name='text' rules={[
                        { required: true, message: ERROR_MESSAGES.ENTER_NOTIFICATION_TEXT },]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name='isImportant'
                        valuePropName='checked'
                    >
                        <Checkbox>Важное</Checkbox>
                    </Form.Item>

                </Form>
            </Modal>
            {contextHolder}
        </>
    );
}

export default CoursePage