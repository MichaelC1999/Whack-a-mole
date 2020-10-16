import React, {Component} from 'react'
import Start from './Start'
import EnterGame from './EnterGame/EnterGame'
import GameOver from './GameOver/GameOver'
import {Route, Switch, Redirect} from 'react-router-dom'
import './Console.css'

class Console extends Component {

    render(){
        return (
            <div className="Console">
                
                <Switch>
                    <Route path="/" exact component={Start} />
                    <Route path="/play/" component={EnterGame} />
                    <Route path="/game-over/" exact component={GameOver}/>
                    <Redirect from="/new-game" to="/" />
                </Switch>
            </div>
        )
    }
}

export default Console