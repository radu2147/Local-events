import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import Loading from "./Loading";
import UserContext from "./UserContext";

const Main = () => {

    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("");
    const [pret, setPret] = useState("Toate");
    const [time, setTime] = useState("Toate");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [user, _] = useContext(UserContext);

    console.log(events.length);

    

    useEffect(() => {
        let url;
        const fil = filter === "" ? "" : "title=" + filter + "&";
        const pr = pret === "Toate" ? "" : "price=" + pret + "&";
        const tm = time === "Toate" ? "" : "time=" + time;

        const obj = fil + pr + tm;

        if(obj === '' || obj === "&&")
            url = 'http://localhost:8079/api/events/get-paged/' + page;
        else
            url = 'http://localhost:8079/api/events/filter-paged?page=' + page + '&&' + obj;

        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
            .then(rez => rez.json())
            .then(rez => {
                setEvents(rez.events);
                setPageSize(rez.pageSize);
                setLoading(false);
            })
            .catch((e) => console.error(e));
    }, [filter, time, pret, setEvents, page, setLoading]);
    
    return (
    <div className="main">
        <div className="filter">
            <h2>
                Filtre
            </h2>
            <div className="filter-inputs">
                <div className="input">
                    <div className="label">Titlu</div>
                    <input onChange={e => {setFilter(e.target.value); setLoading(true); setPage(1);}} type="search" size="20" placeholder="E.g. Untold" defaultValue=""/>
                </div>
                <div className="input">
                    <div className="label">Pret</div>
                    <select size="1" onChange={e => {setPret(e.target.value); setLoading(true); setPage(1);}}>
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
                    <select onChange={e => {setTime(e.target.value); setLoading(true); setPage(1);}}>
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
        {
            loading ? <Loading /> : (
            <div className="events">
                {events.map(e => <EventCard id={e.id} title={e.title} date={e.date} price={e.price} user={user}/>)}
            </div>
            )
        }
        <div className="pagination">
            {page > 1 ? (
                <span>
                    <Link to="" onClick={e => setPage(page - 1)}>
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
                    <Link to="" onClick={e => setPage(page + 1)}>
                        &rarr;
                    </Link>
                </span>
                ) : <></>
            }
        </div>
        
    </div>
    )
};

export default Main;