import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState("Test");
    const [name, setName] = useState("");
    const [text, setText] = useState(""); 
    useEffect(() => {
        fetch("http://localhost:8080/test")
        .then(e => e.json())
        .then(e => {
            setMessage(e.message)
        })

    }, [])
    const postFunc = (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
        axios.post('http://localhost:8080/api/add-comms',{
               method: "POST",
               headers: headers,
               username: name,
               text: text
        }
        )
        .then(e => console.log(e))
            
    }

    const deleteInstance = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:8080/api/delete/2')
            .then(e => console.log(e));
    }

    return (
        <div>
            <p>{message}</p>
            <form onSubmit={postFunc}>
                <input name="commName" type="text" placeholder="Nume" onChange={e => {setName(e.target.value);}}/>
                <input name="commText" type="text" placeholder="Text" onChange={e => setText(e.target.value)}/>
                <button type="submit" value="submit">Buna</button>
            </form>
            <button value="submit" onClick={deleteInstance}>Sterge</button>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));