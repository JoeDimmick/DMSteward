import React, {useContext, useState} from 'react'
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

export default function EncounterMonster(props) {

    let [modalOpen, setModalOpen] = useState(false)

    const history = useHistory()

    const mon = props.monster;

    return (
        <>
            <div className="">
                <h3></h3>
                <div className="">
                    <p>CR: </p>
                    <button onClick={() => history.push(`/monsters/${mon.id}`)}>Details</button>
                    <button>-</button>
                </div>
            </div>
        </>
    )
}