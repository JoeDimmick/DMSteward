import React, {useContext, useState, Link} from "react";
import {MonsterContext} from "./MonsterList";
import {useHistory, useParams} from "react-router-dom";
import Modal from "react-modal";
import {toast} from "react-toastify";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

export default function MonsterDetails(props) {
    console.log(props);
    let {
        monsters, setMonsters,
        authenticated, setAuthenticated
    } = useContext(MonsterContext);

    let {monid} = useParams();

    const mon = props.monster;
    let monster = monid ? monsters.find(mon => mon.id == monid) : {};
    let [modalOpen, setModalOpen] = useState(false);


    const deleteMonster = () => {

        fetch(`/api/monsters/${monster.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(() => {
            toast("Successfully Deleted", {
                onClose: () => {
                    document.location = "/monsters";
                }
            });

            setModalOpen(false);
        }).catch((error) => {
            toast("Failed to delete", {
                onClose: () => {
                    document.location = "/monsters";
                }
            });
        });
    };

    const history = useHistory();

    return (
        <MonsterContext.Provider value={{
            monsters, setMonsters,
            authenticated, setAuthenticated
        }}>
            <>
                <div id="card_expanded">

                    <div className="heading">
                        <div className="poster">
                            <img src={monster.img_url} alt={monster.name}/>
                        </div>
                        <section className="meta">
                        <div className="vertical5050">
                            <div className="attribute-block">
                                <h1>{monster.name}</h1>
                                <h2>{monster.meta}</h2>
                                <p><strong>Challenge: </strong>{monster.challenge} </p>
                            </div>
                            <div className="attribute-block">
                                <p><strong>Armor Class: </strong> {monster.armor_class} </p>
                                <p><strong>Hit Points: </strong> {monster.hit_points} </p>
                                <p><strong>Speed: </strong>{monster.speed} </p>
                                <p><strong>Saving Throws: </strong>{monster.saving_throws} </p>
                            </div>
                        </div>
                        <div className="vertical5050">
                            <div className="attribute-block">
                                <p><strong>STR: </strong> {monster.str}</p>
                                <p><strong>STR MOD: </strong> {monster.str_mod}</p>
                                <p><strong>DEX: </strong>{monster.dex}</p>
                                <p><strong>DEX MOD: </strong>{monster.dex_mod}</p>
                                <p><strong>CON: </strong>{monster.con}</p>
                                <p><strong>CON MOD: </strong>{monster.con_mod}</p>
                            </div>
                            <div className="attribute-block">
                                <p><strong>INT: </strong>{monster.int}</p>
                                <p><strong>INT MOD: </strong>{monster.int_mod}</p>
                                <p><strong>WIS: </strong>{monster.wis}</p>
                                <p><strong>WIS MOD: </strong>{monster.wis_mod}</p>
                                <p><strong>CHA: </strong>{monster.cha}</p>
                                <p><strong>CHA MOD: </strong>{monster.cha_mod}</p>
                            </div>
                            <div className="attribute-block">
                            <p><strong>Skills: </strong>{monster.skills} </p>
                            <p><strong>Senses: </strong>{monster.senses} </p>
                            <p><strong>Languages: </strong>{monster.languages} </p>
                        </div>
                        </div>
                        </section>
                    </div>
                    <div className="block">

                        <p><strong>Traits: </strong>{monster.traits} </p>
                        <p><strong>Actions: </strong>{monster.actions} </p>
                        <p><strong>Legendary Actions: </strong>{monster.legendary_actions} </p>
                    </div>
                    <div className="block-footer">
                        <button
                            className="primary"
                            onClick={() => history.push(`/monsters/${monster.id}/edit`)}
                        >
                            Edit
                        </button>
                        <button className="primary" onClick={() => {
                            if (authenticated) setModalOpen(true);
                            else document.location = "/signin";
                        }}>Delete
                        </button>
                    </div>
                </div>
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    style={customStyles}
                    contentLabel="Are you sure?"
                >
                    <p>Are you sure you want to delete this monster?</p>
                    <button className="primary" onClick={deleteMonster}>
                        Confirm Delete
                    </button>
                    <button className="primary" onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                </Modal>
            </>
        </MonsterContext.Provider>
    );
}