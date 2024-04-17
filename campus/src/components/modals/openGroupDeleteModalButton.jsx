import {DeleteOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import {axiosGroupDelete} from "../../api/requests/groupDeleteRequest.js";

// eslint-disable-next-line react/prop-types
const OpenGroupDeleteModalButton = ({data, updates, setUpdates, groupIndex}) => {
    const [modal, contextHolder] = Modal.useModal();
    const config = {
        title: 'Подождите!',
        content: "Вы точно хотите удалить эту группу?"
    }

    const deleteGroup = async (groupIndex) => {
        const confirmed = await modal.confirm(config);
        if (confirmed) {
            try {
                // eslint-disable-next-line react/prop-types
                await axiosGroupDelete(data[groupIndex].id);
                setUpdates(!updates);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Button type="primary" onClick={async () => deleteGroup(groupIndex)} danger><DeleteOutlined /></Button>
            {contextHolder}
        </>

    )
}

export default OpenGroupDeleteModalButton;