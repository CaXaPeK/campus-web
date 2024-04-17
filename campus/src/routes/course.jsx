import {useParams} from "react-router";
import {useSelector} from "react-redux";
import CourseCard from "../components/courses/courseCard.jsx";

const CoursePage = () => {
    const { courseId } = useParams();
    const user = useSelector((state) => state.user);
    return (
        <CourseCard courseId={courseId} isAdmin={user.isAdmin} />
    );
}

export default CoursePage