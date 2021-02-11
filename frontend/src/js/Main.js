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
            {users.map(e => <EventCard title={e.title} date={e.date} />)}
        </div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
    )
};

export default Main;