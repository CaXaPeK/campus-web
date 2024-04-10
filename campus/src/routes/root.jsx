import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import { Flex, Layout, Space } from 'antd';
const { Footer, Content } = Layout;

export const Root = () => {
  return (
    <Layout style={{ minHeight: "100vh"}}>
      <Navbar />
      <Content >
        <Flex style={{height: '100%', flexDirection: 'column'}} justify='center' align='center'>
          <Outlet />
        </Flex>
      </Content>
      {/* <Space align="center"><Outlet /></Space> */}
      <Footer>Made by <a href='https://vk.com/ttydrus'>Sasha</a></Footer>
    </Layout>
  );
}

