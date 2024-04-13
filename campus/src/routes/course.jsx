import {Badge, Button, Card, Divider, Flex, Layout, List, Row, Tabs, Tag} from "antd";
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
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

const CoursePage = () => {
    const { courseId } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const [updates, setUpdates] = useState(false);

    let notificationListData = data.notifications != null ? data.notifications.map(notification => ({
        data: notification
    })) : [];

    let teacherListData = data.teachers != null ? data.teachers.map(teacher => ({
        data: teacher
    })) : [];

    let studentListData = data.students != null ? data.students.map(student => ({
        data: student
    })) : [];

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
                    <Badge style={{marginLeft: 8}} count={data.notifications != null ? data.notifications.length : 0} />
                </>
            ),
            children: <>
                <Button type='primary'><PlusCircleOutlined /> СОЗДАТЬ УВЕДОМЛЕНИЕ</Button>
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
        <Card
            style={{width: '60%', minWidth: '450px', marginBottom: '16px'}}
        >
            <h1>{data.name}</h1>
            <Divider />
            <Flex justify='space-between'>
                <h2>Основные данные курса</h2>
                <Button type="primary" style={{background: 'orange'}}><EditOutlined /> ИЗМЕНИТЬ ДАННЫЕ</Button>
            </Flex>
            <Card bordered={true}>
                <Flex justify='space-between'>
                    <div>
                        <b>Статус курса</b>
                        <div style={{ color: courseStatusColors[data.status] }}>{courseStatusNames[data.status]}</div>
                    </div>
                    <Button type="primary" style={{marginRight: '8px', marginBottom: '8px', background: 'orange'}}><EditOutlined /> ИЗМЕНИТЬ СТАТУС</Button>
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
    );
}

export default CoursePage