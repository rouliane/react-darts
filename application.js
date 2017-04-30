import React from 'react';
import ReactDOM from 'react-dom';
import CutThroatGame from './components/cricket-cut-throat.jsx';

var playerList = [
    //{'name': 'Player 1', points: 0, isCurrentPlayer: false, 'hits': [{'hit': {'score':15}}, {'hit': {'score':20}}, {'hit': {'score':15}}]},
    {'name': 'Player 1', points: 0, isCurrentPlayer: false, 'hits': []},
    {'name': 'Player 2', points: 0, isCurrentPlayer: false, 'hits': []},
    {'name': 'Player 3', points: 0, isCurrentPlayer: false, 'hits': []},
];

var cutThroatHits = [
    {'score': 6, 'label': 6},
    {'score': 5, 'label': 5},
    {'score': 4, 'label': 4},
    {'score': 3, 'label': 3},
    {'score': 2, 'label': 2},
    {'score': 1, 'label': 1},
    {'score': 25, 'label': 'Bull'},
];

ReactDOM.render(
    <CutThroatGame players={playerList} hits={cutThroatHits} />,
    document.getElementById('container')
);
