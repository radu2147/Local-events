import React, { useContext } from "react";
import AnonymousNavbar from "./AnonymousNavbar";
import UserContext from "./UserContext";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
    return (
        <UserContext.Consumer>
            {value => {
                if(!value[0])
                    return <AnonymousNavbar />
                return <UserNavbar username={value[0].username}/>
            }}
        </UserContext.Consumer>
    )
}

export default Navbar;