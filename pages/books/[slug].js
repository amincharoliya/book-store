import { useRouter } from 'next/router';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

import Styles from './bookSingle.module.scss';

export default function BookSingle() {
	const { state, dispatch } = useContext(Store);
	const { query } = useRouter();
	const { slug } = query;
	const book = data.products.find((book) => book.slug == slug);
	const addToCart = () => {
		const bookInCart = state.cart.cartItems.find(
			(item) => item.slug === book.slug
		);
		const quantity = bookInCart ? bookInCart.quantity + 1 : 1;
		if (book.countInStock < quantity) {
			alert('Sorry, Product is out of stock now');
			return;
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: {
				...book,
				quantity,
			},
		});
	};
	if (!book) {
		return <div>No Book Found!</div>;
	}
	return (
		<Layout title={book.name}>
			<div className={Styles.book_single_wrap}>
				<div className="container">
					<div className={Styles.book_single_details}>
						<div className={Styles.book_image}>
							<img src={book.image} alt={book.name} />
						</div>
						<div className={Styles.book_single_content}>
							<h2>{book.name}</h2>
							<p className={Styles.book_author}>
								By {book.author}
							</p>
							<p className={Styles.book_meta}>
								<strong>Category: </strong>
								{book.cateogory}
							</p>
							<p className={Styles.book_meta}>
								<strong>Review: </strong>
								{`${book.rating} of ${book.numReviews} reviews`}
							</p>
							<p className={Styles.book_description}>
								{book.description}
							</p>
							<div className={Styles.book_order_block}>
								<p className={Styles.book_meta}>
									<strong>Price: </strong>
									{`$${book.price}`}
								</p>
								<button
									onClick={() => addToCart()}
									className={Styles.book_button}
									disabled={
										book.countInStock > 0 ? '' : 'disabled'
									}
								>
									{book.countInStock > 0
										? 'Add To Cart'
										: 'Out Of Stock'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
