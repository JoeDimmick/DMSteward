import React, { useContext, useState } from 'react'
import {MonsterContext} from './MonsterList'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    name: yup.string().required(),
    meta: yup.string().required(),
    armor_class: yup.string().required(),
    hit_points: yup.string().required(),
    speed: yup.number().required(),
    str: yup.string().required(),
    str_mod: yup.string().required(),
    dex: yup.string().required(),
    dex_mod: yup.string().required(),
    con: yup.string().required(),
    con_mod: yup.string().required(),
    int: yup.string().required(),
    int_mod: yup.string().required(),
    wis: yup.string().required(),
    wis_mod: yup.string().required(),
    cha: yup.string().required(),
    cha_mod: yup.string().required(),
    saving_throws: yup.string(),
    skills: yup.string(),
    senses: yup.string(),
    languages: yup.string(),
    challenge: yup.string(),
    traits: yup.string(),
    actions: yup.string(),
    legendary_actions: yup.string(),
    img_url: yup.string().url(),
    damage_immunities: yup.string(),
    condition_immunities: yup.string(),
    damage_resistances: yup.string()
})

export default function MonsterForm(){
    let {monsters, setMonsters} = useContext(MonsterContext)
    let {monid} = useParams()

    if(!authenticated){
        document.location='/signin'
        return <></>
    }

    let monster = monid ? monsters.find((mon) => mon._id == monid) : {}
    let is_new = monid === undefined


    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues : is_new ? {
            name: "",
            meta: "",
            armor_class: "",
            hit_points: "",
            speed: "",
            str: "",
            str_mod: "",
            dex: "",
            dex_mod: "",
            con: "",
            con_mod: "",
            int: "",
            int_mod: "",
            wis: "",
            wis_mod: "",
            cha: "",
            cha_mod: "",
            saving_throws: "",
            skills: "",
            senses: "",
            languages: "",
            challenge: "",
            traits: "",
            actions: "",
            legendary_actions: "",
            img_url: "",
            damage_immunities: "",
            condition_immunities: "",
            damage_resistances: ""
        } : {...monster},
        validationSchema,
        onSubmit(values){
            fetch('/api/monsters', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then(() => {
                toast('Successfully submitted', {
                    onClose: () =>{
                        document.location = "/monsters"
                    }
                })
            }).catch((error) => {
                toast('Failed to submit', {
                    onClose: () => {
                        document.location = "/monsters"
                    }
                })
            })
        }
    })

    const history = useHistory()

    return(
        <form onSubmit = {handleSubmit}>
            <h1>Adding/Editing a Monster</h1>
            <div className = "field">
                <label htmlFor= "name">Name</label>
                <div className="control">
                    <input type="text" name="name" value={values.name} onChange={handleChange}/>
                    <VHelp message={errors.name}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "meta">Meta</label>
                <div className="control">
                    <input type="text" name="meta" value={values.meta} onChange={handleChange}/>
                    <VHelp message={errors.meta}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "armor_class">AC</label>
                <div className="control">
                    <input type="text" name="armor_class" value={values.armor_class} onChange={handleChange}/>
                    <VHelp message={errors.armor_class}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "hit_points">HP</label>
                <div className="control">
                    <input type="text" name="hit_points" value={values.hit_points} onChange={handleChange}/>
                    <VHelp message={errors.hit_points}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "speed">Speed</label>
                <div className="control">
                    <input type="text" name="speed" value={values.speed} onChange={handleChange}/>
                    <VHelp message={errors.speed}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "str">STR</label>
                <div className="control">
                    <input type="text" name="str" value={values.str} onChange={handleChange}/>
                    <VHelp message={errors.str}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "str_mod">STR Mod</label>
                <div className="control">
                    <input type="text" name="str_mod" value={values.str_mod} onChange={handleChange}/>
                    <VHelp message={errors.str_mod}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "dex">DEX</label>
                <div className="control">
                    <input type="text" name="dex" value={values.dex} onChange={handleChange}/>
                    <VHelp message={errors.dex}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "dex_mod">DEX Mod</label>
                <div className="control">
                    <input type="text" name="dex_mod" value={values.dex_mod} onChange={handleChange}/>
                    <VHelp message={errors.dex_mod}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "con">CON</label>
                <div className="control">
                    <input type="text" name="con" value={values.con} onChange={handleChange}/>
                    <VHelp message={errors.con}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "con_mod">CON Mod</label>
                <div className="control">
                    <input type="text" name="con_mod" value={values.con_mod} onChange={handleChange}/>
                    <VHelp message={errors.con_mod}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "int">INT</label>
                <div className="control">
                    <input type="text" name="int" value={values.int} onChange={handleChange}/>
                    <VHelp message={errors.int}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "wis">WIS</label>
                <div className="control">
                    <input type="text" name="wis" value={values.wis} onChange={handleChange}/>
                    <VHelp message={errors.wis}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "wis_mod">WIS Mod</label>
                <div className="control">
                    <input type="text" name="wis_mod" value={values.wis_mod} onChange={handleChange}/>
                    <VHelp message={errors.wis_mod}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "cha">CHA</label>
                <div className="control">
                    <input type="text" name="cha" value={values.cha} onChange={handleChange}/>
                    <VHelp message={errors.cha}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "cha_mod">CHA Mod</label>
                <div className="control">
                    <input type="text" name="cha_mod" value={values.cha_mod} onChange={handleChange}/>
                    <VHelp message={errors.cha_mod}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "saving_throws">Saving Throws</label>
                <div className="control">
                    <input type="text" name="saving_throws" value={values.saving_throws} onChange={handleChange}/>
                    <VHelp message={errors.saving_throws}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "skills">Skills</label>
                <div className="control">
                    <input type="text" name="skills" value={values.skills} onChange={handleChange}/>
                    <VHelp message={errors.skills}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "senses">Senses</label>
                <div className="control">
                    <input type="text" name="senses" value={values.senses} onChange={handleChange}/>
                    <VHelp message={errors.senses}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "languages">Languages</label>
                <div className="control">
                    <input type="text" name="languages" value={values.languages} onChange={handleChange}/>
                    <VHelp message={errors.languages}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "challenge">Challenge</label>
                <div className="control">
                    <input type="text" name="challenge" value={values.challenge} onChange={handleChange}/>
                    <VHelp message={errors.challenge}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "traits">Traits</label>
                <div className="control">
                    <input type="text" name="traits" value={values.traits} onChange={handleChange}/>
                    <VHelp message={errors.traits}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "actions">Actions</label>
                <div className="control">
                    <input type="text" name="actions" value={values.actions} onChange={handleChange}/>
                    <VHelp message={errors.actions}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "legendary_actions">Legendary Actions</label>
                <div className="control">
                    <input type="text" name="legendary_actions" value={values.legendary_actions} onChange={handleChange}/>
                    <VHelp message={errors.legendary_actions}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "img_url">Image</label>
                <div className="control">
                    <input type="text" name="img_url" value={values.img_url} onChange={handleChange}/>
                    <VHelp message={errors.img_url}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "damage_immunities">Damage Immunities</label>
                <div className="control">
                    <input type="text" name="damage_immunities" value={values.damage_immunities} onChange={handleChange}/>
                    <VHelp message={errors.damage_immunities}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "condition_immunities">Condition Immunities</label>
                <div className="control">
                    <input type="text" name="condition_immunities" value={values.condition_immunities} onChange={handleChange}/>
                    <VHelp message={errors.condition_immunities}/>
                </div>
            </div>
            <div className = "field">
                <label htmlFor= "damage_resistances">Damage Resistances</label>
                <div className="control">
                    <input type="text" name="damage_resistances" value={values.damage_resistances} onChange={handleChange}/>
                    <VHelp message={errors.damage_resistances}/>
                </div>
            </div>
            <div className="control">
                <button className="primary" type="submit">Submit</button>
                <button className="primary"onClick={() =>history.push('/monsters')}>Cancel</button>
            </div>
        </form>
    )
}