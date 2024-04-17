import {ROUTES} from "../constants/routes.js";
import {useState} from "react";
import {useSelector} from "react-redux";
import GroupList from "../components/groups/groupList.jsx";
import OpenGroupCreateModalButton from "../components/modals/openGroupCreateModalButton.jsx";

const GroupsPage = () => {
    document.title = ROUTES.RUS_GROUPS;

    const user = useSelector((state) => state.user);
    const [updates, setUpdates] = useState(false);

    return (
        <>
            <GroupList
                isAdmin={user.isAdmin}
                updates={updates}
                setUpdates={setUpdates}
            />

            {user.isAdmin ? (
                <OpenGroupCreateModalButton
                    updates={updates}
                    setUpdates={setUpdates}
                />
            ) : null}
        </>

    );
}

export default GroupsPage