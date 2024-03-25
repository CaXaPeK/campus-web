import { Menu } from "antd";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="explore">Группы курсов</Menu.Item>
      <Menu.Item key="features">Мои курсы</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;