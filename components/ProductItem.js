/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import Styles from './ProductItem.module.scss';

export default function ProductItem({ product }) {
	return (
		<div className={Styles.book_item}>
			<div className={Styles.book_item_image}>
				<Link href={`/product/${product.slug}`}>
					<a aria-hidden="true" tabIndex="-1">
						<img src={product.image} alt={product.name} />
					</a>
				</Link>
			</div>
			<div className={Styles.book_item_body}>
				<h3>
					<Link href={`/product/${product.slug}`}>
						<a>{product.name}</a>
					</Link>
				</h3>
				<p className={Styles.book_author}>By {product.author}</p>
				<p className={Styles.book_price}>${product.price}</p>
				<p className={Styles.book_description}>{product.description}</p>
				<button className={Styles.book_button}>Add To Cart</button>
			</div>
		</div>
	);
}
