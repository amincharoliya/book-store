import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';
import data from '../../utils/data';

const Books = () => {
	const books = data.products;

	return (
		<Layout title="Browse Books">
			<div className="container">
				<h2 className="t-align-center">Browse Books</h2>
				<div className="books_wrap">
					<div className="books_content">
						{books ? (
							<div className="related_books">
								<div className="book_listing">
									{books.map((product) => (
										<ProductItem
											product={product}
											key={product.slug}
										/>
									))}
								</div>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Books;
