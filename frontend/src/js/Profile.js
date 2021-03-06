import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import AddEvent from "./AddEvent";
import MyEvents from "./MyEvents";
import SavedEvents from "./SavedEvents";
import UpdateEvent from "./UpdateEvent";
import UserContext from "./UserContext";
import UserOptionsNavbar from "./UserOptionsNavbar";

const Profile = () => {
    const [user, _] = useContext(UserContext);
    let history = useHistory();

    if(user){
    
    if(window.location.pathname === "/profile/saved"){
        return (
            <div>
                <UserOptionsNavbar />
                <SavedEvents user={user}/>
            </div>
        )
    }
    if(window.location.pathname === '/profile/my-events'){
        return (
            <div>
                <UserOptionsNavbar />
                <MyEvents user={user} />
            </div>
        )
    }
    if(window.location.pathname === "/profile/add-event")
    return (
        <div>
            <UserOptionsNavbar />
            <AddEvent />
        </div>
    )
    }
    history.push('/login');
    window.location.reload();
}

export default Profile;