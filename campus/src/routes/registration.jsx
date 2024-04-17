import {ROUTES} from "../constants/routes.js";
import RegistrationForm from "../components/forms/registrationForm.jsx";

const RegistrationPage = () => {
    document.title = ROUTES.RUS_REGISTRATION;

    return (
        <RegistrationForm />
    );
}

export default RegistrationPage