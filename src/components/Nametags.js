import React, {useState} from "react";
import '../App.css';
import Game from "./GameTime";


function AddNameTags({players, roundsCount}, props){

    const [playerName, setPlayerName] = useState('');
    const [count, setCount] = useState(1);
    const [playerCount, setPlayerCount] = useState(0);
    const [visible, setVisible] = useState(true);
    const [playerList] = useState([]);
    const [playerList2] = useState([]);


    const addToPlayerList = () => {
        if(playerName === ""){
            alert("Please insert a name!")
        }
        else if(playerList.some(playerN => playerN.name === playerName)){
            alert("The name must be unique!")
        }
        else if(playerName.length > 12){
            alert("The name must be in the range of 1-12 characters!")
        }
        else if(count <= Number(players)){
            playerList2.push(playerName);
            const player = ({id: count, name: playerName, points: 0})
            playerList.push(player);
            if(count === Number(players)){
                setVisible(false);
            }
            playerIncrement();
            if(count < Number(players)){
               incrementCount();
            }
            setPlayerName('');
        }
    }

    const incrementCount = () => {
        setCount(count + 1);
    }

    const playerIncrement = () => {
        setPlayerCount(playerCount + 1);
    }


    const handleInput = event => {
        setPlayerName(event.target.value);  
    }

    const handleKeypress = e => {
        if (e.keyCode === 13) {  
           addToPlayerList();    
           e.stopPropagation();
        } 
     }

     function onsubmit(event) {
        event.preventDefault();
     }


    if(visible){
        return(
            <div className="nametags">
                <h3>Enter name for player: {count} / {players} </h3>
                <form className="addname" onSubmit={onsubmit}>
                    <label className="playerName">
                        <input type="text" value={playerName} onChange={handleInput} onKeyPress={handleKeypress}></input>       
                    </label>   
                    <button className="addPlayer"  type="submit" onClick={addToPlayerList}>ADD PLAYER</button>
                </form>
            </div>
        );
    }
    else{
        return(
            <div>
                <Game roundsCount = {roundsCount}
                playerList = {playerList}
                playerList2 = {playerList2}/>
            </div>
        )
    }
}

export default AddNameTags;