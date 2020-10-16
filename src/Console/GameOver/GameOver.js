import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './GameOver.css'
import axios from 'axios'
import LeaderBoard from './LeaderBoard/LeaderBoard'
import Loading from '../../UI/Loading/Loading'
import {connect} from 'react-redux'

class Start extends Component {
    constructor(props){
        super(props)
        this.state={
            highScore:0,
            loaded: false,
            names: [],
            scores: []
        }
    }

    componentDidMount(){

//get scores, puch into an array
//get names, push into an array
//if current score is higher than the last score in the array, or array length is less than/equal to 10,
//map scores array until current score is higher than array index score
//take the index, push score into that spot in the array
//push name into the same index of the names array
//if length of both arrays>10, pop out the last index of the names array and score array
//for length of each array, render index, name, and score
//take the index of new score+1, and say congrats you got xth place
        
        if(this.state.loaded===false){
            console.log("state.loaded is false")
            let gameResult = {
                score: parseInt(this.props.score),
                name: (this.props.name)
            }
            const scoresArr = []
            const namesArr = []
            axios.get('https://whack-a-mole-87c44.firebaseio.com/records.json')
                .then(highScores=>{
                    console.log("RECORDS RECEIVED", highScores)
                    let hashKey = Object.keys(highScores.data)[0]
                    let objectBase=(highScores.data[hashKey])
                    Object.keys(objectBase).map(idx=>{
                        return scoresArr.push(objectBase[idx].score)
                    })
                    Object.keys(objectBase).map(idx=>{
                        return namesArr.push(objectBase[idx].name)
                    })
                    
                    console.log(scoresArr, namesArr)
                    console.log(scoresArr[scoresArr.length-1])
                    //Below line, if there is a new record, update database
                    console.log(scoresArr.length)
                    if(gameResult.score>scoresArr[scoresArr.length-1]||scoresArr.length<10){
                        console.log("Game score is higher than last of array")
                        console.log("or array length is less than 10")
                        

                        for(let i = 0; i<scoresArr.length; ++i){
                            console.log(scoresArr[i], gameResult.score>scoresArr[i])
                            if(gameResult.score>scoresArr[i]){
                                console.log('found index of spot to insert ', i)
                                //perhaps issue with where score gets indexed?
                                scoresArr.splice(i, 0, gameResult.score)
                                namesArr.splice(i, 0, gameResult.name)
                                break;
                            }
                        }

                        
                        while(scoresArr.length>10&&namesArr.length>10){
                            scoresArr.pop()
                            namesArr.pop()
                        }

                        console.log(this.state.loaded)
                
                        this.setState({loaded: true}, ()=>console.log(this.state.loaded))

                        //best way to manage this would be to delete the last object, and modify 
                        //the indexes below the score to be at one less spot
                        axios.delete('https://whack-a-mole-87c44.firebaseio.com/records.json')
                            .then(res=>{
                                console.log("Deleted ", res)
                                let game=[]
                                for(let i = 0; i<scoresArr.length; ++i){
                                    
                                    game[i]={
                                        score: parseInt(scoresArr[i]),
                                        name: namesArr[i],
                                        idx: i
                                    }
                                    //Posting each time in a for loop isnt working, not in order
                                    //Maybe for loop or map into an object and then post the object to the server
                                    
                                }
                                axios.post('https://whack-a-mole-87c44.firebaseio.com/records.json', game)
                                    .then(scores => {
                                        console.log(scores)
                                        console.log("posted")
                                        
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                    })

                            })
                  
                    }else{
                        this.setState({loaded:true})
                    }
                    
                    this.setState({names: namesArr}, ()=>console.log(this.state.names))
                    this.setState({scores: scoresArr}, ()=>console.log(this.state.scores))
                    //move delete and post functions into callback functions, saved into methods. 
                    //move these setStates as callback functions of the functions that run after 
                    //the arrays are manipulated and placed into proper spot in their arrays
                
                })
                
            }
            
    }
    
    render(){
        console.log(this.state)
        let summary=<Loading />
        let again=null
        if(this.state.loaded===true){
            summary = this.state.scores.map((score, index)=>{
                console.log(score)
                return <LeaderBoard idx={index} name={this.state.names[index]} score={score} />
            })
            again=<Link to="/play"><button>PLAY AGAIN</button></Link>
        }
        

        return (
            <div className="End">
                <h1>Game OVER! Your score was {this.props.score}</h1>
                {summary}
                {again}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        score: state.score,
        name: state.name
    }
}

export default connect(mapStateToProps)(Start)