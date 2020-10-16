import React from 'react'
import './LeaderBoard.css'

const LeaderBoard=(props)=>{
    
    return (
        <h2 className="Entry">{props.idx+1}. {props.name}: {props.score}</h2>
    )
}

export default LeaderBoard