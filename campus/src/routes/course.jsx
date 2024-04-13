import {Badge, Button, Card, Divider, Flex, Layout, List, Row, Tabs} from "antd";
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {fetchGetApi} from "../api/fetchGetApi.js";
import {API_URLS} from "../constants/apiUrls.js";
import {useParams} from "react-router";
import {statusColors, statusNames} from "../constants/statusMetadata.js";
import CoursePreviewListItem from "../components/courses/coursePreviewListItem.jsx";

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

    const items = [
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
                        <div style={{ color: statusColors[data.status] }}>{statusNames[data.status]}</div>
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
                    items={items}
                />
            </Card>
    );
}

export default CoursePage