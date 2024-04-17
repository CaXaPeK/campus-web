import {List, Row} from "antd";
import {useEffect, useState} from "react";
import {fetchGetApi} from "../../api/fetchGetApi.js";
import {API_URLS} from "../../constants/apiUrls.js";
import OpenGroupEditModalButton from "../modals/openGroupEditModalButton.jsx";
import OpenGroupDeleteModalButton from "../modals/openGroupDeleteModalButton.jsx";

// eslint-disable-next-line react/prop-types
const GroupList = ({isAdmin, updates, setUpdates}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState(null);

    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

    let listData = data.length > 0 ? data.map(group => ({
        title: group.name,
        description: group.id,
    })) : [];

    useEffect(() => {
        fetchGetApi(API_URLS.GROUPS, setData, setLoading, setAuthorized, setError, [], true, false);
    }, [updates])

    return (
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
                    { isAdmin ? (
                        <Row>
                            <OpenGroupEditModalButton
                                data={data}
                                selectedGroupIndex={selectedGroupIndex}
                                setSelectedGroupIndex={setSelectedGroupIndex}
                                groupIndex={index}
                            />
                            <OpenGroupDeleteModalButton
                                data={data}
                                updates={updates}
                                setUpdates={setUpdates}
                                groupIndex={index}
                            />
                        </Row>
                    ) : null}

                </List.Item>
            )}
        />
    )
}

export default GroupList