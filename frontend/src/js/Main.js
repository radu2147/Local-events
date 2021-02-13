import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const Main = () => {

    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("");

    const obj = filter === "" ? "" : "?title=" + filter;

    useEffect(() => {
        let url;
        if(filter === '')
            url = 'http://localhost:8079/api/events/get';
        else
            url = 'http://localhost:8079/api/events/filter' + obj;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(rez => rez.json())
            .then(rez => {
                setEvents(rez);
            })
            .catch((e) => console.error(e));
    }, [filter, setEvents]);

    
    return (
    <div className="main">
        <div className="filter">
            <h2>
                Cauta evenimente
            </h2>
            <input onChange={e => setFilter(e.target.value)} type="text" size="10"/>
        </div>
        <div className="events">
            {events.map(e => <EventCard title={e.title} date={e.date} price={e.price}/>)}
        </div>
        <div>Logo made by https://www.freelogodesign.org/</div>
    </div>
    )
};

export default Main;