import {Button, Form, Input, List, Modal, Row} from "antd";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useGetApi} from "../api/hook/useGetApi.js";
import {API_URLS} from "../constants/apiUrls.js";
import {ROUTES} from "../constants/routes.js";
import {useState, useEffect} from "react";
import {ERROR_MESSAGES} from "../constants/errorMessages.js";
import {axiosGroupPut} from "../api/requests/groupPutRequest.js";

const GroupsPage = () => {
    document.title = ROUTES.RUS_GROUPS;
    const [form] = Form.useForm();
    const [data, loading, authorized, error] = useGetApi([], API_URLS.GROUPS, true);

    let listData = data.length > 0 ? data.map(group => ({
        title: group.name,
        description: group.id,
    })) : [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

    const showModal = (groupIndex) => {
        setSelectedGroupIndex(groupIndex);
        setIsModalOpen(true);
    };
    const handleFinish = (values) => {
        axiosGroupPut(data[selectedGroupIndex].id, values.title);
        data[selectedGroupIndex].name = values.title;
        setIsModalOpen(false);
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (data.length > 0) {
            form.setFieldsValue({
                title: data[selectedGroupIndex].name
            });
        }
    }, [form, data, selectedGroupIndex]);

    return (
        <>
            <Modal title="Введите новое название группы" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Сохранить'>
                <Form form={form} onFinish={handleFinish} >
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
                            <Button type="primary" onClick={() => showModal(index)} style={{marginRight: '8px', marginBottom: '8px', background: 'orange'}}><EditOutlined /></Button>
                            <Button type="primary" danger><DeleteOutlined /></Button>
                        </Row>
                    </List.Item>
                )}
            />
            <Button type='primary'><PlusCircleOutlined /> СОЗДАТЬ ГРУППУ</Button>
        </>

    );
}

export default GroupsPage