import {Card, Divider} from "antd";
import {useEffect, useState} from "react";
import {fetchGetApi} from "../../api/fetchGetApi.js";
import {API_URLS} from "../../constants/apiUrls.js";
import CourseStatsAndControl from "./courseStatsAndControl.jsx";
import CourseInfoTabs from "./courseInfoTabs.jsx";
import CourseMembersTabs from "./courseMembersTabs.jsx";

// eslint-disable-next-line react/prop-types
const CourseCard = ({courseId, isAdmin}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);
    const [updates, setUpdates] = useState(false);

    useEffect(() => {
        fetchGetApi(API_URLS.COURSE + courseId + API_URLS.COURSE_DETAILS, setData, setLoading, setAuthorized, setError, [], true);
    }, [updates])

    return (
        <Card
            style={{width: '60%', minWidth: '450px', marginBottom: '16px'}}
        >
            <h1>{data.name}</h1>
            <Divider/>
            <CourseStatsAndControl
                data={data}
                updates={updates}
                setUpdates={setUpdates}
                isAdmin={isAdmin}
                courseId={courseId}
            />
            <CourseInfoTabs
                isAdmin={isAdmin}
                data={data}
                courseId={courseId}
                updates={updates}
                setUpdates={setUpdates}
            />
            <CourseMembersTabs
                isAdmin={isAdmin}
                data={data}
                courseId={courseId}
                updates={updates}
                setUpdates={setUpdates}
            />
        </Card>
    )
}

export default CourseCard;