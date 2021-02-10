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
    <>
    {users.map(e => <EventCard title={e.title} date={e.date} />)}
    </>
    )
};

export default Main;