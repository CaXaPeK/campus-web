import {Button, List} from "antd";
import {
    studentStatusColors,
    studentStatusNames
} from "../../constants/statusMetadata.js";
import OpenCourseStudentMarkEditModalButton from "../modals/openCourseStudentMarkEditModalButton.jsx";
import {axiosCourseStudentStatusEdit} from "../../api/requests/courseStudentStatusEditRequest.js";

// eslint-disable-next-line react/prop-types
const CourseStudentList = ({data, isAdmin, courseId, updates, setUpdates}) => {
    // eslint-disable-next-line react/prop-types
    let studentListData = data.students != null ? data.students.map(student => ({
        data: student
    })) : [];

    const changeStudentStatus = async (index, newStatus) => {
        try {
            // eslint-disable-next-line react/prop-types
            await axiosCourseStudentStatusEdit(courseId, data.students[index].id, newStatus);
            setUpdates(!updates);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <List
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
                    {item.data.status === 'Accepted' && item.data.midtermResult !== null ?
                        <OpenCourseStudentMarkEditModalButton
                            type={'Midterm'}
                            isAdmin={isAdmin}
                            data={data}
                            studentIndex={index}
                            courseId={courseId}
                            updates={updates}
                            setUpdates={setUpdates}
                            result={item.data.midtermResult}
                        />
                        : null}
                    {item.data.status === 'Accepted' && item.data.finalResult !== null ?
                        <OpenCourseStudentMarkEditModalButton
                            type={'Final'}
                            isAdmin={isAdmin}
                            data={data}
                            studentIndex={index}
                            courseId={courseId}
                            updates={updates}
                            setUpdates={setUpdates}
                            result={item.data.finalResult}
                        />
                        : null}
                    {item.data.status === 'InQueue' ? <div>
                        <Button onClick={() => { changeStudentStatus(index, 'Accepted') }} style={{marginRight: 8}} type='primary'>ПРИНЯТЬ</Button>
                        <Button onClick={() => { changeStudentStatus(index, 'Declined') }} type='primary' danger>ОТКЛОНИТЬ</Button>
                    </div> : null}
                </List.Item>
            )}
        />
    )
}

export default CourseStudentList