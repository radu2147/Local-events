import React, { useContext } from "react";
import AnonymousNavbar from "./AnonymousNavbar";
import UserContext from "./UserContext";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
    const [user, _] = useContext(UserContext);

    if(!user){
        return <AnonymousNavbar />
    }
    else{
        return <UserNavbar username={user.username} />
    }
}

export default Navbar;