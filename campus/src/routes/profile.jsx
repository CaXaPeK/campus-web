import { Card, DatePicker, Form, Input } from "antd";
import { ERROR_MESSAGES } from "../constants/errorMessages";

const ProfilePage = () => {
    const onFinish = (values) => {

    };

    function disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }

    return (
        <Card
        title="Изменение профиля"
        style={{
            width: 600
        }}
        >
            <Form
            name="profileEdit"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
            >
                <Form.Item
                label="ФИО"
                name="name"
                rules={[
                    { required: true, message: ERROR_MESSAGES.ENTER_FIO },
                    { pattern: '^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$', message: ERROR_MESSAGES.SHOULD_BE_THREE_WORDS }
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="Электронная почта"
                name="email"
                >
                    <Input
                    defaultValue="user@example.com"
                    disabled
                    />
                </Form.Item>

                <Form.Item
                label="Дата рождения"
                name="birthdate"
                rules={[
                    { required: true, message: ERROR_MESSAGES.SELECT_DATE },
                ]}
                >
                    <DatePicker
                    format={"DD.MM.YYYY"}
                    placeholder=""
                    disabledDate={disabledDate}
                    style={{ width: '100%' }}
                    />
                </Form.Item>
            </Form>
        </Card>
    );
}

export default ProfilePage