import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './App.css';
//import Buttons from "./components/Radios";
import AddNameTags from "./components/Nametags";



function MainMenu(props){
  const [roundsCount, setRoundsCount] = useState('');
  const [players, setPlayers] = useState(1);
  const [visible, setVisible] = useState(true);

  const handleInput = event => {
    setRoundsCount(event.target.value);  
  };

  const handleInput2 = event => {
      setPlayers(event.target.value);
  }

  const checkValidInputs = () => {
    if(isNaN(roundsCount) || roundsCount < 1 || roundsCount > 50){
      alert("Syötä kierrosten määrä! (1-50)")
    }
    else if(isNaN(players) || players < 1 || players > 8){
      alert("Anna oikea määrä pelaajia! (1-8)")
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
        <div className="MainMenu">
            <h1>Welcome to the Quiz!</h1>
            <p> Choose the amount of rounds and players</p>
            <form className="settings">
              <p>Players (1-8):</p>
              <label className="players">
                <input type="text" onChange={handleInput2} onKeyPress={handleKeypress}></input>
              </label>
              <p>Rounds (1-50):</p>
               <label className="rounds">
                <input type="text" onChange={handleInput} onKeyPress={handleKeypress}></input>
              </label>
              <button className="start" type="submit" onClick={checkValidInputs}>Let's go!</button>
            </form>
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
ReactDOM.render(<MainMenu />, document.getElementById('root')
);
