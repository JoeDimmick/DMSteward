import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {MonsterContext} from './MonsterList'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default function Monster(props) {
    let {
        encounter, setEncounter
    } = useContext(MonsterContext)
    const history = useHistory()
    const mon = props.monster
    let background = mon.img_url
    return (
        <>
            <div className="item">
                <h3>{mon.name}</h3>
                <div className="item-body">
                    <p>CR: {mon.challenge}</p>
                    <button className="primary-sm" onClick={() => history.push(`/monsters/${mon.id}`)}>Details</button>
                    <button className="primary-sm" onClick={() => props.onClick(mon)}>+
                    </button>
                </div>
            </div>
        </>
    );
}