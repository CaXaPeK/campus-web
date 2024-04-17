import {ROUTES} from "../constants/routes.js";
import ProfileEditForm from "../components/forms/profileEditForm.jsx";

const ProfilePage = () => {
    document.title = ROUTES.RUS_PROFILE;

    return (
        <ProfileEditForm />
    );
}

export default ProfilePage