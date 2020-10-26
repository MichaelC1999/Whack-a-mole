import React, {Component} from 'react'
import './Mole.css'

class Mole extends Component{
    
    componentDidMount(){
        setTimeout(this.props.missed, 1300)
    }

    render(){
        return(
            <div className="spotCovered" onClick={this.props.clicked}>
                <div className="Mole">

                </div>
            </div>
            
        )
    }
}

export default Mole