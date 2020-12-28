import React from "react";
import '../App.css';


function Buttons(props) {
  return (
     <section className="light">
        <label>
            <input type="radio" name="light" value="1" onChange={props.changed} defaultChecked></input>
            <span className="design"></span>
            <span className="text">1</span>
        </label>

        <label>
            <input type="radio" name="light" value="2" onChange={props.changed}></input>
            <span className="design"></span>
            <span className="text">2</span>
        </label>

        <label>
            <input type="radio" name="light" value="3" onChange={props.changed}></input>
            <span className="design"></span>
            <span className="text">3</span>
        </label>
        <label>
            <input type="radio" name="light" value="4" onChange={props.changed}></input>
            <span className="design"></span>
            <span className="text">4</span>
        </label>
    </section>
  );
}
export default Buttons; 