import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

const Main = () => {

    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("");
    const [pret, setPret] = useState("Toate");
    const [time, setTime] = useState("Toate");

    

    useEffect(() => {
        let url;
        const fil = filter === "" ? "" : "title=" + filter + "&";
        const pr = pret === "Toate" ? "" : "price=" + pret + "&";
        const tm = time === "Toate" ? "" : "time=" + time;

        const obj = fil + pr + tm;

        if(obj === '&&')
            url = 'http://localhost:8079/api/events/get';
        else
            url = 'http://localhost:8079/api/events/filter?' + obj;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(rez => rez.json())
            .then(rez => {
                setEvents(rez);
            })
            .catch((e) => console.error(e));
    }, [filter, time, pret, setEvents]);

    
    return (
    <div className="main">
        <div className="filter">
            <h2>
                Filtre
            </h2>
            <div className="filter-inputs">
                <div className="input">
                    <div className="label">Titlu</div>
                    <input onChange={e => setFilter(e.target.value)} type="search" size="20" placeholder="E.g. Untold" defaultValue=""/>
                </div>
                <div className="input">
                    <div className="label">Pret</div>
                    <select size="1" onChange={e => setPret(e.target.value)}>
                        <option>
                            Toate
                        </option>
                        <option>
                            Gratis
                        </option>
                        <option>
                            Cu plata
                        </option>
                    </select>
                </div>
                <div className="input">
                    <div className="label">Data</div>
                    <select onChange={e => setTime(e.target.value)}>
                        <option>
                            Toate
                        </option>
                        <option>
                            Astazi
                        </option>
                        <option>
                            Saptamana aceasta
                        </option>
                        <option>
                            Luna aceasta
                        </option>
                        <option>
                            Mai tarziu
                        </option>

                    </select>
                </div>
            </div>
        </div>
        <hr/>
        <div className="events">
            {events.map(e => <EventCard title={e.title} date={e.date} price={e.price}/>)}
        </div>
        
    </div>
    )
};

export default Main;