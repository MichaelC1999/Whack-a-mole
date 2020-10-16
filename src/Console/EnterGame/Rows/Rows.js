import React, { Component } from 'react'
import './Rows.css'
import Hole from './Holes/Hole'

class Rows extends Component{
    
    state={
        holeNum: null
    }

    componentDidMount(){
        this.changeSpot()
    }

    changeSpot=()=>{
        
        let random = Math.floor(Math.random() * Math.floor(5));
        while(random===this.state.holeNum){
            random = Math.floor(Math.random() * Math.floor(5));
        }
        console.log("Spot changed ", this.state.holeNum, random)
        this.setState({holeNum: random})
        
    }

    render() {
        
        let holes = [0,1,2,3,4]
        
        let row = holes.map(idx => {
            /*if holeNum is equal to index has mole is true */
            
            let moleRender = false
            if(this.state.holeNum===idx){
                
                moleRender=true
                
            }
            
            return (
            <Hole
                key = {idx.toString()}
                changeSpot={this.changeSpot}
                hasMole={moleRender}/>
        )})


        return (
            <div className="Row">
                {row}
            </div>
        )
    }
}

export default Rows