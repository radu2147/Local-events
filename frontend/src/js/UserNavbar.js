import React, { useEffect, useState } from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const UserNavbar = ({username}) => {
    const [mobile, setMobile] = useState(window.innerWidth);
    useEffect(() => {
        function handleSize(){
            setMobile(window.innerWidth);
        }
        window.addEventListener('resize', handleSize);
    }, [setMobile]);

    const logout = () => {
        window.localStorage.clear();
    }

    
    if(mobile < 600){
        return (
        <div id="navbar">
            <div id="name">
                <li>
                    <Link to="/">
                        <div id="logo">
                            <img src={require('../../static/logo.png')} />
                        </div>
                    </Link>
                </li>
                
            </div>
            <div id="auth">
                <div class="drop">
                    <DropdownButton id="dropdown-basic-button" title="">
                        <Dropdown.Item href="#/action-1">{username}</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Log out</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div id="navbar">
            <div id="name">
                <li>
                    <Link to="/">
                        <div id="logo">
                            <img src={require('../../static/logo.png')} />
                        </div>
                    </Link>
                </li>
            </div>
            <div id="auth">
                <li>
                    <Link to="/">
                        {username}
                    </Link>
                </li>
                <li>
                    <a href="/" onClick={logout}>
                        Log out
                    </a>
                </li>
            </div>
        </div>
    )
}

export default UserNavbar;