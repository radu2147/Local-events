import React from "react";
import * as Icon from "react-bootstrap-icons";
import {formatDate} from "date-utils-2020";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const EventCard = ({id, title, date, price, user}) => {

    const mesaj = price === 0.0 ? "Gratis" : price + " RON";
    const cssClass = price === 0.0 ? "price" : "price-exists";

    const history = useHistory();

    const useridquery = user ? '&&userid=' + user.id : '';

    const [savedid, setSavedId] = useState(0);

    useEffect(() => {
        if(useridquery){
            fetch('http://localhost:8079/api/userevents/filter?eventid=' + id + useridquery)
                .then(e => e.json())
                .then(e => {
                    if(e){
                        setSavedId(e[0].id);
                    }
                })
        }
    }, [setSavedId]);

    const save = () => {
        if(user){
            
            if(savedid){
                fetch('http://localhost:8079/api/userevents/delete/' + savedid, {
                    method: 'DELETE',
                })
                then(_ => setSavedId(0));
            }
            else{
                console.log(id);
                fetch('http://localhost:8079/api/userevents/create', {
                    method: 'POST',
                    headers:{
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({eventId: id, userId:user.id})
                })
                .then(e => e.json())
                .then(e => {
                    setSavedId(e.id);
                });
            }
        }
        else{
            history.push('/login');
        }
    }

    date = formatDate(date, "  W, dd-MM-yyyy, hh:mm");
    const path = '/event/' + id;
    return (
            <div className="event-card">
                
                <a href={path}>
                    <img className="alt" src={require('../../static/rabbit.jpg')}/>
                </a>
                <div className="small-description">
                    <div className="date">
                        <Icon.Clock color="orange"/>
                        {date}
                    </div>
                    <div className="title">
                        {title}
                    </div>
                    
                </div>
                <div className="save" >
                    
                    <div className={cssClass}>
                        {mesaj}
                    </div>
                    <a href={window.location.pathname} onClick={save}>
                        {savedid > 0 ? <Icon.HeartFill color="red" size="25px" /> :<Icon.Heart color="red" size="25px"/>}
                    </a>
                </div>
            </div>
    )
}

export default EventCard;