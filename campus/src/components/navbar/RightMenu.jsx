import { Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import { axiosLogout } from "../../api/requests/logoutRequest";

const RightMenu = ({ mode }) => {
  const token = localStorage.getItem('token');

  return (
    <Menu mode={mode} disabledOverflow>
      { token != null ? (
        <Menu.SubMenu
          title={
            <>
              <span className="email">{localStorage.getItem('email')}</span>
            </>
          }
        >
          <Menu.Item key="profile">
            <a href={ROUTES.PROFILE}>
              <UserOutlined /> Профиль
            </a>
          </Menu.Item>
        
          <Menu.Item key="logout">
            <a onClick={() => axiosLogout()}>
              <LogoutOutlined /> Выйти
            </a>
          </Menu.Item>
        </Menu.SubMenu>
      
      ) : (
        <>
          <Menu.Item key="register">
            <a href={ROUTES.REGISTRATION}>Регистрация</a>
          </Menu.Item>
          <Menu.Item key="login">
            <a href={ROUTES.LOGIN}>Вход</a>
          </Menu.Item>
        </>
        
      )}
    </Menu>
  );
};

export default RightMenu;