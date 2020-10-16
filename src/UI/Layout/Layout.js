import React from 'react'
import './Layout.css'
import Console from '../../Console/Console'
import Nav from './Nav/Nav'

const layout = () => {
    return (
        <div className="Page">
            <Nav />
            <Console />

        </div>
    )
}

export default layout