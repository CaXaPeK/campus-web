import {Button, List, Tag} from "antd";
import Column from "antd/es/table/Column.js";
import {statusColors, statusNames} from "../../constants/statusMetadata.js";

const CoursePreviewListItem = ({ name, id, startYear, maximumStudentsCount, remainingSlotsCount, status, semester }) => {
    return (
        <List.Item>
            <List.Item.Meta
                title={<a style={{fontSize: 20, overflowWrap: 'break-word'}} href={`/courses/${id}`}>{name}</a>}
                description={
                    <>
                        Учебный год: {startYear + '-' + (startYear+1)}<br/>
                        Семестр: {semester == 'Spring' ? 'весенний' : 'осенний'}<br/>
                        Мест всего: {maximumStudentsCount}<br/>
                        Мест свободно: {remainingSlotsCount}
                    </>
                }
            />
            <Tag color={statusColors[status]}>{statusNames[status]}</Tag>
        </List.Item>
    );
}

export default CoursePreviewListItem;