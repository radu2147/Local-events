import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";

const SavedEvents = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8079/api/events/get-saved-events', {
            headers:{
                "Content-Type": "application/json",
                authorization: "Bearer " + window.localStorage.getItem('token')
            }
        })
        .then(e => e.json())
        .then(e => {
            setEvents(e);
            setLoading(false);
        });
    },[setEvents]);

    if(loading){
        return <h1>Loading...</h1>
    }
    if(events.length == 0){
        return (
            <div className="main-canvas">
                <div className="target">
                    <div className="elements">
                        <h1>Nu aveti elemente salvate</h1>
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
}

export default SavedEvents;