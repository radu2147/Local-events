import React from "react";
import { Link } from "react-router-dom";

const UserOptionsNavbar = () => {
    return (
        <div className="options">
            <a href="/profile/saved">
                <li>
                    Salvate
                </li>
            </a>
            <a href="/profile/my-events">
                <li>
                    Evenimentele mele
                </li>
            </a>

            <a className="auth-btn add-event" href="/profile/add-event">
                Adauga evenimente
            </a>
        </div>
    )
}

export default UserOptionsNavbar;