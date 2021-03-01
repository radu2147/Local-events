import { formatDate } from "date-utils-2020";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const validateDate = (dateStart, dateEnd) => {
    if(!dateEnd) return true;
    return dateStart < dateEnd;
}

const validateHour = (hour) => {
    const args = hour.split(':');
    return args[0] < 24 && args[0] >= 0 && args[1] < 60 && args[1] >= 0;
}

const UpdateEvent = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [location ,setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [data, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [endDate, setEndDate] = useState("");
    const [link1, setLink1] = useState("");  
    const [link2, setLink2] = useState("");
    const [dateError, setDateError] = useState("");
    const [hourError, setHourError] = useState("");

    const history = useHistory();
    const token = window.localStorage.getItem('token');

    const submit = (e) => {
        e.preventDefault();
        if(!validateDate(data, endDate)){
            setDateError("Data de sfarsit nu poate fi inainte de data de inceput");
            return;
        };
        if(!validateHour(hour)){
            setHourError("Ora incorecta");
            return;
        }

        setDateError("");
        setHourError("");
        
        const date = data + 'T' + hour;
        fetch('http://localhost:8079/api/events/update', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                authorization: "Bearer " + token
            },
            body: JSON.stringify({id, title, location, description, price, date, endDate, link1, link2})
        })
            .then(t => t.json())
            .then(_ => {
                history.push('/profile/my-events');
            })

    };

    useEffect(() => {
        fetch('http://localhost:8079/api/events/get/' + id)
            .then(e => e.json())
            .then(e => {
                setTitle(e.title);
                setDescription(e.description);
                setHour(formatDate(e.date, "hh:mm"));
                setLink1(e.link1)
                setLink2(e.link2);
                setLocation(e.location);
                setPrice(e.price);
                setEndDate(e.endDate);
                setDate(formatDate(e.date, "yyyy-MM-dd"));
            })
    }, [])

    return (
        <div className="main-canvas">
            <form onSubmit={submit} className = "auth-form">
                <div className="mesaj">
                    <h1>
                        Adauga un eveniment
                    </h1>
                </div>
                <div className="input-login">
                    <h6><b>Titlu*</b></h6>
                    <input required type="text" onChange={ e => setTitle(e.target.value) } value={title} placeholder="Titlu" maxLength="30" />
                </div>
                <div className="input-login">
                    <h6><b>Descriere*</b></h6>
                    <textarea required type="text" onChange={ e => setDescription(e.target.value) } value={description} placeholder="Descriere" />
                </div>
                <div className="input-login">
                    <h6><b>Pret (Gol inseamna gratuit)</b></h6>
                    <input type="number" onChange={ e => setPrice(e.target.value) } value={price} placeholder="Pret" />
                </div>
                <div className="input-login">
                    <h6><b>Locatie*</b></h6>
                    <input required type="text" onChange={ e => setLocation(e.target.value) } value={location} placeholder="e.g. Bacau, Parcul Catedralei" maxLength="50"/>
                </div>
                <div className="input-login">
                    <h6><b>Data*</b></h6>
                    <input required type="date" onChange={ e => setDate(e.target.value) } value={data} placeholder="LL/ZZ/AAAA" maxLength="20"/>
                </div>
                <div className="input-login">
                    <h6><b>Data sfarsit</b></h6>
                    <input required type="date" onChange={ e => setEndDate(e.target.value) } value={endDate} placeholder="LL/ZZ/AAAA" maxLength="20"/>
                    <h6 className="error-text">{dateError}</h6>
                </div>
                <div className="input-login">
                    <h6><b>Ora evenimentului*</b></h6>
                    <input required type="text" onChange={ e => setHour(e.target.value) } value={hour} placeholder="HH:MM" maxLength="5"/>
                    <h6 className="error-text">{hourError}</h6>
                </div>
                <div className="input-login">
                    <h6><b>Link 1</b></h6>
                    <input type="text" onChange={ e => setLink1(e.target.value) } value={link1} placeholder="Aa" maxLength="100"/>
                </div>
                <div className="input-login">
                    <h6><b>Link 2</b></h6>
                    <input type="text" onChange={ e => setLink2(e.target.value) } value={link2} placeholder="Aa" maxLength="100"/>
                </div>
                <button className="auth-btn login" value="submit">Salveaza eveniment</button>
            </form>
        </div>
    )

};

export default UpdateEvent;