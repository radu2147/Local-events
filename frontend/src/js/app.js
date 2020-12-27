import React, { cloneElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [message, setMessage] = useState("Test");
    useEffect(() => {
        fetch("http://localhost:8080/api")
        .then(e => e.json())
        .then(e => {
            setMessage(e.message)
        })

    }, [])
    return <p>{message}</p>
}
ReactDOM.render(<App/>, document.getElementById('root'));