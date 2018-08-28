import React from "react";
import ReactDOM from "react-dom";
import SwatchList from "./SwatchList";
import "./style.css";

var destination = document.querySelector("#container");

ReactDOM.render(
    <div>
        <SwatchList/>
    </div>,
    destination
);