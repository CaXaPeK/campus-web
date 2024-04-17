import CoursePreviewListItem from "./coursePreviewListItem.jsx";
import {List} from "antd";
import {useEffect, useState} from "react";
import {API_URLS} from "../../constants/apiUrls.js";
import {fetchGetApi} from "../../api/fetchGetApi.js";
import {getGroupName} from "../../api/requests/getGroupName.js";

// eslint-disable-next-line react/prop-types
const CourseList = ({mode, groupId, updates}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);

    const [groupName, setGroupName] = useState("");

    let listData = data.length > 0 ? data.map(group => ({
        data: group
    })) : [];

    useEffect(() => {
        const url = mode === 'public' ? API_URLS.GROUPS + '/' + groupId : mode === 'my' ? API_URLS.MY_COURSES : API_URLS.TEACHING_COURSES;
        fetchGetApi(url, setData, setLoading, setAuthorized, setError, [], true);
        if (mode === 'public') {
            getGroupName(groupId, setGroupName);
        }
    }, [updates])

    return (
        <List
            loading={loading}
            header={<h1 style={{alignContent: 'center'}}>{
                mode === 'public' ? (groupName !== "" ? `Группа «${groupName}»` : 'Группа') :
                    mode === 'my' ? "Мои курсы" : "Преподаваемые курсы"
            }</h1>}
            style={{width: '40%', minWidth: '450px', background: 'white', marginBottom: '16px'}}
            bordered
            dataSource={authorized ? listData : []}
            renderItem={(item) => (
                <CoursePreviewListItem
                    name={item.data.name}
                    id={item.data.id}
                    startYear={item.data.startYear}
                    maximumStudentsCount={item.data.maximumStudentsCount}
                    remainingSlotsCount={item.data.remainingSlotsCount}
                    status={item.data.status}
                    semester={item.data.semester}
                />
            )}
        />
    )
}

export default CourseList