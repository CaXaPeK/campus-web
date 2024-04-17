import {Button, Card, Form, Input} from "antd";
import {ERROR_MESSAGES} from "../../constants/errorMessages.js";
import {axiosLogin} from "../../api/requests/loginRequest.js";

const LoginForm = () => {
    const onFinish = (values) => {
        axiosLogin(values.email, values.password);
    };

    return (
        <Card
            title="Авторизация"
            extra={<a href="/registration">Нет аккаунта?</a>}
            style={{
                width: 500,
            }}
        >
            <Form
                name="login"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Электронная почта"
                    name="email"
                    rules={[
                        { required: true, message: ERROR_MESSAGES.ENTER_EMAIL },
                        { type: "email", message: ERROR_MESSAGES.NOT_AN_EMAIL }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: ERROR_MESSAGES.ENTER_PASSWORD,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default LoginForm