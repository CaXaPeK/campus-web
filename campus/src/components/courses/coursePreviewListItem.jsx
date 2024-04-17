import {List, Tag} from "antd";
import {courseStatusColors, courseStatusNames} from "../../constants/statusMetadata.js";

// eslint-disable-next-line react/prop-types
const CoursePreviewListItem = ({ name, id, startYear, maximumStudentsCount, remainingSlotsCount, status, semester }) => {
    return (
        <List.Item>
            <List.Item.Meta
                title={<a style={{fontSize: 20, overflowWrap: 'break-word'}} href={`/courses/${id}`}>{name}</a>}
                description={
                    <>
                        Учебный год: {startYear + '-' + (startYear+1)}<br/>
                        Семестр: {semester === 'Spring' ? 'весенний' : 'осенний'}<br/>
                        Мест всего: {maximumStudentsCount}<br/>
                        Мест свободно: {remainingSlotsCount}
                    </>
                }
            />
            <Tag color={courseStatusColors[status]}>{courseStatusNames[status]}</Tag>
        </List.Item>
    );
}

export default CoursePreviewListItem;