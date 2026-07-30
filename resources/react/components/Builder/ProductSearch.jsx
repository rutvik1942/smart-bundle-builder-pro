import ProductCard from "./ProductCard";
import Loader from "../Common/Loader";
import EmptyState from "../Common/EmptyState";

function ProductSearch({ products, loading, query, onQueryChange, onAdd, onDragStart, onDragEnd }) {
    return (
        <div className="sbb-card sbb-product-search-card">

            <header className="sbb-card-header">
                <h3 className="sbb-card-title">Product Catalog</h3>
            </header>

            <div className="sbb-card-body sbb-product-search-body">

                <div className="sbb-search sbb-builder-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search products, SKU, category..."
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                    />
                </div>

                <p className="sbb-builder-hint">Drag a product into the bundle, or use the + button.</p>

                <div className="sbb-product-list">

                    {loading && <Loader label="Loading products..." />}

                    {!loading && products.length === 0 && (
                        <EmptyState
                            title="No products found"
                            description="Try a different search term."
                        />
                    )}

                    {!loading &&
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                variant="source"
                                draggable
                                onDragStart={(e) => onDragStart(e, product)}
                                onDragEnd={onDragEnd}
                                onAdd={() => onAdd(product)}
                            />
                        ))}

                </div>

            </div>

        </div>
    );
}

export default ProductSearch;
