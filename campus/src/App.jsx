import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Root } from './routes/root';
import { ROUTES } from './constants/routes';  
import Home from './routes/home';
import LoginPage from './routes/login';
import RegisterPage from './routes/registration';

import './App.css';
import ProfilePage from './routes/profile';
import GroupsPage from "./routes/groups.jsx";
import {ConfigProvider} from "antd";
import ruRU from 'antd/locale/ru_RU.js'

const router = createBrowserRouter([
  {
    path:  ROUTES.ROOT,
    element: <Root />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTRATION,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.GROUPS,
        element: <GroupsPage />,
      }
    ],
  },
  
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const App = () => (
  <ConfigProvider locale={ruRU}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ConfigProvider>
);