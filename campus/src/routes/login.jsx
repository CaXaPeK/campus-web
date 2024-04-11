import { App, Card, Space, Button, Form, Input } from 'antd';
import { axiosLogin } from '../api/requests/loginRequest';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import {ROUTES} from "../constants/routes.js";

const LoginPage = () => {
    document.title = ROUTES.RUS_LOGIN;

    const onFinish = (values) => {
        axiosLogin(values.email, values.password);
    };
    const onFinishFailed = (errorInfo) => {
        
    };

    return (
        <App>
            <Space direction="vertical" size={16}>
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
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                        label="Электронная почта"
                        name="email"
                        rules={[
                            { required: true, message: ERROR_MESSAGES.ENTER_EMAIL },
                            { pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", message: ERROR_MESSAGES.NOT_AN_EMAIL }
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
            </Space>
        </App>
        
    );
  }
  
  export default LoginPage