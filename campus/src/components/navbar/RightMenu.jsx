import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";

const RightMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">user@mail.com</span>
          </>
        }
      >
        <Menu.Item key="about-us">
          <UserOutlined /> Профиль
        </Menu.Item>
        <Menu.Item key="log-out">
          <LogoutOutlined /> Выйти
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;