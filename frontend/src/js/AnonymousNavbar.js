import React, { useEffect, useState } from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";import 'bootstrap/dist/css/bootstrap.min.css';

const AnonymousNavbar = () => {
    const [mobile, setMobile] = useState(window.innerWidth);
    const [options, setOptions] = useState(['Login', 'Register']);
    useEffect(() => {
        function handleSize(){
            setMobile(window.innerWidth);
        }
        window.addEventListener('resize', handleSize);
    }, [setMobile])
    if(mobile < 600){
        return (
        <div id="navbar">
            <div id="name">
                <li>
                    <a href="/">
                        <div id="logo">
                            <img src={require('../../static/logo.png')} />
                        </div>
                    </a>
                </li>
                
            </div>
            <div id="auth">
                <div class="drop">
                    <DropdownButton id="dropdown-basic-button" title="">
                        <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Register</Dropdown.Item>
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
                    <a href="/">
                        <div id="logo">
                            <img src={require('../../static/logo.png')} />
                        </div>
                    </a>
                </li>
            </div>
            <div id="auth">
                <li>
                    <a href="/login">
                        Login
                    </a>
                </li>
                <li>
                    <a href="/register">
                        Register
                    </a>
                </li>
            </div>
        </div>
    )
}

export default AnonymousNavbar;