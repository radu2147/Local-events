import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import EventCard from "./EventCard";
import Loading from "./Loading";

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
        return (
            <Loading />
        )
    }
    if(events.length === 0){
        return (
            <div className="main-canvas">
                <div className="target">
                    <div className="elements">
                        <h1>Nu ai adaugat niciun eveniment</h1>
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