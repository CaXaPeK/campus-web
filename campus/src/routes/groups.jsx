import {Button, Form, Input, List, Modal, Row} from "antd";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useGetApi} from "../api/hook/useGetApi.js";
import {API_URLS} from "../constants/apiUrls.js";
import {ROUTES} from "../constants/routes.js";
import {useState, useEffect} from "react";
import {ERROR_MESSAGES} from "../constants/errorMessages.js";
import {axiosGroupPut} from "../api/requests/groupPutRequest.js";
import {axiosGroupPost} from "../api/requests/groupPostRequest.js";

const GroupsPage = () => {
    document.title = ROUTES.RUS_GROUPS;
    const [editForm] = Form.useForm();
    const [createForm] = Form.useForm();
    const [data, loading, authorized, error] = useGetApi([], API_URLS.GROUPS, true);

    let listData = data.length > 0 ? data.map(group => ({
        title: group.name,
        description: group.id,
    })) : [];

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

    const showEditModal = (groupIndex) => {
        setSelectedGroupIndex(groupIndex);
        setIsEditModalOpen(true);
    };
    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditFinish = (values) => {
        axiosGroupPut(data[selectedGroupIndex].id, values.title);
        data[selectedGroupIndex].name = values.title;
        setIsEditModalOpen(false);
    }
    const handleCreateFinish = (values) => {
        //axiosGroupPut(data[selectedGroupIndex].id, values.title);
        //data[selectedGroupIndex].name = values.title;
        axiosGroupPost(values.title);
        setIsCreateModalOpen(false);
    }

    const handleEditOk = () => {
        editForm.submit();
    };
    const handleCreateOk = () => {
        createForm.submit();
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
        setIsCreateModalOpen(false);
    };

    useEffect(() => {
        if (data.length > 0) {
            editForm.setFieldsValue({
                title: data[selectedGroupIndex].name
            });
        }
    }, [editForm, data, selectedGroupIndex]);

    return (
        <>
            <Modal
                title="Введите новое название группы"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleCancel}
                okText='Сохранить'
            >
                <Form form={editForm} onFinish={handleEditFinish} >
                    <Form.Item
                        name='title' rules={[
                        { required: true, message: ERROR_MESSAGES.ENTER_GROUP_NAME },]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Введите название новой группы"
                open={isCreateModalOpen}
                onOk={handleCreateOk}
                onCancel={handleCancel}
                okText='Создать'
            >
                <Form form={createForm} onFinish={handleCreateFinish} >
                    <Form.Item
                        name='title' rules={[
                        { required: true, message: ERROR_MESSAGES.ENTER_GROUP_NAME },]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>



            <List
                loading={loading}
                header={<h1 style={{alignContent: 'center'}}>Группы кампусных курсов</h1>}
                style={{width: '40%', minWidth: '450px', background: 'white', marginBottom: '16px'}}
                bordered
                dataSource={authorized ? listData : []}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href={`/groups/${item.description}`}>{item.title}</a>}
                        />
                        <Row>
                            <Button type="primary" onClick={() => showEditModal(index)} style={{marginRight: '8px', marginBottom: '8px', background: 'orange'}}><EditOutlined /></Button>
                            <Button type="primary" danger><DeleteOutlined /></Button>
                        </Row>
                    </List.Item>
                )}
            />
            <Button type='primary' onClick={showCreateModal}><PlusCircleOutlined /> СОЗДАТЬ ГРУППУ</Button>
        </>

    );
}

export default GroupsPage