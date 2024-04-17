import {Tabs} from "antd";
import OpenCourseTeacherAddModalButton from "../modals/openCourseTeacherAddModalButton.jsx";
import CourseTeacherList from "./courseTeacherList.jsx";
import CourseStudentList from "./courseStudentList.jsx";

// eslint-disable-next-line react/prop-types
const CourseMembersTabs = ({isAdmin, courseId, updates, setUpdates, data}) => {
    const userTabsItems = [
        {
            key: '1',
            label: 'Преподаватели',
            children : <>
                { isAdmin ? <OpenCourseTeacherAddModalButton courseId={courseId} updates={updates} setUpdates={setUpdates} /> : null}
                <CourseTeacherList data={data} />
            </>
        },
        {
            key: '2',
            label: 'Студенты',
            children: <CourseStudentList
                data={data}
                isAdmin={isAdmin}
                updates={updates}
                setUpdates={setUpdates}
                courseId={courseId}
            />
        }
    ];

    return (
        <Tabs
            defaultActiveKey="1"
            centered
            style={{marginTop: '16px'}}
            items={userTabsItems}
        />
    )
}

export default CourseMembersTabs;