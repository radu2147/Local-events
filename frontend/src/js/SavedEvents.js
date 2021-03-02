import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const SavedEvents = ({ user }) => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8079/api/events/get-saved-events/' + page, {
            headers:{
                "Content-Type": "application/json",
                authorization: "Bearer " + window.localStorage.getItem('token')
            }
        })
        .then(e => e.json())
        .then(e => {
            setEvents(e.events);
            setPageSize(e.pageSize)
            setLoading(false);
        })
    },[setEvents, setLoading, page]);

    if(loading){
        return <Loading />
    }
    if(events.length == 0 && page === 1){
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
            <div className="pagination">
                {page > 1 ? (
                    <span>
                        <Link to={window.location.pathname} onClick={e => setPage(page - 1)}>
                            &larr;
                        </Link>
                    </span>
                    ) : <></>
                }
                <span>
                    Page {page}
                </span>
                {events.length > 0 && pageSize === events.length ? (
                    <span>
                        <Link to={window.location.pathname} onClick={e => setPage(page + 1)}>
                            &rarr;
                        </Link>
                    </span>
                    ) : <></>
                }
            </div>
        </div>
    )
}

export default SavedEvents;