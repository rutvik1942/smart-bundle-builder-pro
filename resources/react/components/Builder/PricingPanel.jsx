const DISCOUNT_TYPES = [
    { key: "percentage", label: "Percentage" },
    { key: "fixed", label: "Fixed Amount" },
    { key: "tiered", label: "Tiered by Quantity" },
];

function currency(value) {
    return `$${value.toFixed(2)}`;
}

function PricingPanel({
    originalTotal,
    discountType,
    discountValue,
    tiers,
    onDiscountTypeChange,
    onDiscountValueChange,
    onTiersChange,
}) {
    let finalPrice = originalTotal;
    let savings = 0;

    if (discountType === "percentage") {
        savings = originalTotal * (Math.min(discountValue, 100) / 100);
        finalPrice = originalTotal - savings;
    } else if (discountType === "fixed") {
        savings = Math.min(discountValue, originalTotal);
        finalPrice = originalTotal - savings;
    }

    const savingsPercent = originalTotal > 0 ? Math.round((savings / originalTotal) * 100) : 0;

    const updateTier = (index, field, value) => {
        const next = tiers.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier));
        onTiersChange(next);
    };

    const addTier = () => {
        const lastQty = tiers[tiers.length - 1]?.qty || 1;
        onTiersChange([...tiers, { qty: lastQty + 1, discount: 10 }]);
    };

    const removeTier = (index) => {
        onTiersChange(tiers.filter((_, i) => i !== index));
    };

    return (
        <div className="sbb-card sbb-pricing-card">

            <header className="sbb-card-header">
                <h3 className="sbb-card-title">Pricing &amp; Discount</h3>
            </header>

            <div className="sbb-card-body sbb-pricing-body">

                <div className="sbb-field-group">
                    <label className="sbb-field-label">Discount Type</label>
                    <div className="sbb-segmented">
                        {DISCOUNT_TYPES.map((type) => (
                            <button
                                type="button"
                                key={type.key}
                                className={`sbb-segmented-btn${discountType === type.key ? " is-active" : ""}`}
                                onClick={() => onDiscountTypeChange(type.key)}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {discountType !== "tiered" && (
                    <div className="sbb-field-group">
                        <label className="sbb-field-label" htmlFor="sbb-discount-value">
                            {discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}
                        </label>
                        <div className="sbb-input-affix">
                            {discountType === "fixed" && <span className="sbb-input-prefix">$</span>}
                            <input
                                id="sbb-discount-value"
                                type="number"
                                min="0"
                                max={discountType === "percentage" ? 100 : undefined}
                                value={discountValue}
                                onChange={(e) => onDiscountValueChange(Number(e.target.value))}
                            />
                            {discountType === "percentage" && <span className="sbb-input-suffix">%</span>}
                        </div>
                    </div>
                )}

                {discountType === "tiered" && (
                    <div className="sbb-field-group">
                        <label className="sbb-field-label">Quantity Tiers</label>

                        <div className="sbb-tier-list">
                            {tiers.map((tier, index) => (
                                <div className="sbb-tier-row" key={index}>
                                    <span className="sbb-tier-prefix">Buy</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={tier.qty}
                                        onChange={(e) => updateTier(index, "qty", Number(e.target.value))}
                                    />
                                    <span className="sbb-tier-prefix">get</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={tier.discount}
                                        onChange={(e) => updateTier(index, "discount", Number(e.target.value))}
                                    />
                                    <span className="sbb-tier-prefix">% off</span>
                                    <button
                                        type="button"
                                        className="sbb-tier-remove"
                                        onClick={() => removeTier(index)}
                                        aria-label="Remove tier"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button type="button" className="sbb-link sbb-tier-add" onClick={addTier}>
                            + Add tier
                        </button>
                    </div>
                )}

                <div className="sbb-pricing-summary">

                    <div className="sbb-pricing-row">
                        <span>Original total</span>
                        <span>{currency(originalTotal)}</span>
                    </div>

                    {discountType !== "tiered" && (
                        <>
                            <div className="sbb-pricing-row sbb-pricing-row-discount">
                                <span>Discount</span>
                                <span>−{currency(savings)}</span>
                            </div>

                            <div className="sbb-pricing-row sbb-pricing-row-final">
                                <span>Bundle price</span>
                                <span>{currency(Math.max(finalPrice, 0))}</span>
                            </div>

                            {savings > 0 && (
                                <span className="sbb-pricing-savings-badge">
                                    Customers save {savingsPercent}%
                                </span>
                            )}
                        </>
                    )}

                    {discountType === "tiered" && (
                        <p className="sbb-empty-description sbb-pricing-tiered-note">
                            The discount is applied automatically at checkout once a customer's
                            quantity reaches a tier threshold.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default PricingPanel;
