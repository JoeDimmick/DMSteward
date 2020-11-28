import React, { useContext, useState, Link } from "react";
import { MonsterContext } from "./MonsterList";
import { useHistory, useParams } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";

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
    let { monsters, setMonsters,
        authenticated, setAuthenticated } = useContext(MonsterContext);
    let { monid } = useParams();

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
                <div className="card_expanded">
                    <div>
                        <img src={monster.img_url} alt={monster.name} />
                    </div>
                    <h1>{monster.name}</h1>
                    <h2>{monster.meta}</h2>
                    <ul>
                        <li>
                            Armor Class: <strong>{monster.armor_class}</strong>
                        </li>
                        <li>
                            Hit Points: <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            Speed: <strong>{monster.speed}</strong>
                        </li>
                        <li>
                            STR: <strong>{monster.str}</strong>
                        </li>
                        <li>
                            STR MOD: <strong>{monster.str_mod}</strong>
                        </li>
                        <li>
                            DEX: <strong>{monster.dex}</strong>
                        </li>
                        <li>
                            DEX MOD: <strong>{monster.dex_mod}</strong>
                        </li>
                        <li>
                            CON: <strong>{monster.con}</strong>
                        </li>
                        <li>
                            CON MOD: <strong>{monster.con_mod}</strong>
                        </li>
                        <li>
                            INT: <strong>{monster.int}</strong>
                        </li>
                        <li>
                            INT MOD: <strong>{monster.int_mod}</strong>
                        </li>
                        <li>
                            WIS: <strong>{monster.wis}</strong>
                        </li>
                        <li>
                            WIS MOD: <strong>{monster.wis_mod}</strong>
                        </li>
                        <li>
                            CHA: <strong>{monster.cha}</strong>
                        </li>
                        <li>
                            CHA MOD: <strong>{monster.cha_mod}</strong>
                        </li>
                        <li>
                            Saving Throws: <strong>{monster.saving_throws}</strong>
                        </li>
                        <li>
                            Skills: <strong>{monster.skills}</strong>
                        </li>
                        <li>
                            Senses: <strong>{monster.senses}</strong>
                        </li>
                        <li>
                            Languages: <strong>{monster.languages}</strong>
                        </li>
                        <li>
                            Challenge: <strong>{monster.challenge}</strong>
                        </li>
                        <li>
                            Traits: <strong>{monster.traits}</strong>
                        </li>
                        <li>
                            Actions: <strong>{monster.actions}</strong>
                        </li>
                        <li>
                            Legendary Actions: <strong>{monster.legendary_actions}</strong>
                        </li>
                    </ul>
                    <button
                        className="primary"
                        onClick={() => history.push(`/monsters/${monster._id}/edit`)}
                    >
                        Edit
                    </button>
                    <button className="primary" onClick={() => {
                        if (authenticated) setModalOpen(true);
                        else document.location = "/signin";
                    }}>Delete
                    </button>
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