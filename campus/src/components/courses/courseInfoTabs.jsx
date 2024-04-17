import {Badge, Tabs} from "antd";
import OpenCourseNotificationCreateModalButton from "../modals/openCourseNotificationCreateModalButton.jsx";
import CourseNotificationList from "./courseNotificationList.jsx";

// eslint-disable-next-line react/prop-types
const CourseInfoTabs = ({isAdmin, data, courseId, updates, setUpdates}) => {
    const userIsAdminOrTeacher = () => {
        return isAdmin ||
            // eslint-disable-next-line react/prop-types
            (Array.isArray(data.teachers) &&
                // eslint-disable-next-line react/prop-types
                data.teachers.find(teacher => teacher.email === localStorage.getItem('email')) !== undefined);
    }

    const infoTabsItems = [
        {
            key: '1',
            label: 'Требования к курсу',
            // eslint-disable-next-line react/prop-types
            children: <div dangerouslySetInnerHTML={{__html: data.requirements}}/>,
        },
        {
            key: '2',
            label: 'Аннотации',
            // eslint-disable-next-line react/prop-types
            children: <div dangerouslySetInnerHTML={{__html: data.annotations}}/>,
        },
        {
            key: '3',
            label: (
                <>
                    Уведомления
                    {/* eslint-disable-next-line react/prop-types */}
                    <Badge overflowCount={9} style={{marginLeft: 8}} count={data.notifications != null ? data.notifications.length : 0} />
                </>
            ),
            children: <>
                { userIsAdminOrTeacher() ? <OpenCourseNotificationCreateModalButton
                    courseId={courseId}
                    updates={updates}
                    setUpdates={setUpdates}
                /> : null}
                <CourseNotificationList data={data} />
            </>,
        },
    ];

    return (
        <Tabs
            defaultActiveKey="1"
            centered
            style={{marginTop: '16px'}}
            items={infoTabsItems}
        />
    )
}

export default CourseInfoTabs;