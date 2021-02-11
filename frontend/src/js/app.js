import React from "react";
import ReactDOM from "react-dom";
import AnonymousNavbar from "./AnonymousNavbar";
import Main from "./Main";

const App = () => {
    return (
        <div>
            <AnonymousNavbar />
            <Main />
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));