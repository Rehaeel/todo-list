import { useRef, useState } from 'react';
import styles from './login.module.css';

import sha256 from 'sha256';
import * as services from '../../services';
import { useNavigate } from 'react-router';

const Login = (props) => {
	const navigate = useNavigate();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [wrongPass, setWrongPass] = useState(false);
	const loginRef = useRef();

	const submitHandler = async (e) => {
		e.preventDefault();
		const user = { email: login, password: sha256(password) };
		await services
			.fetchLoginUser(user)
			.then(() => {
				window.localStorage.setItem('user', login);
				props.setUser(true);
				navigate('/');
			})
			.catch(() => {
				setWrongPass(true);
				props.setUser(false);

				setLogin('');
				setPassword('');
				loginRef.current.focus();
			});
	};

	return (
		<div className={styles.container}>
			<h2>Zaloguj się</h2>
			<form onSubmit={submitHandler}>
				<label>
					Login
					<input
						placeholder='login'
						value={login}
						onChange={(e) => setLogin(e.target.value)}
						type='email'
						className={wrongPass ? styles.wrong : ''}
						ref={loginRef}
					/>
				</label>
				<label>
					Hasło
					<input
						placeholder='hasło'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						className={wrongPass ? styles.wrong : ''}
					/>
				</label>
				<button type='submit'>Zaloguj</button>
			</form>
		</div>
	);
};

export default Login;
