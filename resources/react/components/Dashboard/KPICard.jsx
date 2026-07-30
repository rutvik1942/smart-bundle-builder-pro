const ICONS = {
    revenue: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2.5" y="6" width="19" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    sales: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 4h2l1.2 12.4a2 2 0 002 1.6H18a2 2 0 002-1.7L21 8H6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="9.5" cy="21" r="1.3" fill="currentColor" />
            <circle cx="17.5" cy="21" r="1.3" fill="currentColor" />
        </svg>
    ),
    aov: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 13l4.5-5 4 3.5L20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 21h16M4 21V9M20 21v-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    conversion: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
};

function Sparkline({ points = [], positive = true }) {
    if (!points.length) return null;

    const width = 220;
    const height = 46;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const coords = points.map((value, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((value - min) / range) * (height - 6) - 3;
        return [x, y];
    });

    const line = coords
        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
        .join(" ");

    const area = `${line} L${width},${height} L0,${height} Z`;

    const color = positive ? "var(--sbb-primary)" : "var(--sbb-danger)";

    return (
        <svg className="sbb-sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <path d={area} fill="url(#sbb-spark-fill)" stroke="none" />
            <path d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="sbb-spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function KPICard({ label, value, trend, trendDirection = "up", icon, spark }) {
    const positive = trendDirection === "up";

    return (
        <div className="sbb-kpi-card">

            <div className="sbb-kpi-top">
                <span className="sbb-kpi-label">{label}</span>
                <span className="sbb-kpi-icon">{ICONS[icon]}</span>
            </div>

            <div className="sbb-kpi-value-row">
                <span className="sbb-kpi-value">{value}</span>
                <span className={`sbb-badge sbb-badge-${positive ? "up" : "down"}`}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        {positive ? (
                            <path d="M6 18L18 6M18 6H9M18 6v9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                            <path d="M6 6l12 12M18 18H9M18 18V9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                    </svg>
                    {trend}
                </span>
            </div>

            <Sparkline points={spark} positive={positive} />

        </div>
    );
}

export default KPICard;
