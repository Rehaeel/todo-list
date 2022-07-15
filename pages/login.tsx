import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useState } from 'react';
import { fetchLoginUser } from '../utils/services';
import sha256 from 'sha256';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const LoginPage: NextPage = () => {
	const router = useRouter();

	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [isCheckingUser, setIsCheckingUser] = useState<boolean>(false);
	const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);

	useEffect(() => {
		if (window?.localStorage.getItem('email')) router.push('/');
	}, [router]);

	const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const user = {
			email: emailValue,
			password: sha256(passwordValue),
		};
		setIsCheckingUser(true);

		fetchLoginUser(user)
			.then((data) => {
				window?.localStorage.setItem('email', data.message);
				setIsCheckingUser(false);
				router.push('/');
			})
			.catch(() => {
				setIsWrongPassword(true);
				setIsCheckingUser(false);
				setPasswordValue('');
			});
	};

	return (
		<>
			<section className='flex h-screen w-screen flex-col items-center justify-center gap-7'>
				{isWrongPassword && (
					<h1 className='text-2xl font-medium text-red-600'>
						Zły login lub hasło
					</h1>
				)}
				{!isWrongPassword && (
					<h1 className='text-3xl font-medium text-dark-gray-color'>
						Zaloguj się
					</h1>
				)}
				{isCheckingUser && (
					<div className='mt-5 scale-125'>
						<LoadingSpinner scale='l' maxDelayDuration={0}>
							Ładowanie
						</LoadingSpinner>
					</div>
				)}
				{!isCheckingUser && (
					<>
						<form
							onSubmit={onSubmitHandler}
							className='flex flex-col gap-4'>
							<input
								className={`rounded-sm border border-gray-400 px-4 py-1 ${
									isWrongPassword ? 'border-red-600' : ''
								}`}
								type='text'
								placeholder='email'
								value={emailValue}
								onChange={(e) => setEmailValue(e.target.value)}
							/>
							<input
								className={`rounded-sm border border-gray-400 px-4 py-1 ${
									isWrongPassword ? 'border-red-600' : ''
								}`}
								type='password'
								placeholder='password'
								value={passwordValue}
								onChange={(e) =>
									setPasswordValue(e.target.value)
								}
							/>
							<button
								type='submit'
								className='mt-3 rounded-md bg-dark-gray-color py-2 font-light text-light-gray-color'>
								Zaloguj
							</button>
						</form>
					</>
				)}
			</section>
		</>
	);
};

export default LoginPage;
