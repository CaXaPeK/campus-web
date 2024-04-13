import { Menu } from "antd";
import { ROUTES } from "../../constants/routes";
import {useSelector} from "react-redux";
import {axiosRolesReload} from "../../api/requests/rolesReloadRequest.js";

const LeftMenu = ({ mode }) => {
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user);
  axiosRolesReload();

  return (
    <Menu mode={mode} disabledOverflow>
      { token != null ? (
        <>
          <Menu.Item key="groups">
            <a href={ROUTES.GROUPS}>Группы курсов</a>
          </Menu.Item>
          { user.isStudent ? (
              <Menu.Item key="my">
                <a href={ROUTES.MY_COURSES}>Мои курсы</a>
              </Menu.Item>
          ) : null }
          { user.isTeacher ? (
            <Menu.Item key="teaching">
              <a href={ROUTES.TEACHING_COURSES}>Преподаваемые курсы</a>
            </Menu.Item>
          ) : null }
        </>
      ) : null }
    </Menu>
  );
};

export default LeftMenu;