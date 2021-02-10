import React from "react";
import ReactDOM from "react-dom";
import AnonymousNavbar from "./AnonymousNavbar";
import Main from "./Main";

const App = () => {
    return (
        <div>
            <AnonymousNavbar />
            <div className="main">
                <Main />
            <div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'));