import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import EventCard from "./EventCard";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const MyEvents = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8079/api/events/filter-paged?page=' + page + '&&userid=' + user.id)
            .then(e => e.json())
            .then(e => {
                setEvents(e.events);
                setPageSize(e.pageSize);
                setLoading(false);
            }).catch(_ => {
                history.push('/login');
                window.location.reload();
            });
    }, [page, setEvents, setLoading]);

    if(loading){
        return (
            <Loading />
        )
    }
    if(events.length === 0 && page === 1){
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
                {events.map(e => <EventCard id={e.id} title={e.title} date={e.date} price={e.price} user={user} pathfile={e.pathfile}/>)}
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
};

export default MyEvents;