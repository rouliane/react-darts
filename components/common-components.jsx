import React from 'react';

export class Actions extends React.Component
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

export class Keyboard extends React.Component
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

class KeyboardHit extends React.Component
{
    render()
    {
        return (<button type="button" className="btn btn-primary col-xs-3 col-sm-3 col-md-2 col-lg-2 keyboard-hit text-center" onClick={() => this.props.onClick()}>{this.props.label}</button>);
    }
}