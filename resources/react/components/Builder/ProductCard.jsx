function Avatar({ initials, color }) {
    return (
        <span className="sbb-product-avatar" style={{ background: `${color}1a`, color }}>
            {initials}
        </span>
    );
}

/**
 * Renders a product either as a draggable "source" card (product
 * search results) or as a compact "canvas" row once it has been
 * added to the bundle (with quantity controls + remove).
 */
function ProductCard({
    product,
    variant = "source",
    draggable = false,
    onDragStart,
    onDragEnd,
    onAdd,
    onRemove,
    onQtyChange,
    qty = 1,
    dragHandleProps = {},
}) {
    if (variant === "canvas") {
        return (
            <div className="sbb-canvas-item">

                <span className="sbb-canvas-drag-handle" {...dragHandleProps} aria-label="Drag to reorder">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="9" cy="6" r="1.5" />
                        <circle cx="15" cy="6" r="1.5" />
                        <circle cx="9" cy="12" r="1.5" />
                        <circle cx="15" cy="12" r="1.5" />
                        <circle cx="9" cy="18" r="1.5" />
                        <circle cx="15" cy="18" r="1.5" />
                    </svg>
                </span>

                <Avatar initials={product.initials} color={product.color} />

                <div className="sbb-canvas-item-info">
                    <span className="sbb-canvas-item-name">{product.name}</span>
                    <span className="sbb-canvas-item-sku">{product.sku}</span>
                </div>

                <div className="sbb-qty-stepper">
                    <button type="button" onClick={() => onQtyChange?.(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                        −
                    </button>
                    <span>{qty}</span>
                    <button type="button" onClick={() => onQtyChange?.(qty + 1)} aria-label="Increase quantity">
                        +
                    </button>
                </div>

                <span className="sbb-canvas-item-price">${(product.price * qty).toFixed(2)}</span>

                <button
                    type="button"
                    className="sbb-canvas-item-remove"
                    onClick={onRemove}
                    aria-label={`Remove ${product.name}`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>

            </div>
        );
    }

    return (
        <div
            className="sbb-product-card"
            draggable={draggable}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <Avatar initials={product.initials} color={product.color} />

            <div className="sbb-product-card-info">
                <span className="sbb-product-card-name">{product.name}</span>
                <span className="sbb-product-card-meta">{product.sku} &middot; ${product.price.toFixed(2)}</span>
            </div>

            <button
                type="button"
                className="sbb-product-card-add"
                onClick={onAdd}
                aria-label={`Add ${product.name} to bundle`}
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
}

export default ProductCard;
