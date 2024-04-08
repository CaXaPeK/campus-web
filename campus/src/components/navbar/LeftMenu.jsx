import { Menu } from "antd";
import { useGetApi } from "../../api/hook/useGetApi";
import { API_URLS } from "../../constants/apiUrls";
import { ROUTES } from "../../constants/routes";
import { useEffect } from "react";

const LeftMenu = ({ mode }) => {
  const cachedData = {
    isStudent: localStorage.getItem('isStudent'),
    isTeacher: localStorage.getItem('isTeacher'),
    isAdmin: localStorage.getItem('isAdmin'),
  }
  const token = localStorage.getItem('token');
  const [data, loading, authorized, error] = useGetApi(cachedData, API_URLS.ROLES, false);

  useEffect(() => {
    localStorage.setItem("isTeacher", data.isTeacher);
    localStorage.setItem("isStudent", data.isStudent);
    localStorage.setItem("isAdmin", data.isAdmin);
  }, [data]);

  return (
    <Menu mode={mode} disabledOverflow>
      { token != null ? (
        <>
          <Menu.Item key="groups">
            <a href={ROUTES.GROUPS}>Группы курсов</a>
          </Menu.Item>
          { data.isStudent ? (
              <Menu.Item key="my">
                <a href={ROUTES.MY_COURSES}>Мои курсы</a>
              </Menu.Item>
          ) : null }
          { data.isTeacher ? (
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