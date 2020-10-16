import React, {Component} from 'react'
import './Hole.css'
import Mole from './Mole/Mole'
import * as actionTypes from '../../../../Store/actions'
import {connect} from 'react-redux'

class Hole extends Component{
    
    state = {
        hasMole: false
    }

    componentDidMount(){
        this.hasMoleStateUpdate()
    }

    componentDidUpdate(){
        setTimeout(this.hasMoleStateUpdate, 500)
    }

    hasMoleStateUpdate = () =>{
        
        if(this.props.hasMole===true&&this.state.hasMole===false){
            this.setState({hasMole:true})
        }
    }

    

    moleClickedHandler=()=>{
        this.setState({hasMole:false})
        //Run score update reducer here
        this.props.updateScore()
        this.props.changeSpot()
    }

    missedMole=()=>{
        this.setState({hasMole: false}, ()=>this.props.changeSpot())
        this.props.missedMoleCounter()
    }

    
    
    render() {
        let mole=null

        if(this.state.hasMole===true){
            mole=<Mole clicked={this.moleClickedHandler} missed={this.missedMole}/>
        }

        return (
            <div className="Hole">
                {mole}
            </div>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        updateScore: () => dispatch({type: actionTypes.ADD_SCORE}),
        missedMoleCounter: () => dispatch({type: actionTypes.MISSED_MOLE})
    }
}

export default connect(null, mapDispatchToProps)(Hole)