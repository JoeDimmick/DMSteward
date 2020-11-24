import React from 'react'
import MonsterList from './MonsterList'
import { BrowserRouter as Router } from 'react-router-dom'

//main entery for the app.
export default function Main(){
    return (
        <Router>
            <MonsterList/>
        </Router>
    )
}