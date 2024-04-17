import {List} from "antd";

// eslint-disable-next-line react/prop-types
const CourseNotificationList = ({data}) => {
    // eslint-disable-next-line react/prop-types
    let notificationListData = data.notifications != null ? data.notifications.map(notification => ({
        data: notification
    })) : [];

    return (
        <List
            style={{marginTop: 8}}
            dataSource={notificationListData}
            renderItem={(item) => (
                <List.Item style={{ background: item.data.isImportant ? 'pink' : 'white' }}>
                    <div style={{marginLeft: 16}}>{item.data.text}</div>
                </List.Item>
            )}
        />
    )
}

export default CourseNotificationList