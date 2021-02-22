import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import EventCard from "./EventCard";


const MyEvents = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = [];
        fetch('http://localhost:8079/api/userevents/filter?userid=' + user.id)
            .then(e => e.json())
            .then(e => {
                saved = e;
            });
    }, [setEvents, setLoading]);

    console.log(events);

    if(loading){
        return <h1>Loading...</h1>
    }
    if(events.length === 0){
        return (
            <div className="main-canvas">
                <div className="target">
                    <div className="elements">
                        <h1>Nu ai adaugat niciun eveniment</h1>
                        <a className="auth-btn login" href="/profile/add-event">Adauga un eveniment</a>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="main-canvas">
            <div className="events">
                {events.map(e => <EventCard title={e.title} date={e.date} price={e.price} user={user}/>)}
            </div>
        </div>
    )
};

export default MyEvents;