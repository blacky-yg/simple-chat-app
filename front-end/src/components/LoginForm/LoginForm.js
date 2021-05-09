import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import AlertComponent from "../AlertComponent/AlertComponent"
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        username : "",
        password : "",
        successMessage: null,
    })
	const [errorMessage, updateErrorMessage] = useState(null);

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleClick = (e) => {
        e.preventDefault();

        axios.get(process.env.REACT_APP_API_BASE_URL+'/users')
            .then((response) => {
                if (response.status === 200) {
                    if (Object.keys(response.data).length > 0) {
                        for (let i = 0; i < Object.keys(response.data).length; i++) {
                            if (state.username === response.data[i].username && state.password === response.data[i].password) {
                                setState(prevState => ({
                                    ...prevState,
                                    'successMessage' : 'Connexion réussie, Redirection vers la page Home'
                                }))
                                localStorage.setItem("user_id" , response.data[i].id);
                                localStorage.setItem("user_name" , response.data[i].username);
                                localStorage.setItem("user_email" , response.data[i].email);
                                redirectToHome();
                                console.log("connecté")
                                updateErrorMessage(null)
                            } else
                                updateErrorMessage("L'utilisateur et le mot de passe ne sont pas valides");
                        }
                    } else
                        updateErrorMessage("L'utilisateur et le mot de passe ne sont pas valides");
                } else
                    updateErrorMessage("L'utilisateur n'existe pas");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const redirectToHome = () => {
        props.history.push('/');
        props.updateTitle(`Bienvenue ${localStorage.getItem("user_name")}`)
    }

    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Votre nom d'utilisateur</label>
                    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Entrez votre username" value={state.username} onChange={handleChange}/>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Mot de passe</label>
                    <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" value={state.password} onChange={handleChange} />
                </div>
                <div className="form-check">
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                    Se connecter
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Vous n'avez pas de compte ? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Créer un compte</span>
            </div>
            <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    )
}

export default withRouter(LoginForm);