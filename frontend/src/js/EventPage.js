import React, { useEffect } from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";

const EventPage = () => {

    const [event, setEvent] = useState({});
    let {id} = useParams();

    useEffect(() => {
        fetch('http://localhost:8079/api/events/get/' + id)
            .then(e => e.json())
            .then(e => {
                setEvent({
                    id: e.id,
                    title: e.title,
                    description: e.description
                })
            });
    }, [setEvent]);

    return (
        <>
            {event.title}
        </>
    )
};

export default EventPage;