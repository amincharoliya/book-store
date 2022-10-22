import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Layout from '../components/Layout';
import Styles from './login.module.scss';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitHandler = ({ email, password }) => {
		console.log(email, password);
	};

	return (
		<Layout title="Login">
			<div className="container">
				<form
					className={Styles.form}
					onSubmit={handleSubmit(submitHandler)}
				>
					<h2>Login</h2>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						placeholder="Enter your Email"
						id="email"
						autoFocus
						{...register('email', {
							required: 'Please provide your email address',
							pattern: {
								value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
								message: 'Please enter valid email address',
							},
						})}
					/>
					{errors.email && (
						<span className={Styles.error}>
							{errors.email.message}
						</span>
					)}
					<label htmlFor="password">Password</label>
					<input
						type="password"
						placeholder="Enter your Password"
						id="password"
						{...register('password', {
							required: 'Please provide your password',
							minLength: {
								value: 6,
								message:
									"Password can't be less than 6 characters",
							},
						})}
					/>
					{errors.password && (
						<span className={Styles.error}>
							{errors.password.message}
						</span>
					)}
					<button type="submit" className="button">
						Login
					</button>
					<p>
						Don't have an account?{' '}
						<Link href="/register">
							<a>Register</a>
						</Link>
					</p>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
