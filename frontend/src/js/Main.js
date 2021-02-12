import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const Main = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
            fetch('http://localhost:8079/api/events/get')
                .then(rez => rez.json())
                .then((rez) => setUsers(rez));
    }, [setUsers]);

    console.log(users)
    return (
    <div className="main">
        <div className="events">
            {users.map(e => <EventCard title={e.title} date={e.date} price={e.price}/>)}
        </div>
        <div>Logo made by https://www.freelogodesign.org/</div>
    </div>
    )
};

export default Main;