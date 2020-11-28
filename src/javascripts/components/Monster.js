import React, { useContext, useState } from 'react'
import{ useHistory } from 'react-router-dom'
import { MonsterContext } from './MonsterList'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

export default function Monster(props){

    let { monsters, setMonsters, authenticated, setAuthenticated  } = useContext(MonsterContext)
    let [modalOpen, setModalOpen] = useState(false)

    const history = useHistory()
    const mon = props.monster

    return (
        <>
            <div className="card">
                <img src={mon.img_url} alt={mon.name}/>
                <h1>{mon.name}</h1>
                <p>{mon.meta}</p>
                <p className="desc">
                    <strong>Hit Points: </strong>
                    {mon.hit_points}
                    <br></br>
                    <strong>Armor Class: </strong>
                    {mon.armor_class}
                </p>
                <ul className="extra">
                    <li>Saving Throws: {mon.saving_throws}</li>
                    <li>Speed: {mon.speed}</li>
                </ul>
                <button className="primary" onClick={()=> history.push(`/monsters/${mon.id}`)}>See More</button>
                <p>Challenge: {mon.challenge}</p>
            </div>
        </>
    )
}