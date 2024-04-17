import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import { Flex, Layout } from 'antd';
import {ROUTES} from "../constants/routes.js";
const { Footer, Content } = Layout;

export const Root = () => {
    document.title = ROUTES.RUS_ROOT;

    return (
    <Layout style={{ minHeight: "100vh"}}>
      <Navbar />
      <Content >
        <Flex style={{height: '100%', flexDirection: 'column'}} justify='center' align='center'>
          <Outlet />
        </Flex>
      </Content>
      <Footer>Made by <a href='https://vk.com/ttydrus'>Sasha</a></Footer>
    </Layout>
  );
}

