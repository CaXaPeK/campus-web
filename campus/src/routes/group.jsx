import CoursePreviewListItem from "../components/courses/coursePreviewListItem.jsx";
import {useParams} from "react-router";
import {List} from "antd";
import {useEffect, useState} from "react";
import {fetchGetApi} from "../api/fetchGetApi.js";
import {API_URLS} from "../constants/apiUrls.js";
import {getGroupName} from "../api/requests/getGroupName.js";

const GroupPage = () => {
    const { groupId } = useParams();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const [updates, setUpdates] = useState(false);
    const [groupName, setGroupName] = useState("");

    let listData = data.length > 0 ? data.map(group => ({
        data: group
    })) : [];

    useEffect(() => {
        fetchGetApi(API_URLS.GROUPS + '/' + groupId, setData, setLoading, setAuthorized, setError, [], true);
        getGroupName(groupId, setGroupName);
    }, [updates])

    return (
        <>
            <List
                loading={loading}
                header={<h1 style={{alignContent: 'center'}}>{groupName != "" ? `Группа «${groupName}»` : 'Группа'}</h1>}
                style={{width: '40%', minWidth: '450px', background: 'white', marginBottom: '16px'}}
                bordered
                dataSource={authorized ? listData : []}
                renderItem={(item, index) => (
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
        </>
    );
}

export default GroupPage