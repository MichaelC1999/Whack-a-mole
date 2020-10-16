import React, {Component} from 'react'
import './Mole.css'

class Mole extends Component{
    
    componentDidMount(){
        setTimeout(this.props.missed, 1300)
    }

    render(){
        return(
            <div className="Mole" onClick={this.props.clicked}>

            </div>
        )
    }
}

export default Mole