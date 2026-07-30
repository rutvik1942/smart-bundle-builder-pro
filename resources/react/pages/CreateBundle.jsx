import { useMemo, useState } from "react";

import { useBundles, BUNDLE_TYPES } from "../hooks/useBundles";

import ProductSearch from "../components/Builder/ProductSearch";
import BundleCanvas from "../components/Builder/BundleCanvas";
import PricingPanel from "../components/Builder/PricingPanel";
import Button from "../components/Common/Button";

const STEPS = [
    { key: "info", label: "Bundle Info" },
    { key: "products", label: "Add Products" },
    { key: "pricing", label: "Pricing & Discount" },
    { key: "review", label: "Review & Publish" },
];

function StepIcon({ status }) {
    if (status === "done") {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return null;
}

function Stepper({ activeIndex, furthestIndex, onStepClick }) {
    return (
        <ol className="sbb-stepper">
            {STEPS.map((step, index) => {
                const status = index < furthestIndex ? "done" : index === activeIndex ? "active" : "upcoming";

                return (
                    <li key={step.key} className="sbb-stepper-item">
                        <button
                            type="button"
                            className={`sbb-stepper-dot sbb-stepper-dot-${status}`}
                            onClick={() => index <= furthestIndex && onStepClick(index)}
                            disabled={index > furthestIndex}
                        >
                            <StepIcon status={status} />
                            {status !== "done" && <span>{index + 1}</span>}
                        </button>
                        <span className={`sbb-stepper-label${status === "active" ? " is-active" : ""}`}>
                            {step.label}
                        </span>
                        {index < STEPS.length - 1 && (
                            <span className={`sbb-stepper-line${index < furthestIndex ? " is-done" : ""}`} />
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

function BundleInfoStep({ bundle, onChange }) {
    return (
        <div className="sbb-card sbb-info-card">
            <div className="sbb-card-body">

                <div className="sbb-field-group">
                    <label className="sbb-field-label" htmlFor="sbb-bundle-name">Bundle Name</label>
                    <input
                        id="sbb-bundle-name"
                        type="text"
                        className="sbb-text-input"
                        placeholder="e.g. The Ultimate Grooming Kit"
                        value={bundle.name}
                        onChange={(e) => onChange({ ...bundle, name: e.target.value })}
                    />
                </div>

                <div className="sbb-field-group">
                    <label className="sbb-field-label" htmlFor="sbb-bundle-description">Description</label>
                    <textarea
                        id="sbb-bundle-description"
                        className="sbb-textarea-input"
                        rows={4}
                        placeholder="Tell customers what makes this bundle worth buying..."
                        value={bundle.description}
                        onChange={(e) => onChange({ ...bundle, description: e.target.value })}
                    />
                </div>

                <div className="sbb-field-group">
                    <label className="sbb-field-label">Bundle Type</label>

                    <div className="sbb-type-grid">
                        {BUNDLE_TYPES.map((type) => (
                            <button
                                type="button"
                                key={type.key}
                                className={`sbb-type-card${bundle.type === type.key ? " is-active" : ""}`}
                                onClick={() => onChange({ ...bundle, type: type.key })}
                            >
                                <span className="sbb-type-card-radio" />
                                <span className="sbb-type-card-label">{type.label}</span>
                                <span className="sbb-type-card-description">{type.description}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function ReviewStep({ bundle, originalTotal, finalPrice }) {
    const typeLabel = BUNDLE_TYPES.find((t) => t.key === bundle.type)?.label;

    return (
        <div className="sbb-card sbb-review-card">
            <div className="sbb-card-body">

                <div className="sbb-review-block">
                    <span className="sbb-field-label">Bundle</span>
                    <p className="sbb-review-name">{bundle.name || "Untitled Bundle"}</p>
                    {bundle.description && <p className="sbb-review-description">{bundle.description}</p>}
                    <span className="sbb-pill sbb-pill-impact">{typeLabel}</span>
                </div>

                <div className="sbb-review-block">
                    <span className="sbb-field-label">Products ({bundle.products.length})</span>
                    <ul className="sbb-review-product-list">
                        {bundle.products.map((product) => (
                            <li key={product.id}>
                                <span>{product.name}</span>
                                <span>×{product.qty}</span>
                            </li>
                        ))}
                        {bundle.products.length === 0 && (
                            <li className="sbb-empty-description">No products added yet.</li>
                        )}
                    </ul>
                </div>

                <div className="sbb-review-block sbb-review-price">
                    <div>
                        <span className="sbb-field-label">Original Total</span>
                        <p className="sbb-review-strike">${originalTotal.toFixed(2)}</p>
                    </div>
                    <div>
                        <span className="sbb-field-label">Bundle Price</span>
                        <p className="sbb-review-final">${finalPrice.toFixed(2)}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

function CreateBundle({ onNavigate }) {
    const { products, loading, query, setQuery } = useBundles();

    const [stepIndex, setStepIndex] = useState(0);
    const [furthestIndex, setFurthestIndex] = useState(0);

    const [bundle, setBundle] = useState({
        name: "",
        description: "",
        type: "fixed",
        products: [],
        discountType: "percentage",
        discountValue: 15,
        tiers: [
            { qty: 2, discount: 10 },
            { qty: 3, discount: 15 },
        ],
    });

    const originalTotal = useMemo(
        () => bundle.products.reduce((sum, p) => sum + p.price * p.qty, 0),
        [bundle.products]
    );

    const finalPrice = useMemo(() => {
        if (bundle.discountType === "percentage") {
            return originalTotal * (1 - Math.min(bundle.discountValue, 100) / 100);
        }

        if (bundle.discountType === "fixed") {
            return Math.max(0, originalTotal - bundle.discountValue);
        }

        return originalTotal;
    }, [originalTotal, bundle.discountType, bundle.discountValue]);

    const addProduct = (product) => {
        setBundle((prev) => {
            const existing = prev.products.find((p) => p.id === product.id);

            if (existing) {
                return {
                    ...prev,
                    products: prev.products.map((p) =>
                        p.id === product.id ? { ...p, qty: p.qty + 1 } : p
                    ),
                };
            }

            return { ...prev, products: [...prev.products, { ...product, qty: 1 }] };
        });
    };

    const removeProduct = (productId) => {
        setBundle((prev) => ({
            ...prev,
            products: prev.products.filter((p) => p.id !== productId),
        }));
    };

    const setProductQty = (productId, qty) => {
        setBundle((prev) => ({
            ...prev,
            products: prev.products.map((p) => (p.id === productId ? { ...p, qty } : p)),
        }));
    };

    const reorderProducts = (fromIndex, toIndex) => {
        setBundle((prev) => {
            const next = [...prev.products];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return { ...prev, products: next };
        });
    };

    const handleCatalogDragStart = (e, product) => {
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData("text/plain", JSON.stringify({ source: "catalog", product }));
    };

    const goToStep = (index) => {
        setStepIndex(index);
        setFurthestIndex((prev) => Math.max(prev, index));
    };

    const goNext = () => goToStep(Math.min(stepIndex + 1, STEPS.length - 1));
    const goBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

    const nextDisabled =
        (stepIndex === 0 && !bundle.name.trim()) ||
        (stepIndex === 1 && bundle.products.length === 0);

    return (
        <>

            <div className="sbb-page-header">

                <div>
                    <button type="button" className="sbb-back-link" onClick={() => onNavigate?.("dashboard")}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <h1 className="page-title sbb-builder-title">Create New Bundle</h1>
                    <p className="page-description">A few quick steps to launch a bundle your customers will love.</p>
                </div>

                <div className="sbb-page-header-actions">
                    <Button variant="secondary">Save as Draft</Button>
                </div>

            </div>

            <Stepper activeIndex={stepIndex} furthestIndex={furthestIndex} onStepClick={goToStep} />

            <div className="sbb-builder-step-content">

                {stepIndex === 0 && <BundleInfoStep bundle={bundle} onChange={setBundle} />}

                {stepIndex === 1 && (
                    <div className="sbb-builder-grid">
                        <ProductSearch
                            products={products}
                            loading={loading}
                            query={query}
                            onQueryChange={setQuery}
                            onAdd={addProduct}
                            onDragStart={handleCatalogDragStart}
                            onDragEnd={() => {}}
                        />

                        <div className="sbb-card sbb-canvas-card">
                            <header className="sbb-card-header">
                                <h3 className="sbb-card-title">Your Bundle</h3>
                                <span className="sbb-canvas-count">{bundle.products.length} item{bundle.products.length === 1 ? "" : "s"}</span>
                            </header>
                            <div className="sbb-card-body">
                                <BundleCanvas
                                    items={bundle.products}
                                    onAddProduct={addProduct}
                                    onRemoveProduct={removeProduct}
                                    onQtyChange={setProductQty}
                                    onReorder={reorderProducts}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {stepIndex === 2 && (
                    <PricingPanel
                        originalTotal={originalTotal}
                        discountType={bundle.discountType}
                        discountValue={bundle.discountValue}
                        tiers={bundle.tiers}
                        onDiscountTypeChange={(discountType) => setBundle((prev) => ({ ...prev, discountType }))}
                        onDiscountValueChange={(discountValue) => setBundle((prev) => ({ ...prev, discountValue }))}
                        onTiersChange={(tiers) => setBundle((prev) => ({ ...prev, tiers }))}
                    />
                )}

                {stepIndex === 3 && (
                    <ReviewStep bundle={bundle} originalTotal={originalTotal} finalPrice={finalPrice} />
                )}

            </div>

            <div className="sbb-builder-footer">
                <Button variant="secondary" onClick={goBack} disabled={stepIndex === 0}>
                    Back
                </Button>

                {stepIndex < STEPS.length - 1 ? (
                    <Button variant="primary" onClick={goNext} disabled={nextDisabled}>
                        Continue
                    </Button>
                ) : (
                    <Button variant="primary">Publish Bundle</Button>
                )}
            </div>

        </>
    );
}

export default CreateBundle;
