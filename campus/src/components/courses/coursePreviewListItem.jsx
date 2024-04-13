import {Button, List, Tag} from "antd";
import Column from "antd/es/table/Column.js";

const CoursePreviewListItem = ({ name, id, startYear, maximumStudentsCount, remainingSlotsCount, status, semester }) => {
    const statusColors = {
        OpenForAssigning: 'green',
        Finished: 'red',
        Created: 'gray',
        Started: 'blue'
    }

    const statusNames = {
        OpenForAssigning: 'Открыт для записи',
        Finished: 'Закрыт',
        Created: 'Создан',
        Started: 'В процессе обучения'
    }

    return (
        <List.Item>
            <List.Item.Meta
                title={<a style={{fontSize: 20}} href={`/courses/${id}`}>{name}</a>}
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