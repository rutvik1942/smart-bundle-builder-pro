import { useState } from "react";

import ProductCard from "./ProductCard";

/**
 * The drop target where products are assembled into a bundle.
 * Supports dropping new products from the catalog and dragging
 * existing rows to reorder them.
 */
function BundleCanvas({ items = [], onAddProduct, onRemoveProduct, onQtyChange, onReorder }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);

    const handleCanvasDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleCanvasDragLeave = () => setIsDragOver(false);

    const handleCanvasDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const raw = e.dataTransfer.getData("text/plain");

        if (raw) {
            try {
                const payload = JSON.parse(raw);

                if (payload.source === "catalog" && payload.product) {
                    onAddProduct(payload.product);
                }
            } catch {
                // ignore malformed drag payloads
            }
        }

        setDragIndex(null);
    };

    const handleItemDragStart = (e, index) => {
        setDragIndex(index);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", JSON.stringify({ source: "canvas", index }));
    };

    const handleItemDragOver = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        if (dragIndex === null || dragIndex === index) return;

        onReorder(dragIndex, index);
        setDragIndex(index);
    };

    const handleItemDragEnd = () => setDragIndex(null);

    return (
        <div
            className={`sbb-bundle-canvas${isDragOver ? " is-drag-over" : ""}${items.length === 0 ? " is-empty" : ""}`}
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            onDrop={handleCanvasDrop}
        >

            {items.length === 0 && (
                <div className="sbb-canvas-empty">
                    <span className="sbb-canvas-empty-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M3 7l2.5-4h13L21 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                            <path d="M9 11a3 3 0 006 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </span>
                    <p className="sbb-canvas-empty-title">Drag products here</p>
                    <p className="sbb-canvas-empty-description">
                        Build your bundle by dragging items from the catalog, or use the + button on any product.
                    </p>
                </div>
            )}

            {items.map((item, index) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleItemDragStart(e, index)}
                    onDragOver={(e) => handleItemDragOver(e, index)}
                    onDragEnd={handleItemDragEnd}
                    className={`sbb-canvas-row${dragIndex === index ? " is-dragging" : ""}`}
                >
                    <ProductCard
                        product={item}
                        variant="canvas"
                        qty={item.qty}
                        onQtyChange={(qty) => onQtyChange(item.id, qty)}
                        onRemove={() => onRemoveProduct(item.id)}
                    />
                </div>
            ))}

        </div>
    );
}

export default BundleCanvas;
