import React, { useState } from "react";
import '../App.css';
import Info from "./Info";
import AddNameTags from "./Nametags";


function MainMenu(props){
    const [roundsCount, setRoundsCount] = useState('');
    const [players, setPlayers] = useState("");
    const [visible, setVisible] = useState(true);


    const handleInput = event => {
        setPlayers(event.target.value);
    }

    const handleInput2 = event => {
        setRoundsCount(event.target.value);
    }
    

    const checkValidInputs = () => {
        if(isNaN(players) || players < 1 || players > 8){
            alert("Anna oikea määrä pelaajia! (1-8)")
        }
        else if(isNaN(roundsCount) || roundsCount < 1 || roundsCount > 50){
            alert("Syötä kierrosten määrä! (1-50)")
        }
        else{
            setVisible(false);
        }
    } 

    const handleKeypress = e => {
        if (e.keyCode === 13) {    
            checkValidInputs();    
        } 
    };

    if(visible){
        return (
            <div>
                  <Info></Info>
            <div className="MainMenu">
                <h1>KUIZ</h1>
                <p>Let's choose the amount of players and rounds</p>
                <form className="settings">
                    <p>Players (1-8):</p>
                    <label className="players">
                        <input type="text" onChange={handleInput} onKeyPress={handleKeypress}></input>
                    </label>
                    <p>Rounds (1-50):</p>
                    <label className="rounds">
                        <input type="text" onChange={handleInput2} onKeyPress={handleKeypress}></input>
                    </label>
                    <button className="start" type="submit" onClick={checkValidInputs}>READY</button>
                </form>
            </div>
            </div>
        );
        }
    else{
        return(
            <AddNameTags players={players}
            roundsCount = {roundsCount}/>
        );
    }
}

export default MainMenu
