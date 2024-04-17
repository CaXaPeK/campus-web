import { App } from 'antd';
import {ROUTES} from "../constants/routes.js";
import LoginForm from "../components/forms/loginForm.jsx";

const LoginPage = () => {
    document.title = ROUTES.RUS_LOGIN;

    return (
        <App>
            <LoginForm />
        </App>
    );
  }
  
  export default LoginPage