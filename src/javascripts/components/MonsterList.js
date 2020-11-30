import React, {createContext, useEffect, useReducer, useState} from 'react'
import Monster from './Monster'
import MonsterDetails from './MonsterDetails'
import {Route, Switch, Link, Redirect, useHistory} from 'react-router-dom'
import {ErrorNotFound} from './Pages'
import MonsterForm from './MonsterForm'
import 'react-dropdown/style.css';
import {useCookies} from "react-cookie";
import EncounterMonster from "./EncounterMonster";

export const MonsterContext = createContext()

export default function MonsterList() {


    const [monsters, setMonsters] = useState();
    const [encounter, setEncounter] = useState(initialEncounter);
    const initialEncounter = [{}];

    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    let [authenticated, setAuthenticated] =
        useState(cookie.token !== undefined)
    const history = useHistory()

    useEffect(() => {
        if (!monsters) {
            //console.log(monsters);
            fetch('/api/monsters', {
                credentials: 'same-origin',
            })
                .then(response => response.text())
                .then((data) => {
                    //console.log(data);
                    setMonsters(JSON.parse(data, (key, value) => {
                        //console.log(value);
                        return value
                    }))

                })
                .catch(console.error)
            }
    })

    function handleAdd (value){
       setEncounter(value)
    }


    if (!monsters) return <p>Loading ...</p>
    return (
        <MonsterContext.Provider value={
            {encounter, setEncounter,
            monsters, setMonsters,
            authenticated, setAuthenticated}
        }>
            <div className="pull-content-right">
                <Route path="/monsters">
                    <button className="primary" onClick={
                        () => {
                            history.push('/monsters/new')
                        }
                    }>Add Monster
                    </button>
                </Route>
            </div>
            <main>
                <Switch>
                    <Route exact path="/monsters">
                        <section id="monster-list">
                            <div className="inner">
                                {
                                    monsters.map((mon, i) => {
                                        return <Monster onClick={mon =>handleAdd(mon)} key={mon.id} monster={mon}/>
                                    })
                                }
                            </div>
                        </section>
                        <section id="encounter-list">
                            <div className="inner">
                                {
                                    JSON.stringify(encounter)
                                    // encounter.map((mon) => {
                                    //     return <EncounterMonster onClick={mon =>handleAdd(mon)} key={mon.id} monster={mon}/>
                                    // })
                                }
                            </div>
                        </section>
                    </Route>
                    <Route path="/monsters/new"><MonsterForm></MonsterForm></Route>
                    <Route path="/monsters/:monid/edit"><MonsterForm></MonsterForm></Route>
                    <Route path="/monsters/:monid"><MonsterDetails></MonsterDetails></Route>
                    <Redirect from="" to="/monsters"/>
                    <Route path="*"><ErrorNotFound></ErrorNotFound></Route>
                </Switch>
            </main>
        </MonsterContext.Provider>
    )
}