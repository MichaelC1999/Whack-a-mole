import React, {Component} from 'react'
import './EnterGame.css'
import Rows from './Rows/Rows'
import {connect} from 'react-redux'
import * as actionTypes from '../../Store/actions'

class EnterGame extends Component {
    
    state={
        danger: 1,
        playOn: true
    }

    componentWillMount = () => {
        this.setState({danger: 1})
        this.props.zeroScore()
    }

    componentWillUpdate = () => {
        this.gameOverCheck()
    }

    gameOverCheck =() => {
        if((this.props.missed-this.props.score)>(25*this.state.danger)){
            this.setState({danger: this.state.danger+1})
            if(this.state.danger>5){
                this.setState({playOn: false}, ()=> this.props.history.push('/game-over/'))
            }
        }
    }

    render(){    

        let gameBoard=(
            <div>
                <div className="Status">
                    <h1 className="Items">{this.props.score}</h1>
                    <div className="Items">
                        <div><h3>DANGER</h3><h4>{this.state.danger-1}/5</h4></div>
                    </div>
                    </div>
                <div className="Play-Space">
                    <Rows key={'1'}/>
                    <Rows key={'2'}/>
                    <Rows key={'3'}/>
                    <Rows key={'4'}/>
                    <Rows key={'5'}/>
                </div>
            </div>)
        
        
        if(this.state.playOn===false){
            gameBoard=null
        }

        return (
            <div className="Game">
                {gameBoard}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        score: state.score,
        missed: state.missed
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        zeroScore: () => dispatch({type: actionTypes.ZERO})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterGame)