import React, { useEffect } from "react";
import { useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import {formatDate} from "date-utils-2020";
import Loading from "./Loading";

const EventPage = () => {

    const [event, setEvent] = useState({});
    const mesaj = event.price === 0.0 ? "Gratis" : event.price + " RON";
    let {id} = useParams();
    const [saved, setSaved] = useState(0);
    const [loading, setLoading] = useState(true);

    let history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8079/api/events/get/' + id)
            .then(e => e.json())
            .then(e => {
                setEvent({
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    date: e.date,
                    price: e.price,
                    location: e.location
                });
                setLoading(false);
            });
        fetch('http://localhost:8079/api/events/get-saved/' + id)
            .then(e => e.json())
            .then(e => {
                setSaved(e.savings);
            })
    }, [setEvent, setSaved]);

    const deleteEvent = () => {
        fetch('http://localhost:8079/api/events/delete/' + id, {
                method: "DELETE",

            })
            .then(e => {
                history.push('/profile/my-events');
            })
    }

    const date = formatDate(event.date, "  W, dd-MM-yyyy, hh:mm");

    let all = [];
    if(event.description){
        all = event.description.split('\n');
    }

    if(loading){
        return (
            <Loading />
        )
    }

    return (
        <div className="main-canvas space-top">
            <div className="event-main">
                <div className="event-page-card">
                    <img src={require('../../static/rabbit.jpg')}/>
                    <div className="event-page-small-description">
                        <div className="date">
                            <Icon.Clock color="orange"/>
                            {date}
                        </div>
                        <div>
                            <strong>{event.title}</strong>
                        </div>
                        <div className="event-organizer">
                            de Radu Baston
                        </div>
                        <div className="event-price">
                            {mesaj}
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="event-description">
                    <div className="event-description-text">
                        <h1>Descriere</h1>
                        {all.map(e => <><h4>{e}</h4><br/></>)}
                        <h1>Linkuri:</h1>
                        <h4>
                            <a href="https://www.facebook.com/radu.baston.7/">
                                https://www.facebook.com/radu.baston.7/
                            </a>
                        </h4>
                        <br/>
                    </div>
                    <div>
                        <div className="date">
                            <Icon.GeoAlt color="orange"/>
                            {event.location}
                        </div>
                        <h4 className="saved-by-other">
                            Salvat de alti {saved} oameni
                        </h4>
                        {id == saved ? <button className="auth-btn dark-coral" onClick={_ => deleteEvent()}>Delete</button> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EventPage;