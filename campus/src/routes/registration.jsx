import { Card, Form, Input, Button, DatePicker } from "antd";
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { axiosRegistration } from "../api/requests/registrationRequest";

const RegistrationPage = () => {
    const onFinish = (values) => {
        axiosRegistration(
            values.surname + ' ' + values.name + ' ' + values.secondName,
            values.birthdate,
            values.email,
            values.password,
            values.confirmPassword
        );
    };
    const onFinishFailed = (errorInfo) => {
        
    };

    function disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }

    return (
        <Card
        title="Регистрация"
        extra={<a href="/login">Уже есть аккаунт?</a>}
        style={{
            width: 600
        }}
        >
            <Form
            name="registration"
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                label="Фамилия"
                name="surname"
                rules={[
                    { required: true, message: ERROR_MESSAGES.ENTER_SURNAME },
                    { pattern: "^[A-Za-zА-Яа-я]+$", message: ERROR_MESSAGES.TOO_MANY_WORDS }
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="Имя"
                name="name"
                rules={[
                    { required: true, message: ERROR_MESSAGES.ENTER_NAME },
                    { pattern: "^[A-Za-zА-Яа-я]+$", message: ERROR_MESSAGES.TOO_MANY_WORDS }
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="Отчество"
                name="secondName"
                rules={[
                    { required: true, message: ERROR_MESSAGES.ENTER_SECOND_NAME },
                    { pattern: "^[A-Za-zА-Яа-я]+$", message: ERROR_MESSAGES.TOO_MANY_WORDS }
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="Дата рождения"
                name='birthdate'
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
                    { required: true, message: ERROR_MESSAGES.ENTER_PASSWORD },
                    { min: 6, message: ERROR_MESSAGES.PASSWORD_SHORT },
                    { pattern: '.*[0-9]+.*', message: ERROR_MESSAGES.PASSWORD_NO_NUMBERS },
                ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                label="Повторите пароль"
                name="confirmPassword"
                rules={[
                    { required: true, message: ERROR_MESSAGES.ENTER_CONFIRM_PASSWORD },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(ERROR_MESSAGES.PASSWORDS_DONT_MATCH));
                        },
                      }),
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
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default RegistrationPage