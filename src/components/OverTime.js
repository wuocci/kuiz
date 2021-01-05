import React, { useState, useEffect } from "react";
import PlayerNav from "./PlayerList";
import loader from "./visuals/puff.svg";
import '../App.css';
import VictoryScreen from "./VictoryScreen";

function Overtime({playerList, winnerList, questionOnScreen, findChars, replaceChars}){
    //STATET
    const [round, setRound] = useState(1);
    const [playerCounter, setPlayer] = useState(0);
    const [count, setCount] = useState(1); 
    const [loading, setLoading] = useState(true);
    const [newQuestCounter, setCounter] = useState(0);
    const [questionList, setList] = useState([]);
    const [questionChecker, setCheck] = useState([]);
    const [visible, setVisible] = useState(true);
    const [points] = useState(Math.max.apply(Math, winnerList.map(o => o.points)));
    var winnerList2 = [];



    useEffect(() => {
        setTimeout(() => setLoading(false), 8000)
      }, []);

    const playerCounterMethod = () => {
        setCounter(newQuestCounter + 1);
        if(count === winnerList.length){
            setPlayer(0);
            setCount(1);
            roundCounter();
        }
        else{
            setPlayer(playerCounter + 1);
            setCount(count + 1);
        }
    }

    const pickQuestions = () => {
        var listLen = questionOnScreen.length -round;
        var stopFlag = false;
        for(var i = listLen; i > 0; i--){
            if(stopFlag){
                break;
             }
            else{
                var pickedCategory = questionOnScreen[i].category;
                console.log(pickedCategory);
                var categoryList = questionOnScreen.filter(category => category.category == pickedCategory);
                console.log(categoryList);
                if(categoryList.length >= winnerList.length){
                    for(var j = categoryList.length -1; j > 0; j--){
                        var question = categoryList[j];
                        if(!questionChecker.includes(question)){
                            if(winnerList.length > questionList.length){
                                questionList.push(question);
                                questionChecker.push(question);
                            }
                            else{
                                stopFlag = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    const addPoints = () => {
        for(let i in playerList) {
            if(playerList[i].name == winnerList[playerCounter].name){
                //playerList[i].points = playerList[i].points + 1;
                winnerList[i].points = winnerList[i].points + 1;
            }
        }
    }


    const roundCounter = () => {
        setList([]);
        console.log(checkScore());
        if(checkScore() == false){
            setRound(round + 1);
        }
        else{
            setVisible(false);
        }
    }

    const replaceStr = (str, find, replaceChars) => {
        for (var i = 0; i < find.length; i++) {
            str = str.replace(new RegExp(findChars[i], 'gi'), replaceChars[i]);
        }
        return str;    
    }


    const checkScore = () => {
        var maxPoints = Math.max.apply(Math, winnerList.map(o => o.points));
        if(isNaN(maxPoints)){
           alert("Error in points count, sorry!")
        }
        else if(maxPoints == points){
            return false;
        }
        else{
           winnerList2 = winnerList.filter(player => player.points == maxPoints);
           console.log(winnerList2);
           if(winnerList2.length > 1){
                for(let j in winnerList){
                    if(winnerList[j].points != maxPoints){
                        console.log(winnerList);
                        winnerList.splice(j, 1) 
                        console.log(winnerList);
                    }
                }
                if(winnerList.length == 1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return true;
            }
        }
    }


    const answeredQuestion = (event) => {
        const theAnswer = event.target.value; //klikattu painike.

        var buttons = document.getElementsByClassName("answer"); //lista vastauspainikkeista.

        if(theAnswer === replaceStr(questionList[playerCounter].correct_answer, findChars, replaceChars)){
            setTimeout(() => {
                event.target.style.backgroundColor = "#16167ae4";
                addPoints();
                playerCounterMethod();
            }, 2000);
            event.target.style.backgroundColor = "#0cbe0c";
            
        }     
        else{
            for(var i = 0; i < buttons.length; i++){
                if(buttons[i].value == replaceStr(questionList[playerCounter].correct_answer, findChars, replaceChars)){
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
                playerCounterMethod();
            }, 2000); 
        }
    }
    pickQuestions(); 
    console.log(winnerList);
    console.log(questionList);
    console.log(questionChecker);
    const answeList = [];
    var correctAnswer = questionList[playerCounter].correct_answer;
    var theQuestion = questionList[playerCounter].question;
    theQuestion = replaceStr(theQuestion, findChars, replaceChars);
    questionList[playerCounter].incorrect_answers.map((answer) => answeList.push(answer));
    answeList.push(correctAnswer);
    for(var i = 0; i < answeList.length; i++){
        answeList[i] = replaceStr(answeList[i], findChars, replaceChars);
    } 
    answeList.sort(() => .5 - Math.random() );
    if(visible){
        return(
            <>
            {loading === false ? (
            <div className="gameDiv">
            <div className='playerNav'>
                    <PlayerNav playerList={playerList}/>
                </div>
                <div className="questionsBox">
                    <h2>ROUND {round} </h2>
                    <h3><span> {winnerList[playerCounter].name + "'s"} </span> turn</h3>
                <p>Category: {questionList[playerCounter].category}</p>
                <p>{theQuestion}</p>
                <div className ="answerButtons">
                    {answeList.map((answer, index) => 
                    <button className="answer" value={answer} key={index} onClick={answeredQuestion}>{answer}</button>)}
                </div>
            </div>  
            </div>
        ) : (<div className="loader"> 
                    <img className="loadingImg" src={loader} alt="loader"></img>
                        <h2>Preparing for the SUDDEN DEATH rounds. GET READY!</h2>
                        <h3> PLAYERS IN SUDDEN DEATH ROUNDS: {winnerList.map((player) => <p>{player.name}</p>)} </h3>
                    </div> 
            )}</>
        );
    }
    else{
        return(
            <VictoryScreen
                playerList = {playerList}
                winnerList = {winnerList}
            ></VictoryScreen>
        );
    }
    
}


export default Overtime