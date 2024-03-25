import { Card, Space, Button, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginPage = () => {
    return (
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
                        {
                        required: true,
                        message: 'Введите электронную почту',
                        },
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
                        message: 'Введите пароль',
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
    );
  }
  
  export default LoginPage