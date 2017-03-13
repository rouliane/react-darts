class Actions extends React.Component
{
	render()
	{
		return (
			<div className="actions clearfix">
				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><button type="button" id="revert-turn" className="btn btn-default">Revert turn</button></div>
				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><button type="button" id="cancel-hit" className="btn btn-default" onClick={() => this.props.onCancelHitClick()}>Cancel hit</button></div>
				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><button type="button" id="next-player" className="btn btn-success" onClick={() => this.props.onNextPlayerClick()}>Next Player</button></div>
			</div>
		);
	}
}

class KeyboardHit extends React.Component
{
	render()
	{
		return (<button type="button" className="btn btn-primary col-xs-3 col-sm-3 col-md-2 col-lg-2 keyboard-hit text-center" onClick={() => this.props.onClick()}>{this.props.label}</button>);
	}
}

class Keyboard extends React.Component
{
	render()
	{
		return (
			<div className="keyboard clearfix">
				{this.props.hits.map(function(hit) {
					return (<KeyboardHit value={hit.score} label={hit.label} onClick={() => this.props.onClick(hit)}/>);
				}, this)}
			</div>
		);
	}
}

class BoardHit extends React.Component
{
	render()
	{
		return (<td>a</td>);
	}
}

class PlayerRow extends React.Component
{
	render()
	{
	    var cssClass = this.props.player.isCurrentPlayer ? 'current' : 'inactive';
	    return (
	        
			<tr className={cssClass}>
				<td className="text-right">{this.props.player.name}</td>
				{this.props.hits.map(function(hit) {
					var playerHitNumber = 0;
					this.props.player.hits.forEach(function(playerHit) {
						if(playerHit.hit.score == hit.score && playerHitNumber <= 2)
						{
							playerHitNumber ++;
						}
					});

					
					var content = '';
					switch(playerHitNumber)
					{
					    case 1:
					        // content = '\u{1F949}';
					        content = '_';
					        break;
					    case 2:
					        // content = '\u{1F948}';
					        content = '\\';
					        break;
					    case 3:
					        // content = '\u{1F947}';
					        content = 'X';
					        break;
					}
					return (<td className="text-center">{content}</td>);
				}, this)}
				<td className="text-center">{this.props.player.points}</td>
			</tr>
		);
	}
}

class Board extends React.Component
{
	render()
	{
		return (
			<table className="board table table-striped table-bordered table-condensed">
				<thead>
					<tr>
						<th className="text-right">Players</th>
						{this.props.hits.map(function(hit) {
							return (<th className="text-center">{hit.label}</th>);
						})}
						<th className="text-center">Points</th>
					</tr>
				</thead>
				<tbody>
					{this.props.players.map(function(player) {
						return (
							<PlayerRow hits={this.props.hits} player={player}/>
						);
					}, this)}
				</tbody>
			</table>
		);
	}
}

class Game extends React.Component
{
	constructor()
	{
		super();
		this.state = {
			currentPlayer: null,
			currentPlayerIndex: null,
			currentPlayerTurnHitNumber: null,
			players: null,
		};
	}

	componentWillMount()
	{
		this.state.players = this.props.players;
		var firstPlayer = this.state.players[0];
		firstPlayer.isCurrentPlayer = true;
		this.state.currentPlayer = firstPlayer;
		this.state.currentPlayerIndex = 0;
		this.state.currentPlayerTurnHitNumber = 0;
	}

	handleHit(hit)
	{
		const TURN_MAX_HIT = 9;

		if(this.isGameEnded())
		{
			return;
		}

		if(this.state.currentPlayerTurnHitNumber >= TURN_MAX_HIT)
		{
			return;
		}

		var currentPlayerTurnHitNumber = this.state.currentPlayerTurnHitNumber;

		if(this.isPlayerHitScoreClosed(this.state.currentPlayer, hit.score))
		{
			this.impactOtherPlayerPoints(hit.score, false);
		}

		this.state.currentPlayer.hits.push({hit});

		currentPlayerTurnHitNumber ++;

		this.setState({
			currentPlayer: this.state.currentPlayer,
			currentPlayerTurnHitNumber: currentPlayerTurnHitNumber,
		});
	}

	isGameEnded()
	{
		var isGameEnded = false;

		this.state.players.forEach(function(player)
		{
			if(! this.isPlayerHasUnclosedScores(player) && isGameEnded === false)
			{
				isGameEnded = true;
			}
		}, this);

		return isGameEnded;
	}

	isPlayerHasUnclosedScores(player)
	{
		var isPlayerHasUnclosedScores = false;
		this.props.hits.forEach(function(hit)
		{
			if(! this.isPlayerHitScoreClosed(player, hit.score))
			{
				isPlayerHasUnclosedScores = true;
			}
		}, this);

		return isPlayerHasUnclosedScores;
	}

	getPlayerHitNumber(player, hitScore)
	{
		var playerHitNumber = 0;
		player.hits.forEach(function(playerHit)
		{
			if(playerHit.hit.score == hitScore)
			{
				playerHitNumber ++;
			}
		});

		return playerHitNumber;
	}

	isPlayerHitScoreClosed(player, hitScore)
	{
		const NUMBER_MAX_HIT = 3;

		return this.getPlayerHitNumber(player, hitScore) >= NUMBER_MAX_HIT;
	}

	impactOtherPlayerPoints(points, substract)
	{
		this.state.players.forEach(function(player)
		{
			if(this.state.currentPlayer != player && ! this.isPlayerHitScoreClosed(player, points))
			{
				if(substract === false)
				{
					player.points += points;
				}
				else if(player.points > 0)
				{
					player.points -= points;
				}
			}
		}, this);

		this.setState({
			players: this.state.players,
		});
	}

	handleNextPlayer()
	{
		var nextPlayerIndex = this.state.currentPlayerIndex + 1;

		if(this.state.currentPlayerIndex === this.state.players.length - 1)
		{
			var nextPlayerIndex = 0;
		}

		this.state.currentPlayer.isCurrentPlayer = false;
		this.state.players[nextPlayerIndex].isCurrentPlayer = true;

		this.setState({
			currentPlayerIndex: nextPlayerIndex,
			currentPlayer: this.state.players[nextPlayerIndex],
			currentPlayerTurnHitNumber: 0,
		});
	}

	handleCancelHit()
	{
		var currentPlayerTurnHitNumber = this.state.currentPlayerTurnHitNumber;

		if(currentPlayerTurnHitNumber <= 0)
		{
			return;
		}

		currentPlayerTurnHitNumber --;

		var hit = this.state.currentPlayer.hits[this.state.currentPlayer.hits.length - 1]['hit'];

		if(this.isPlayerHitScoreClosed(this.state.currentPlayer, hit.score))
		{
			this.impactOtherPlayerPoints(hit.score, true);
		}

		this.state.currentPlayer.hits.pop();

		this.setState({
			currentPlayerTurnHitNumber: currentPlayerTurnHitNumber,
			currentPlayer: this.state.currentPlayer,
		});
	}

	render()
	{
		return (
			<div>
			<h1>Darts</h1>
			<Board players={this.state.players} hits={this.props.hits}/>
			<Keyboard hits={this.props.hits} onClick={(hit) => this.handleHit(hit)}/>
			<Actions onNextPlayerClick={() => this.handleNextPlayer()} onCancelHitClick={() => this.handleCancelHit()}/>
			</div>
		);
	}
}
