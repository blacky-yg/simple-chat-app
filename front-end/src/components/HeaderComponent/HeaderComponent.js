import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Gravatar from "react-gravatar"

function Header(props) {
    const [state, setState] = useState({
        name: "",
        successMessage: null
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if (props.location.pathname === '/') {
        title = `Bienvenue ${localStorage.getItem("user_name")}`
    }

    function capitalize(s) {
        if (typeof s !== 'string')
            return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    function create_channel() {
        const payload = {
            name: state.name
        }
        if (state.name !== "") {
            axios.post(process.env.REACT_APP_API_BASE_URL+'/channels', payload)
                .then((response) => {
                    if (response.status === 201) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Channel créé avec succès'
                        }))
                        handleClose()
                        window.location.reload(false);
                    } else {
                        console.log("error")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function renderLogout() {
        if (props.location.pathname === '/'){
            return (
                <>
                    <Gravatar email={localStorage.getItem("user_email")} size={40} rating="pg" default="monsterid" className="CustomAvatar-image" />
                    <div className="mr-auto">
                        <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal" onClick={handleShow}>
                            Créer un channel
                        </button>
                    </div>
                    { show ?
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-secondary" id="exampleModalLabel">Entrez le nom du channel</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="name" value={state.name} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                        <button type="button" className="btn btn-primary" onClick={create_channel}>Créer</button>
                                    </div>
                                </div>
                            </div>
                        </div> : ""}
                    <div className="ml-auto">
                        <button className="btn btn-danger" onClick={() => handleLogout()}>Se déconnecter</button>
                    </div>
                </>
            )
        }
    }

    function handleLogout() {
        localStorage.removeItem("user_id")
        localStorage.removeItem("user_name")
        props.history.push('/signin')
    }

    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}

export default withRouter(Header);