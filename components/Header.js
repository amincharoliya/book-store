import React from 'react';
import Link from 'next/link';

// Styling
import Styles from './Header.module.scss';

export default function Header() {
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
								<li>
									<Link href="/cart">
										<a>
											{/* Add "Styles.active" to show active state */}
											<span>Cart</span>
										</a>
									</Link>
								</li>
								<li>
									<Link href="/login">
										<a>
											<span>Login</span>
										</a>
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
