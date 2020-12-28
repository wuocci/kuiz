import React from "react";
import '../App.css';


function PlayerNav({playerList}){
    return(
        <div className="playerList">
                <div className ="names">
                    <p>Player:</p>
                    {playerList.sort((a, b) => a.points < b.points).map((player, index)  =>
                    <li key={player.id}>{[index + 1] + "." + player.name} </li>)} 
                </div>
                <div className ="points">
                    <p>Points:</p>
                    {playerList.sort((a, b) => a.points < b.points).map((player, index)  =>
                    <li key={player.id}>{player.points} </li>)} 
                </div>
        </div>
    );
}

export default PlayerNav;