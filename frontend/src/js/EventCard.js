import React from "react";
import * as Icon from "react-bootstrap-icons";
import {formatDate} from "date-utils-2020";

const EventCard = ({title, date, price}) => {

    const mesaj = price === 0.0 ? "Gratis" : price + " RON";
    const cssClass = price === 0.0 ? "price" : "price-exists";

    date = formatDate(date, "  W, dd-MM-yyyy, hh:mm");
    return (
        <div className="event-card">
            <img className="alt" src={require('../../static/rabbit.jpg')}/>
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
                <a href="/">
                    <Icon.Heart color="red" size="25px"/>
                </a>
            </div>
        </div>
    )
}

export default EventCard;