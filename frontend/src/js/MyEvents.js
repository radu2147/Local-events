import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import EventCard from "./EventCard";


const MyEvents = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8079/api/events/filter?userid=' + user.id)
            .then(e => e.json())
            .then(e => {
                setEvents(e);
                setLoading(false);
            });
    }, [setEvents, setLoading]);

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
                {events.map(e => <EventCard id={e.id} title={e.title} date={e.date} price={e.price} user={user}/>)}
            </div>
        </div>
    )
};

export default MyEvents;