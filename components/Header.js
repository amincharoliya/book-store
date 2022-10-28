import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { Store } from '../utils/Store';

// Styling
import Styles from './Header.module.scss';

export default function Header() {
	const { status, data: session } = useSession();
	const { pathname } = useRouter();
	const { state } = useContext(Store);
	const [cartNumber, SetCartNumber] = useState(0);

	useEffect(() => {
		SetCartNumber(
			state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
		);
	}, [state.cart.cartItems]);

	return (
		<header className={Styles.header}>
			<div className="container">
				<div className={Styles.header_inner}>
					<h1>
						<Link href="/">
							<a>
								Book <span>Store</span>
							</a>
						</Link>
					</h1>
					<div className="header_sidebar">
						<nav aria-label="main menu" role="navigation">
							<ul>
								<li
									className={
										pathname.split('/')[1] === 'cart'
											? Styles.active
											: ''
									}
								>
									<Link href="/cart">
										<a>
											{/* Add "Styles.active" to show active state */}
											<span>Cart</span>{' '}
											<span className={Styles.cart_item}>
												{cartNumber}
											</span>
										</a>
									</Link>
								</li>
								<li
									className={
										pathname.split('/')[1] === 'login'
											? Styles.active
											: ''
									}
								>
									{status == 'loading' ? (
										<span>Loading</span>
									) : session?.user ? (
										<span>{session.user.name}</span>
									) : (
										<Link href="/login">
											<a>
												<span>Login</span>
											</a>
										</Link>
									)}
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
