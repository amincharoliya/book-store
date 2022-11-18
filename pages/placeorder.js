import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';

import CheckoutProgress from '../components/CheckoutProgress';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

import Styles from './placeorder.module.scss';
import TableStyles from './table.module.scss';

export default function PlaceOrderScreen() {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { cartItems, shippingAddress, paymentMethod } = cart;

	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

	const itemsPrice = round2(
		cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
	); // 123.4567 => 123.46

	const shippingPrice = itemsPrice > 200 ? 0 : 15;
	const taxPrice = round2(itemsPrice * 0.15);
	const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

	const router = useRouter();
	useEffect(() => {
		if (!paymentMethod) {
			router.push('/payment');
		}
	}, [paymentMethod, router]);

	const [loading, setLoading] = useState(false);

	const placeOrderHandler = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post('/api/orders', {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			});
			setLoading(false);
			dispatch({ type: 'CART_CLEAR_ITEMS' });
			Cookies.set(
				'cart',
				JSON.stringify({
					...cart,
					cartItems: [],
				})
			);
			router.push(`/order/${data._id}`);
		} catch (err) {
			setLoading(false);
			alert(err.message);
		}
	};

	return (
		<Layout title="Place Order">
			<div className="container">
				<CheckoutProgress activeStep={3} />
				<h2 className={Styles.oder_page_title}>Place Order</h2>
				{cartItems.length === 0 ? (
					<div>
						Cart is empty. <Link href="/">Go shopping</Link>
					</div>
				) : (
					<div className={Styles.oder_page}>
						<div className={Styles.oder_page_details}>
							<div className={Styles.action_block}>
								<h3>Shipping Address</h3>
								<p>
									{shippingAddress.fullName},{' '}
									{shippingAddress.address},{' '}
									{shippingAddress.city},{' '}
									{shippingAddress.postalCode},{' '}
									{shippingAddress.country}
								</p>
								<div>
									<Link href="/shipping">Edit</Link>
								</div>
							</div>
							<div className={Styles.action_block}>
								<h3>Payment Method</h3>
								<p>{paymentMethod}</p>
								<div>
									<Link href="/payment">Edit</Link>
								</div>
							</div>
							<div className="card overflow-x-auto p-5">
								<h3 className="mb-2 text-lg">Order Items</h3>
								<table className={TableStyles.table}>
									<thead className="border-b">
										<tr>
											<th className="px-5 text-left">
												Item
											</th>
											<th className="    p-5 text-right">
												Quantity
											</th>
											<th className="  p-5 text-right">
												Price
											</th>
											<th className="p-5 text-right">
												Subtotal
											</th>
										</tr>
									</thead>
									<tbody>
										{cartItems.map((item) => (
											<tr
												key={item._id}
												className="border-b"
											>
												<td>
													<Link
														href={`/product/${item.slug}`}
													>
														<a className="flex items-center">
															<Image
																src={item.image}
																alt={item.name}
																width={50}
																height={50}
															></Image>
															&nbsp;
															{item.name}
														</a>
													</Link>
												</td>
												<td className=" p-5 text-right">
													{item.quantity}
												</td>
												<td className="p-5 text-right">
													${item.price}
												</td>
												<td className="p-5 text-right">
													$
													{item.quantity * item.price}
												</td>
											</tr>
										))}
										<tr>
											<td colSpan={4}>
												<div className="t-align-center">
													<Link href="/cart">
														Edit
													</Link>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className={Styles.oder_page_summary}>
							<div className={Styles.action_block}>
								<h3>Order Summary</h3>
								<ul>
									<li>
										<div
											className={Styles.order_summary_row}
										>
											<div>Items</div>
											<div>${itemsPrice}</div>
										</div>
									</li>
									<li>
										<div
											className={Styles.order_summary_row}
										>
											<div>Tax</div>
											<div>${taxPrice}</div>
										</div>
									</li>
									<li>
										<div
											className={Styles.order_summary_row}
										>
											<div>Shipping</div>
											<div>${shippingPrice}</div>
										</div>
									</li>
									<li>
										<div
											className={Styles.order_summary_row}
										>
											<div>Total</div>
											<div>${totalPrice}</div>
										</div>
									</li>
									<li>
										<button
											disabled={loading}
											onClick={placeOrderHandler}
											className={`${Styles.order_button} button`}
										>
											{loading
												? 'Loading...'
												: 'Place Order'}
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}

PlaceOrderScreen.auth = true;
