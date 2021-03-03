import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const AddEvent = () => {
    const [title, setTitle] = useState("");
    const [location ,setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [data, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [endDate, setEndDate] = useState("");
    const [link1, setLink1] = useState("");
    const [link2, setLink2] = useState("");

    const [file, setFile] = useState(null);

    const history = useHistory();
    const token = window.localStorage.getItem('token');

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'n6tdyb00');

        if(file){
            Axios.post('https://api.cloudinary.com/v1_1/dgjgaz3hj/image/upload', formData)
                .then(resp => {
                    const date = data + 'T' + hour;
                    const pathfile = resp.data.secure_url ? resp.data.secure_url : "";
                    fetch('http://localhost:8079/api/events/create', {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json',
                                authorization: "Bearer " + token
                            },
                            body: JSON.stringify({title, location, description, price, date, endDate, link1, link2, pathfile})
                        })
                        .then(t => t.json())
                        .then(_ => {
                            history.push('/profile/my-events');
                        })
                    });
        }
        else{
        
            const date = data + 'T' + hour;
            console.log(endDate);
            fetch('http://localhost:8079/api/events/create', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + token
                },
                body: JSON.stringify({title, location, description, price, date, endDate, link1, link2})
            })
                .then(t => t.json())
                .then(_ => {
                    history.push('/profile/my-events');
                })
        
        }

    }

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
                    <input required type="text" onChange={ e => setTitle(e.target.value) } placeholder="Titlu" maxLength="30" />
                </div>
                <div className="input-login">
                    <h6><b>Descriere*</b></h6>
                    <textarea required type="text" onChange={ e => setDescription(e.target.value) } placeholder="Descriere" />
                </div>
                <div className="input-login">
                    <h6><b>Pret (Gol inseamna gratuit)</b></h6>
                    <input type="number" onChange={ e => setPrice(e.target.value) } placeholder="Pret" />
                </div>
                <div className="input-login">
                    <h6><b>Locatie*</b></h6>
                    <input required type="text" onChange={ e => setLocation(e.target.value) } placeholder="e.g. Bacau, Parcul Catedralei" maxLength="50"/>
                </div>
                <div className="input-login">
                    <h6><b>Data*</b></h6>
                    <input required type="date" onChange={ e => setDate(e.target.value) } placeholder="LL/ZZ/AAAA" maxLength="20"/>
                </div>
                <div className="input-login">
                    <h6><b>Data sfarsit</b></h6>
                    <input type="date" onChange={ e => setEndDate(e.target.value) } placeholder="LL/ZZ/AAAA" maxLength="20"/>
                </div>
                <div className="input-login">
                    <h6><b>Ora evenimentului*</b></h6>
                    <input required type="text" onChange={ e => setHour(e.target.value) } placeholder="HH:MM" maxLength="5"/>
                </div>
                <div className="input-login">
                    <h6><b>Link 1</b></h6>
                    <input type="text" onChange={ e => setLink1(e.target.value) } placeholder="Aa" maxLength="100"/>
                </div>
                <div className="input-login">
                    <h6><b>Link 2</b></h6>
                    <input type="text" onChange={ e => setLink2(e.target.value) } placeholder="Aa" maxLength="100"/>
                </div>
                <div className="input-login">
                    <h6><b>Poza</b></h6>
                    <input type="file" onChange={e => {setFile(e.target.files[0]); console.log(e.target.files[0]);}}/>
                </div>
                <button className="auth-btn login" value="submit">Adauga eveniment</button>
            </form>
        </div>
    )

};

export default AddEvent;