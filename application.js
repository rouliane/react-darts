var playerList = [
    //{'name': 'Player 1', points: 0, isCurrentPlayer: false, 'hits': [{'hit': {'score':15}}, {'hit': {'score':20}}, {'hit': {'score':15}}]},
    {'name': 'Player 1', points: 0, isCurrentPlayer: false, 'hits': []},
    {'name': 'Player 2', points: 0, isCurrentPlayer: false, 'hits': []},
    {'name': 'Player 3', points: 0, isCurrentPlayer: false, 'hits': []},
];

var cutThroatHits = [
    {'score': 20, 'label': 20},
    {'score': 19, 'label': 19},
    {'score': 18, 'label': 18},
    {'score': 17, 'label': 17},
    {'score': 16, 'label': 16},
    {'score': 15, 'label': 15},
    {'score': 25, 'label': 'Bull'},
];

ReactDOM.render(
    <Game players={playerList} hits={cutThroatHits} />,
    document.getElementById('container')
);
