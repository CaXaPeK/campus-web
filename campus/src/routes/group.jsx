import {useParams} from "react-router";
import {useState} from "react";
import {useSelector} from "react-redux";
import 'react-quill/dist/quill.snow.css';
import {ROUTES} from "../constants/routes.js";
import CourseList from "../components/courses/courseList.jsx";
import OpenCourseCreateModalButton from "../components/modals/openCourseCreateModalButton.jsx";

// eslint-disable-next-line react/prop-types
const GroupPage = ({mode}) => {
    if (mode === 'my') {
        document.title = ROUTES.RUS_MY_COURSES;
    }
    else if (mode === 'teaching') {
        document.title = ROUTES.RUS_TEACHING_COURSES;
    }

    const { groupId } = useParams();
    const user = useSelector((state) => state.user);
    const [updates, setUpdates] = useState(false);

    return (
        <>
            <CourseList
                mode={mode}
                groupId={groupId}
                updates={updates}
            />
            {user.isAdmin && mode === 'public' ? (
                <OpenCourseCreateModalButton
                    groupId={groupId}
                    updates={updates}
                    setUpdates={setUpdates}
                />
            ) : null}
        </>
    );
}

export default GroupPage