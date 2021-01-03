import React, { useState, useLayoutEffect , useEffect } from "react";
import '../App.css';
import MainMenu from "../index";
import PlayerNav from "./PlayerList";
import loader from "./visuals/circles.svg";
import Overtime from "./OverTime";
import VictoryScreen from "./VictoryScreen";

function Game({playerList, roundsCount, playerList2}, props){

    /* Statet */
    const [gameTime, setGameTime] = useState(false);
    const [quitFlag, setQuitFlag] = useState(false);
    const [round, setRound] = useState(1);
    const [playerCounter, setPlayer] = useState(0);
    const [count, setCount] = useState(1); 
    const [sessionToken, setToken] = useState("");
    const [questionOnScreen] = useState([]);
    const [questionCounter, setCounter] = useState(0);
    const [loading, setLoading] = useState(true);
    const [winnerList] = useState([]);

    // Pari muuttujaa kjeh
    var findChars = ['&amp;','&quot;','&#039;', '&lt;', '&gt;', '&reg;', '&copy;', '&euro;', '&cent;', '&pound;', '&deg;', '&prime;', '&lsquo;' ,'&rsquo;',  '&sbquo;', '&ldquo;', '&rdquo;',  '&bdquo', '&tilde;' ,'&acute;', '&uml;', '&eacute;'];
    var replaceChars = ['&', '"', "'", '<', '>', '®', '©', '€', '¢', '£', '°', '′',  "‘", "’", "‚", '“',  '”', '„', '˜', '´', '¨' , 'é'] ;
 
    /* Lataamisruudulle setTimeout effecti */
    useEffect(() => {
        setTimeout(() => setLoading(false), 5000)
      }, [])


    /* 
     * Uselayouteffectit API kutsuille. 
     * 
     * Ekana haetaan sessio tokeni, jonka pitäis varmistaa, että ei tuu samaan sessioon samoja kysymyksiä.
     * 
     * Sit haetaan 10 kyssäriä kerralla seuraavassa API kutsussa, kunhan ollaa saatu päivitettyä
     * setToken -state tokenilla.
     * 
     * Sessio tokeniin ei tuu depenciessejä, koska halutaan hakee vaan kerran se. Sen pitäis riittää koko
     * sessioon. Kategoriavaraustosin ehkä pitää ottaa huomioon myöhemmin.
     * 
     * Kyssäreitä haetaan joka rundilla uudet 10kpl ni eipähän pääse loppumaan kesken.
     * 50 kyssäriä pystyis kerralla noutaa, mut mennään tolla 10kpl ni pitäis riittää ainakin kaikille
     * eikä kuormittais ihan älyttömästi.
     */
    useLayoutEffect(() => {
        async function fetchToken() {
            const response = await fetch('https://opentdb.com/api_token.php?command=request');
            if(response.status === 200){
                const data = await response.json();
                setToken(data.token);  
            }
         }
        fetchToken();
    }, [])


    useLayoutEffect(() => {
        async function fetchQuestion() {
            const fetchedQuestion = await fetch('https://opentdb.com/api.php?amount=10&token=' + sessionToken);
            const questionData = await fetchedQuestion.json();
            if(questionData.response_code === 0){
                questionData.results.map((result) => questionOnScreen.push(result));
            }
        }
        fetchQuestion();
    },[round, sessionToken])


    /*
     * Metodi, joka korvaa merkkejä vakio enkoodaamismuodosta. Tänki varmaan vois tehä järkevämmin, mut 
     * tähän mennes aika hyvin tulee oikeita merkkejä. 
     *
     */
    const replaceStr = (str, find, replaceChars) => {
        for (var i = 0; i < find.length; i++) {
            str = str.replace(new RegExp(findChars[i], 'gi'), replaceChars[i]);
        }
        return str;    
    }


    /*
     * Vastausten rekisteröinnille metodi. Metodi tarkastaa oikean vastauksen ja vertaa sitä klikattuun
     * painikkeeseen.
     * 
     * Jos on oikea vastaus ni kutsutaan pisteenlisäys metodia, pelaajalaskuria ja kysymys-
     * laskuria. Muutetaan painettu näppäin pariks sekunniks vihreeks setTimeoutilla.
     * 
     * Väärästä vastauksesta verrataan vastauksia ja vaihdetaan näppäimien värit ja näytetään tällein oikea vastaus
     * Oikee vastaus pitää ettiä noista näppäimistä ni sen takia ihan klassinen for-looppi. Lopuks kutsutaan
     * pelaajalaskuria ja kysymyslaskuria.
     *
     */

    const answeredQuestion = (event) => {
        const theAnswer = event.target.value; //klikattu painike.

        var buttons = document.getElementsByClassName("answer"); //lista vastauspainikkeista.

        if(theAnswer === replaceStr(questionOnScreen[questionCounter].correct_answer, findChars, replaceChars)){
            setTimeout(() => {
                event.target.style.backgroundColor = "#16167ae4";
                setCounter(questionCounter+1);
                addPoints();
                playerCounterMethod();
            }, 2000);
            event.target.style.backgroundColor = "#0cbe0c";
            
        }     
        else{
            for(var i = 0; i < buttons.length; i++){
                if(buttons[i].value == replaceStr(questionOnScreen[questionCounter].correct_answer, findChars, replaceChars)){
                    var buttonColour = buttons[i];
                    event.target.style.backgroundColor = "#e40c2b";
                    buttonColour.style.backgroundColor = "#0cbe0c";    
                }
                else{
                    event.target.style.backgroundColor = "#e40c2b";
                }
            }
            setTimeout(() => {
                event.target.style.backgroundColor = "#16167ae4";
                if(buttonColour !== undefined){
                    buttonColour.style.backgroundColor = "#16167ae4";
                }
                else{
                    console.log("Täs oli undefined");
                }
                setCounter(questionCounter+1);
                playerCounterMethod();
            }, 2000); 
        }
    }  

    /*
     * Pistelaskurimetodi. Vertaillaan kahta eri pelaajalistaa keskenään, jotta löydetään oikea
     * pelaaja, jolle pisteet tulee. Ei jostain syystä toiminut syvä kopiointi tosta pelaajalistasta
     * mikä on listaolio. Tän takia tein jo alussa toisen listan pelkille nimille :D
     */
    const addPoints = () => {
        for(let i in playerList) {
            if(playerList[i].name == playerList2[playerCounter]){
             playerList[i].points = playerList[i].points + 1;
            }
        }
    }

    /* 
    * Rundilaskuri
    */   
    const roundCounter = () => {
        setRound(round + 1);
    }

    /*
    *  Pelaajalaskuri, laskee pelaajan vuoron
    * nollaantuu aina rundin alussa
    */
    const playerCounterMethod = () => {
        if(count === playerList.length){
            setPlayer(0);
            setCount(1);
            roundCounter();
        }
        else{
            setPlayer(playerCounter + 1);
            setCount(count + 1);
        }
    }

    /* 
     * Lippumetodi pelin aloittamiseen 
     */
    const startTheGame = () => {
        setGameTime(true);
    }

    /* 
     * Lippumetodi siihen, että pelaaja päättää palata
     * mainmenuun.
     */
    const goBack = () => {
        setQuitFlag(true);
    }

    /*
     * Metodissa tsekataan, jos käyttäjä painaa enteriä aloittaakseen pelin
     * (ei toimi tässä komponentissa, vaikka muissa toimii :D)
    */
    const handleKeypress = e => {
        if (e.keyCode === 13) {      
           startTheGame();   
        } 
     };

    
    const checkScore = () => {
        var maxPoints = Math.max.apply(Math, playerList.map(o => o.points));
        if(maxPoints == 0 || isNaN(maxPoints)){
            if(playerList.length == 1){
                winnerList.push(playerList[0]);
            }
        }
        else{   
            for(var i = 0; i < playerList.length; i++){
                if(playerList[i].points == maxPoints){
                    if(!winnerList.includes(playerList[i])){
                        winnerList.push(playerList[i])
                    }
                }
            }
        }
    }



    /* RENDERIT TÄSSÄ */
    
    /* 
     * Jos peliä ei ole vielä aloitettu, näytetään alotusruutu / kysymysten latausruutu.
     * latausruutu toteutettu setTimeoutilla. 
     */
    if(!gameTime && !quitFlag){
        return(
            <>
            {loading === false ? (
            <div className='startDiv'>
                <h5>Press the Start Game -button when ready</h5>
                <p>You can also go back and change the settings of the game.</p>
                <button className='startGame' type="submit" onClick={startTheGame} onKeyPress={handleKeypress}>START GAME!</button>
                <button className='goBack' onClick={goBack}>MAIN MENU</button>
            </div> 
              ) : (<div className="loader"> 
                  <img className="loadingImg"src={loader} alt="Loading"></img>
                <h2>Loading the questions...</h2>
                </div> 
            )}</>
        );
    }

    //Jos käyttäjä on painanut go back -painiketta niin palataan mainmenuun.
    else if(quitFlag){
        return(
            <MainMenu/>
        )
    }

    // Jos päätetään alottaa peli niin rendaillaan kysymykset listasta ja oikeat vastauspainikkeet näkyviin. 
    // Pelaajalistat tulee kans näkyviin komponenttikutsulla tuolla alempana.
    else{
        if(roundsCount >= round){
            console.log(questionOnScreen);
            const answeList = [];
            var correctAnswer = questionOnScreen[questionCounter].correct_answer;
            var theQuestion = questionOnScreen[questionCounter].question;
            theQuestion = replaceStr(theQuestion, findChars, replaceChars);
            questionOnScreen[questionCounter].incorrect_answers.map((answer) => answeList.push(answer));
            answeList.push(correctAnswer);
            for(var i = 0; i < answeList.length; i++){
                answeList[i] = replaceStr(answeList[i], findChars, replaceChars);
            } 
            answeList.sort(() => .5 - Math.random() );
            return(
                 <div className="gameDiv">
                    <div className='playerNav'>
                         <PlayerNav playerList={playerList}/>
                     </div>
                     <div className="questionsBox">
                         <h2>ROUND {round} / {roundsCount}</h2>
                         <h3><span> {playerList2[playerCounter] + "'s"} </span> turn</h3>
                        <p>Category: {questionOnScreen[questionCounter].category}</p>
                        <p>{theQuestion}</p>
                        <div className ="answerButtons">
                            {answeList.map((answer, index) => 
                            <button className="answer" value={answer} key={index} onClick={answeredQuestion}>{answer}</button>)}
                        </div>
                    </div>  
                </div>
            );
        }
        else{ 
            checkScore();
            if(winnerList.length == 1){
                return(
                    <div>
                        <VictoryScreen playerList = {playerList}
                        winnerList = {winnerList}/>
                    </div>
                );
            }
            else{
                return(
                    <Overtime playerList = {playerList}
                    winnerList = {winnerList}
                    questionOnScreen = {questionOnScreen}
                    findChars = {findChars}
                    replaceChars = {replaceChars}
                    playerList2 = {playerList2}
                    />
                )
            }
        }
    }
}
export default Game;