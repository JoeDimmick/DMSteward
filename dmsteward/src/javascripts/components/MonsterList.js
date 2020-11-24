import React, { createContext, useEffect, useState } from 'react'
import Monster from './Monster'
import MonsterDetails from './MonsterDetails'
import {Route, Switch, Link, Redirect, useHistory} from 'react-router-dom'
import MonsterForm from './MonsterForm'
import 'react-dropdown/style.css';
import {useCookies} from "react-cookie";

export const MonsterContext = createContext()

export default function MonsterList(){

    const [monsters, setMonsters] = useState();
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    let [authenticated, setAuthenticated] =
        useState(cookie.token !== undefined)
    const history = useHistory()

    useEffect(()=> {
        if(!monsters){
            fetch('/api/monsters',{
                credentials: 'same-origin',
            })
                .then(response => response.text())
                .then((data)=> {
                    setMonsters(JSON.parse(data, (key, value) =>{
                        return value
                    }))
                })
                .catch(console.error)
        }
    })

    if(!monsters) return <p>Loading ...</p>

    return (
        <MonsterContext.Provider value={{monsters, setMonsters,
            authenticated, setAuthenticated}}>
            <div className="pull-content-right">
                <Route path="/monsters">
                    <button className="primary" onClick = {
                        () => {
                            history.push('/monsters/new')
                        }
                    }>Add Monster</button>
                </Route>
            </div>
            <main>
                <Switch>
                    <Route exact path="/monsters">
                        {monsters.map((mon,i)=>{
                            return <Monster key={mon.id} monster={mon}/>
                        })}
                    </Route>
                    <Route  path="/monsters/new"><MonsterForm></MonsterForm></Route>
                    <Route path="/monsters/:cid/edit"><MonsterForm></MonsterForm></Route>
                    <Route path="/monsters/:cid"><MonsterDetails></MonsterDetails></Route>
                    <Route path="/signup"><SignupForm></SignupForm></Route>
                    <Redirect from="" to="/monsters"/>
                    <Route path="*"><ErrorNotFound></ErrorNotFound></Route>
                </Switch>
            </main>
        </MonsterContext.Provider>
    )
}