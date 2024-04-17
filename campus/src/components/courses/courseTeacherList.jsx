import {List, Tag} from "antd";

// eslint-disable-next-line react/prop-types
const CourseTeacherList = ({data}) => {
    // eslint-disable-next-line react/prop-types
    let teacherListData = data.teachers != null ? data.teachers.map(teacher => ({
        data: teacher
    })) : [];

    return (
        <List
            style={{marginTop: 8}}
            dataSource={teacherListData}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        title={<>{item.data.name} {item.data.isMain ? (<Tag style={{marginLeft: 8}} color='green-inverse'>основной</Tag>) : null}</>}
                        description={item.data.email}
                    />
                </List.Item>
            )}
        />
    )
}

export default CourseTeacherList