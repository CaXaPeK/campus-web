import {DeleteOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import {axiosCourseDelete} from "../../api/requests/courseDeleteRequest.js";
import {ROUTES} from "../../constants/routes.js";

// eslint-disable-next-line react/prop-types
const OpenCourseDeleteModalButton = ({courseId}) => {
    const [modal, contextHolder] = Modal.useModal();
    const config = {
        title: 'Подождите!',
        content: 'Вы точно хотите удалить этот курс?'
    }

    const deleteCourse = async () => {
        console.log('courseId')
        const confirmed = await modal.confirm(config);
        if (confirmed) {
            try {
                await axiosCourseDelete(courseId);
                window.location.href = ROUTES.GROUPS;
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Button type="primary" onClick={deleteCourse} danger><DeleteOutlined/> УДАЛИТЬ КУРС</Button>
            {contextHolder}
        </>

    )
}

export default OpenCourseDeleteModalButton