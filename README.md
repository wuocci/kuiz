# KUIZ - the anonymous multiplayer quizin' game.

The game is under development and as it's current state it's a rough but working demo version. The UI at this moment heavily relies on the end-users ability to mirror the screen on a bigger screen either with a Tablet or Laptop. Kuiz should also run with the newest smart tv's. These are the best ways to get out the full potential of the game. The internet is full of multiplayer and single player quizes but most of them require some kind of registration, therefore I wanted to create something similar based on anonymity and easy access. I also wanted to make a side project where I could improve my ReactJS and on the same time make a (fun) party game.

# BASIC GAMEPLAY

In Kuiz you first choose the amount of players (1-8) and rounds to play (1-50). After the game starts questions start to pop on the screen either with 4 or 2 different answer options. At the end, the player who has answered the most of the questions correctly, wins the game. If there is a tie situation after all rounds have been played, the game will automatically initiate sudden death rounds where player has to answer correctly to stay in the game. In normal rounds the questions and categories are randomized, but in the sudden death rounds the category stays the same for every player on the round.

# TECHNICALITIES

Kuiz is made in ReactJS. The questions for the game are being fetched from the API of opentdb.com, which is free to use, user-contributed question database. When a new game session is initiated the game will fetch a session token from the API and then uses the token to get the questions. The session token ensures that there should not be same questions on the same session. 

# POSSIBLE UPDATES

At this moment the game's UI is a little stiff for the end-user and is not accessible to everyone. To make the game accessible and easy-to-use there is a possibility to develop the game with the Socket.io engine. This would enable the session creation for each game. Session creation could generate a code for other players to join in on the same session with their on devices. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
