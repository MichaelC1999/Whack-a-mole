import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

class Nav extends Component{
    render() {
        return (
            <nav className="Bar">
                <ul>
                    <li><Link to="/new-game" className="Item">Start game</Link></li>
                    <li><a href="https://github.com/MichaelC1999/Whack-a-mole-game">Project</a></li>
                </ul>
            </nav>
        )
    }
}

export default Nav