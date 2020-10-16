import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Start.css'
import * as actionTypes from '../Store/actions'

class Start extends Component {


    changeName = (event) => {
        this.props.nameChange(event.target.value)
    }
    
    render(){
        this.props.zeroScore()
        let playLink =null
        if(this.props.currentName){
            playLink = <Link to={"/play/"}><button style={{margin: '20px'}}>PLAY</button></Link>
            console.log(playLink)
        }
        return (
            <div className="Start">
                <h3 style={{paddingTop: "160px", fontSize: "30px"}}>Enter your name below</h3>
                <input style={{height: "28px", fontSize: "22px", textAlign: "center"}} type="text" onChange={this.changeName} value={this.props.currentName}></input>
                <br />
                {playLink}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        currentName: state.name
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        nameChange: (userName) => dispatch({type: actionTypes.ADD_NAME, name: userName}),
        zeroScore: () => dispatch({type: actionTypes.ZERO})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Start)