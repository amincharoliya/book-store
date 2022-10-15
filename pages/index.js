import Layout from '../components/Layout';
import Banner from '../components/Banner';
import data from '../utils/data';
import ProductItem from '../components/ProductItem';

export default function Home() {
	// Get Top 4 Rated books based on rating
	const topRatedBooks = data.products
		.filter((product) => product.rating >= 4.5)
		.slice(0, 4);
	return (
		<Layout title="Homepage">
			<Banner />
			<div className="book_listing_wrap">
				<div className="container">
					<h2 className="t-align-center">Top Rated Books</h2>
					<div className="book_listing">
						{topRatedBooks.map((product) => (
							<ProductItem product={product} key={product.slug} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}
