import React, { useState } from 'react';
import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';
import { isLogin } from './utils/is_login';

function App() {
	const [title, updateTitle] = useState(null);
	const [user, setUser] = useState(null);
	const [errorMessage, updateErrorMessage] = useState(null);

	return (
		<Router>
			<div className="App">
				<HeaderComponent title={title} user={user}/>
				<div className="container d-flex align-items-center flex-column">
					<Switch>
						<Route exact path='/' render={props => isLogin() ? <Home {...props} showError={updateErrorMessage} updateTitle={updateTitle} /> : <Redirect to="/signin" />} />
						<Route exact path='/register' render={props => <RegistrationForm {...props} showError={updateErrorMessage} updateTitle={updateTitle} />} />
						<Route exact path='/signin' render={props => <LoginForm {...props} showError={updateErrorMessage} updateTitle={updateTitle} onUser={setUser} />} />
					</Switch>
					<AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
				</div>
			</div>
		</Router>
	);
}

export default App;