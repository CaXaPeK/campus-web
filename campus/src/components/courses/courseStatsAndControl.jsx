import {Button, Card, Divider, Flex} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {courseStatusColors, courseStatusNames} from "../../constants/statusMetadata.js";
import {axiosCourseSignUp} from "../../api/requests/courseSignUpRequest.js";
import OpenCourseEditModalButton from "../modals/openCourseEditModalButton.jsx";
import OpenCourseStatusEditModalButton from "../modals/openCourseStatusEditModalButton.jsx";
import OpenCourseDeleteModalButton from "../modals/openCourseDeleteModalButton.jsx";

// eslint-disable-next-line react/prop-types
const CourseStatsAndControl = ({data, updates, setUpdates, isAdmin, courseId}) => {
    const signUp = async () => {
        try {
            // eslint-disable-next-line react/prop-types
            await axiosCourseSignUp(data.id);
            setUpdates(!updates);
        } catch (error) {
            console.log(error)
        }
    }

    const userIsAdminOrTeacher = () => {
        return isAdmin ||
            // eslint-disable-next-line react/prop-types
            (Array.isArray(data.teachers) &&
                // eslint-disable-next-line react/prop-types
                data.teachers.find(teacher => teacher.email === localStorage.getItem('email')) !== undefined);
    }

    return (
        <>
            <Flex justify='space-between'>
                <h2>Основные данные курса</h2>
                <div>
                    {// eslint-disable-next-line react/prop-types
                    Array.isArray(data.teachers) &&
                    // eslint-disable-next-line react/prop-types
                    data.teachers.find(teacher => teacher.email === localStorage.getItem('email')) === undefined &&
                    // eslint-disable-next-line react/prop-types
                    data.students.find(student => student.email === localStorage.getItem('email')) === undefined &&
                    // eslint-disable-next-line react/prop-types
                    data.status === "OpenForAssigning" ? (
                        <Button type="primary" onClick={signUp} style={{
                            background: 'green',
                            marginRight: 8,
                            marginBottom: 8
                        }}><CheckCircleOutlined/> ЗАПИСАТЬСЯ</Button>
                    ) : null}

                    {userIsAdminOrTeacher() ? <OpenCourseEditModalButton
                        isAdmin={isAdmin}
                        data={data}
                        courseId={courseId}
                        updates={updates}
                        setUpdates={setUpdates}
                    /> : null}
                    {isAdmin ? <OpenCourseDeleteModalButton courseId={courseId} /> : null}
                </div>
            </Flex>
            <Card bordered={true}>
                <Flex justify='space-between'>
                    <div>
                        <b>Статус курса</b>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div style={{color: courseStatusColors[data.status]}}>{courseStatusNames[data.status]}</div>
                    </div>
                    {/* eslint-disable-next-line react/prop-types */}
                    {data.status !== 'Finished' && userIsAdminOrTeacher() ? <OpenCourseStatusEditModalButton
                        courseId={courseId}
                        updates={updates}
                        setUpdates={setUpdates}
                    /> : null}
                </Flex>

                <Divider/>
                <Flex justify='space-between'>
                    <div style={{width: '50%'}}>
                        <b>Учебный год</b>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div>{data.startYear + '-' + (data.startYear + 1)}</div>
                    </div>
                    <div style={{width: '50%'}}>
                        <b>Семестр</b>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div>{data.semester === 'Spring' ? 'Весенний' : 'Осенний'}</div>
                    </div>
                </Flex>
                <Divider/>
                <Flex justify='space-between'>
                    <div style={{width: '50%'}}>
                        <b>Всего мест</b>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div>{data.maximumStudentsCount}</div>
                    </div>
                    <div style={{width: '50%'}}>
                        <b>Студентов зачислено</b>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div>{data.studentsEnrolledCount}</div>
                    </div>
                </Flex>
                <Divider/>
                <b>Заявок на рассмотрении</b>
                {/* eslint-disable-next-line react/prop-types */}
                <div>{data.studentsInQueueCount}</div>
            </Card>
        </>
    )
}

export default CourseStatsAndControl