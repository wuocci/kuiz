import React, { useState } from "react";
import '../App.css';
//import winnerSVG from "./visuals/"
import Confetti from "react-confetti";
import MainMenu from "./MainmenuPlayers";

function VictoryScreen({playerList, winnerList}) {

    const [mainMenu, setmainMenu] = useState(false);

    const buttonClick = () => {
       setmainMenu(true);
    }
    if(!mainMenu){
        return(
            <div className="wScreen">
                <div className="splash">
                    <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    opacity={0.9}
                    gravity={0.07}
                    />
                </div>
                <h2>THE WINNER IS: <span>{playerList[0].name}</span> WITH POINTS: {playerList[0].points} </h2>
                <h3>SCOREBOARD: {playerList.map((player, index) => <li key={player.id}>{[index + 1] + "." + player.name} ..... {player.points}</li>)} </h3>
                <button className="returnMain" onClick={buttonClick}>Back to Main Menu</button>
            </div>
        );
    }
    else{
        return(
            <MainMenu></MainMenu>
        );
    }
}

export default VictoryScreen