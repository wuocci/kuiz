import React from "react";
import ReactDOM from 'react-dom';
import './App.css';
import MainMenu from "./components/MainmenuPlayers";


function App() {
    return(
          <MainMenu></MainMenu>
    );
}

export default App
ReactDOM.render(<App />, document.getElementById('root')
);
