import {Button, Card, Divider, Flex, Layout, Row} from "antd";
import {EditOutlined} from "@ant-design/icons";

const CoursePage = () => {
    return (
        <Card
            style={{width: '60%', minWidth: '450px', marginBottom: '16px'}}
        >
            <h1>BIGDATA: ПРОГРАММНЫЕ МЕТОДЫ С PYTHON3</h1>
            <Divider />
            <Flex justify='space-between'>
                <h2>Основные данные курса</h2>
                <Button type="primary"  style={{marginRight: '8px', marginBottom: '8px', background: 'orange'}}><EditOutlined /> ИЗМЕНИТЬ ДАННЫЕ</Button>
            </Flex>
            <Card bordered={true}>
                <b>Статус курса</b>
                <div>Открыт для записи</div>
                <Divider/>
                <Flex justify='space-between'>
                    <div>
                        <b>Учебный год</b>
                        <div>2022-2023</div>
                    </div>
                    <div>
                        <b>Семестр</b>
                        <div>Осенний</div>
                    </div>
                </Flex>
                <Divider/>
                <Flex justify='space-between'>
                    <div>
                        <b>Всего мест</b>
                        <div>100</div>
                    </div>
                    <div>
                        <b>Студентов зачислено</b>
                        <div>Осенний</div>
                    </div>
                </Flex>
            </Card>
        </Card>
    );
}

export default CoursePage