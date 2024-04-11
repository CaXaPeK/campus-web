import {Button, Card, ConfigProvider, DatePicker, Form, Input} from "antd";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { useGetApi } from "../api/hook/useGetApi";
import { API_URLS } from "../constants/apiUrls";
import { useEffect, useState } from "react";
import dayjs, {locale} from 'dayjs';
import { axiosProfilePut } from "../api/requests/profilePutRequest";
import {ROUTES} from "../constants/routes.js";

const ProfilePage = () => {
    document.title = ROUTES.RUS_PROFILE;

    const [data, loading, authorized, error] = useGetApi(null, API_URLS.PROFILE, true);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axiosProfilePut(values.name, values.birthdate);
    };

    function disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }

    useEffect(() => {
        if (!loading && data !== null) {
            form.setFieldsValue({
                name: data.fullName,
                email: data.email,
                birthdate: dayjs(data.birthDate.split('T')[0], "YYYY-MM-DD")
            });
        }
    }, [loading, data]);
    

    return (
        <Card
        title="Изменение профиля"
        style={{
            width: 600
        }}
        >
            <Form
            name="profileEdit"
            form={form}
            disabled={loading || !authorized}
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

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                    <Button type="primary" htmlType="submit">
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default ProfilePage