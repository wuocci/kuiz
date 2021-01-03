import React, {useState} from "react";
import '../App.css';
import infopng from "./visuals/info.png";

function Info(){
    const[infoToggle, setToggle] = useState(false);

    const handleClick = (event) => {
      setToggle(!infoToggle);
    }
    if(infoToggle){
        return(
            <div className="infoBar">
                <button type="button" className="infoButton" onClick={handleClick}>
                        <img alt="infobutton" src={infopng}></img>
                </button>
                <p>
                    The rules are simple: <br></br>
                    1. First choose the amount of players and rounds. <br></br>
                    2. Answer the questions correctly to get points. The player with the most points wins. <br></br>
                    3. If points are even the sudden death rounds will be initiated.

                </p>
            </div>
        )
    }
    else{
        return(
            <div className="infoBar">
            <button type="button" className="infoButton" onClick={handleClick}>
                <img alt="infobutton" src={infopng}></img>
            </button>
        </div>
        )
    }
}
export default Info