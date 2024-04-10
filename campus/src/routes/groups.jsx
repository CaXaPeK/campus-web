import {Avatar, Button, FloatButton, List, Row} from "antd";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {useGetApi} from "../api/hook/useGetApi.js";
import {API_URLS} from "../constants/apiUrls.js";
import {ROUTES} from "../constants/routes.js";

const GroupsPage = () => {
    document.title = ROUTES.RUS_GROUPS;
    const [data, loading, authorized, error] = useGetApi([], API_URLS.GROUPS, true);

    var listData = data.length > 0 ? data.map(group => ({
        title: group.name,
        description: group.id,
    })) : [];

    return (
        <>
            <List
                loading={loading}
                header={<h1 style={{alignContent: 'center'}}>Группы кампусных курсов</h1>}
                style={{width: '40%', minWidth: '450px', background: 'white', marginBottom: '16px'}}
                //locale={{emptyText: 'Групп нет...'}}
                bordered
                dataSource={authorized ? listData : []}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href={`/groups/${item.description}`}>{item.title}</a>}
                        />
                        <Row>
                            <Button type="primary" style={{marginRight: '8px', marginBottom: '8px', background: 'orange'}}><EditOutlined /></Button>
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