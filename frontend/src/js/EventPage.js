import React, { useEffect } from "react";
import { useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import {formatDate} from "date-utils-2020";
import Loading from "./Loading";
import { useContext } from "react";
import { Image } from "cloudinary-react";
import UserContext from "./UserContext";

const interval = ({date, endDate}) =>{
    if(!endDate){
        return formatDate(date, "  W, dd-MM-yyyy, hh:mm");
    }
    let startMonth = formatDate(date, "MM");
    let endMonth = "";
    let day = formatDate(date, "dd");
    let endDay = "";
    let hour = formatDate(date, "hh:mm");
    let weekStart = formatDate(date, "W");
    let weekEnd = formatDate(endDate, "W");
    endMonth = formatDate(endDate, "MM");
    endDay = formatDate(endDate, "dd");
    if(startMonth == endMonth){
        return weekStart + " " + day + " - " + weekEnd + " " + endDay + "." + startMonth + ", " + hour;
    }
    return day + " " + startMonth + " - " + endDay + " " + endMonth + ", " + hour;
} 


const EventPage = () => {

    const [event, setEvent] = useState({});
    const mesaj = event.price === 0.0 ? "Gratis" : event.price + " RON";
    let {id} = useParams();
    const [saved, setSaved] = useState(0);
    let [user, _] = useContext(UserContext);
    const [links, setLinks] = useState(false);
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
                    location: e.location,
                    link1: e.link1,
                    link2: e.link2,
                    userid: e.userid,
                    endDate: e.endDate,
                    pathfile: e.pathfile
                });
                setLoading(false);
                setLinks(e.link1 != null || e.link2 != null);
            });
        fetch('http://localhost:8079/api/events/get-saved/' + id)
            .then(e => e.json())
            .then(e => {
                setSaved(e.savings);
            })
    }, [setEvent, setSaved, setLinks]);

    const deleteEvent = () => {
        fetch('http://localhost:8079/api/events/delete/' + id, {
                method: "DELETE",

            })
            .then(e => {
                history.push('/profile/my-events');
            })
    }

    const updateEvent = () => {
        history.push('/update-event/' + id);
    }

    const date = interval(event);

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
                    {event.pathfile === null ? <img src={require('../../static/rabbit.jpg')}/> : <Image cloudName="dgjgaz3hj" publicId={event.pathfile} />}
                    
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
                        {links ? <h1>Linkuri:</h1> : <></>}
                            {event.link1 != null ? (
                                <h4>
                                <a href={event.link1}>
                                    {event.link1}
                                </a>
                                </h4>
                            ) : <></>}
                            {event.link2 != null ? (
                                <h4>
                                <a href={event.link2}>
                                    {event.link2}
                                </a>
                                </h4>
                            ) : <></>}
                        
                        <br/>
                    </div>
                    <div className="event-menu">
                        <div className="date">
                            <Icon.GeoAlt color="orange"/>
                            {event.location}
                        </div>
                        <h4 className="saved-by-other">
                            Salvat de alti {saved} oameni
                        </h4>
                        {user && user.id == event.userid ? <button className="auth-btn dark-coral extended" onClick={_ => deleteEvent()}>Delete</button> : <></>}
                        {user && user.id == event.userid ? <button className="auth-btn dark-coral extended" onClick={_ => updateEvent()}>Update</button> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EventPage;