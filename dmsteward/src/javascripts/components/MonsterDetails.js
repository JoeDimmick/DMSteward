import React, { useContext, useState, Link } from "react";
import { MonsterContext } from "./MonsterList";
import { useHistory, useParams } from "react-router-dom";
import Monster from "./Monster";
import { format } from "date-fns";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Container, Row, Col } from "reactstrap";

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
    let { monsters, setMonsters, authenticated, setAuthenticated } = useContext(MonsterContext);
    let { cid } = useParams();

    const mon = props.course;
    let monster = monid ? monsters.find(mon => mon.id == monid) : {};
    let [modalOpen, setModalOpen] = useState(false);


    const deleteMonster = () => {

        fetch(`/api/courses/${monster.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin" //property that instructs the browser to send the token cookie along with every request.
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
                    <h2>{monster.name}</h2>
                    <h2>Meta: {monster.meta}</h2>
                    <ul>
                        <li>
                            Armor Class <strong>{monster.armor_class}</strong>
                        </li>
                        <li>
                            Hit Points <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            speed <strong>{monster.speed}</strong>
                        </li>
                        <li>
                            Armor Class <strong>{monster.armor_class}</strong>
                        </li>
                        <li>
                            Hit Points <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            speed <strong>{monster.speed}</strong>
                        </li>
                        <li>
                            Armor Class <strong>{monster.armor_class}</strong>
                        </li>
                        <li>
                            Hit Points <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            speed <strong>{monster.speed}</strong>
                        </li>
                        <li>
                            Armor Class <strong>{monster.armor_class}</strong>
                        </li>
                        <li>
                            Hit Points <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            speed <strong>{monster.speed}</strong>
                        </li>
                        <li>
                            Armor Class <strong>{monster.armor_class}</strong>
                        </li>
                        <li>
                            Hit Points <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            speed <strong>{monster.speed}</strong>
                        </li>
                        <li>
                            Armor Class <strong>{monster.armor_class}</strong>
                        </li>
                        <li>
                            Hit Points <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            speed <strong>{monster.speed}</strong>
                        </li>
                        <li>
                            Hit Points <strong>{monster.hit_points}</strong>
                        </li>
                        <li>
                            speed <strong>{monster.speed}</strong>
                        </li>
                    </ul>
                    <button
                        className="primary"
                        onClick={() => history.push(`/courses/${course._id}/edit`)}
                    >
                        Edit
                    </button>
                    <button className="primary" onClick={() => {
                        if (authenticated) setModalOpen(true);
                        else document.location = "/signin";
                    }}>Delete
                    </button>
                    <p>Added date: {format(course.added_at, "MM/dd/yyyy")}</p>
                </div>
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    style={customStyles}
                    contentLabel="Are you sure?"
                >
                    <p>Are you sure you want to delete this course?</p>
                    <button className="primary" onClick={deleteCourse}>
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